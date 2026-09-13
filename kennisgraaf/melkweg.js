/* =========================================================================
   Kennisgraaf — radial "constellation" view (dependency-free canvas 2D).
   Rings, inner -> outer:
     core:  fases + organisatieniveaus   (cross-cutting lenses)
     1:     domeinen
     2:     good practices
     3:     bronnen
     4:     begrippen
   Practices sit at the angular mean of their domain(s), so a practice tied to
   several domains bridges them. No rotation, no decorative star-field, only a
   subtle glow. Every drawn point is a real, clickable node. No libraries.
   ========================================================================= */
'use strict';
(function () {
  var KG = window.KNOWLEDGE_GRAPH;
  var loadingEl = document.getElementById('loading');
  if (!KG || !KG.nodes) { loadingEl.textContent = 'Kon graafdata niet laden.'; return; }
  var TAU = Math.PI * 2;

  var byId = {};
  KG.nodes.forEach(function (n) { byId[n.id] = n; });
  var domains   = KG.nodes.filter(function (n) { return n.type === 'domain'; });
  var practices = KG.nodes.filter(function (n) { return n.type === 'practice'; });
  var sources   = KG.nodes.filter(function (n) { return n.type === 'bron'; });
  var begrippen = KG.nodes.filter(function (n) { return n.type === 'begrip'; });
  var phases    = KG.nodes.filter(function (n) { return n.type === 'phase'; });
  var levels    = KG.nodes.filter(function (n) { return n.type === 'level'; });

  function rnd(s) { var x = Math.sin(s * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
  function cmean(a) { if (!a.length) return null; var s = 0, c = 0; a.forEach(function (v) { s += Math.sin(v); c += Math.cos(v); }); return Math.atan2(s, c); }

  var COL = {
    domain: '#3fe9d4', practice: '#9d8cff', bron: '#f0c574',
    begrip: '#ff9bfc', phase: '#5fe08a', level: '#ffe14d'
  };
  var TYPE_LABEL = {
    domain: 'Domein', practice: 'Good practice', bron: 'Bron',
    begrip: 'Begrip', phase: 'Fase', level: 'Organisatieniveau'
  };

  // ---- assign angles (positions are static; only the camera moves) -------
  var core = levels.concat(phases);                 // 4 + 3 = 7 lens nodes
  core.forEach(function (n, i) { n._a = -Math.PI / 2 + i / core.length * TAU; n._rf = 1; });

  domains.sort(function (a, b) {
    var af = (a.data && a.data.group === 'fundament') ? 0 : 1, bf = (b.data && b.data.group === 'fundament') ? 0 : 1;
    return af - bf || ((a.data && a.data.nr) || 0) - ((b.data && b.data.nr) || 0);
  });
  var domAngle = {};
  domains.forEach(function (d, i) { d._a = -Math.PI / 2 + i / domains.length * TAU; d._rf = 1; domAngle[d.id] = d._a; });

  practices.forEach(function (p, i) {
    var das = (p.domains || []).map(function (id) { return domAngle[id]; }).filter(function (a) { return a != null; });
    var base = cmean(das); if (base == null) base = rnd(i) * TAU;
    p._a = base + (rnd(i + 7) - 0.5) * 0.5;
    p._rf = 1 + (rnd(i + 3) - 0.5) * 0.2;
  });
  sources.forEach(function (s, i) {
    var angs = [];
    (s.cited_by_practices || []).forEach(function (id) { var p = byId[id]; if (p && p._a != null) angs.push(p._a); });
    (s.cited_by_domains || []).forEach(function (id) { if (domAngle[id] != null) angs.push(domAngle[id]); });
    var base = cmean(angs); if (base == null) base = rnd(i + 99) * TAU;
    s._a = base + (rnd(i + 11) - 0.5) * 0.55;
    s._rf = 1 + (rnd(i + 5) - 0.5) * 0.22;
  });
  begrippen.forEach(function (b, i) {
    var angs = [];
    (b.sources || []).forEach(function (id) { var s = byId[id]; if (s && s._a != null) angs.push(s._a); });
    var base = cmean(angs); if (base == null) base = rnd(i + 40) * TAU;
    b._a = base + (rnd(i + 17) - 0.5) * 0.5;
    b._rf = 1 + (rnd(i + 13) - 0.5) * 0.14;
  });

  // ---- edges -------------------------------------------------------------
  // default-visible: practice->domain, domain<->domain.  faint: source/begrip.
  // hidden-until-hover: practice->fase/niveau (would otherwise starburst).
  var edges = [];
  practices.forEach(function (p) {
    (p.domains || []).forEach(function (id) { if (byId[id]) edges.push({ a: p, b: byId[id], k: 'pd' }); });
    (p.phases || []).forEach(function (id) { if (byId[id]) edges.push({ a: p, b: byId[id], k: 'pf' }); });
    (p.levels || []).forEach(function (id) { if (byId[id]) edges.push({ a: p, b: byId[id], k: 'pl' }); });
  });
  sources.forEach(function (s) {
    (s.cited_by_practices || []).forEach(function (id) { if (byId[id]) edges.push({ a: s, b: byId[id], k: 'sp' }); });
    (s.cited_by_domains || []).forEach(function (id) { if (byId[id]) edges.push({ a: s, b: byId[id], k: 'sd' }); });
  });
  begrippen.forEach(function (b) {
    (b.sources || []).forEach(function (id) { if (byId[id]) edges.push({ a: b, b: byId[id], k: 'bs' }); });
  });
  domains.forEach(function (d) {
    (d.related_domains || []).forEach(function (id) { if (byId[id] && id > d.id) edges.push({ a: d, b: byId[id], k: 'dd' }); });
  });
  var EDGE_BASE = { pd: 0.16, dd: 0.18, sp: 0.045, sd: 0.045, bs: 0.04, pf: 0, pl: 0 };

  function connectedSet(n) {
    var set = {};
    function add(arr) { (arr || []).forEach(function (id) { if (byId[id]) set[id] = 1; }); }
    if (n.type === 'domain') { add(n.practices); add(n.sources); add(n.related_domains); }
    else if (n.type === 'practice') { add(n.domains); add(n.sources); add(n.related_practices); add(n.phases); add(n.levels); }
    else if (n.type === 'bron') { add(n.cited_by_practices); add(n.cited_by_domains); add(n.referenced_by_begrippen); }
    else if (n.type === 'begrip') { add(n.sources); }
    else if (n.type === 'phase' || n.type === 'level') { add(n.practices); }
    return set;
  }

  // ---- canvas & camera ---------------------------------------------------
  var cv = document.getElementById('sky'), ctx = cv.getContext('2d');
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, cx = 0, cy = 0, minr = 0;
  var RING = {};
  function resize() {
    W = cv.clientWidth; H = cv.clientHeight; cx = W / 2; cy = H / 2; minr = Math.min(W, H);
    cv.width = Math.floor(W * DPR); cv.height = Math.floor(H * DPR);
    RING = { core: minr * 0.085, domain: minr * 0.17, practice: minr * 0.275, bron: minr * 0.365, begrip: minr * 0.435 };
  }
  function ringOf(n) {
    return n.type === 'domain' ? RING.domain : n.type === 'practice' ? RING.practice
         : n.type === 'bron' ? RING.bron : n.type === 'begrip' ? RING.begrip : RING.core;
  }
  var cam = { s: 0.9, x: 0, y: 0 }, camT = { s: 0.9, x: 0, y: 0 };
  function worldOf(n) { var r = ringOf(n) * n._rf; return [Math.cos(n._a) * r, Math.sin(n._a) * r]; }
  function toScreen(wx, wy) { return [cx + wx * cam.s + cam.x, cy + wy * cam.s + cam.y]; }

  // ---- subtle glow sprites (small aura, no strong halo) ------------------
  function hexToRgb(h) { h = h.replace('#', ''); if (h.length === 3) h = h[0]+h[0]+h[1]+h[1]+h[2]+h[2]; var n = parseInt(h, 16); return [(n>>16)&255,(n>>8)&255,n&255]; }
  function hexA(h, a) { var c = hexToRgb(h); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function makeGlow(hex) {
    var c = document.createElement('canvas'); c.width = c.height = 48;
    var g = c.getContext('2d'), grd = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    grd.addColorStop(0, hexA(hex, 0.9)); grd.addColorStop(0.4, hexA(hex, 0.35)); grd.addColorStop(1, hexA(hex, 0));
    g.fillStyle = grd; g.fillRect(0, 0, 48, 48); return c;
  }
  var glow = {}; Object.keys(COL).forEach(function (k) { glow[k] = makeGlow(COL[k]); });
  function sizeOf(n) {
    return n.type === 'domain' ? 13 : n.type === 'practice' ? 6.5
         : n.type === 'phase' || n.type === 'level' ? 6.5 : n.type === 'begrip' ? 3.4 : 3;
  }

  var hoverN = null, selN = null;

  // ---- render ------------------------------------------------------------
  function frame() {
    cam.s += (camT.s - cam.s) * 0.14; cam.x += (camT.x - cam.x) * 0.14; cam.y += (camT.y - cam.y) * 0.14;

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, minr * 0.85);
    bg.addColorStop(0, '#0b1022'); bg.addColorStop(0.55, '#070a15'); bg.addColorStop(1, '#04050b');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // faint central depth glow (not a star, not a node halo)
    var core0 = ctx.createRadialGradient(cx + cam.x, cy + cam.y, 0, cx + cam.x, cy + cam.y, RING.domain * cam.s * 1.5);
    core0.addColorStop(0, 'rgba(150,180,255,0.10)'); core0.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = core0; ctx.fillRect(0, 0, W, H);

    var all = domains.concat(practices, sources, begrippen, core);
    for (var j = 0; j < all.length; j++) { var n = all[j], w = worldOf(n), s = toScreen(w[0], w[1]); n._sx = s[0]; n._sy = s[1]; }

    var hi = hoverN || selN, hset = hi ? connectedSet(hi) : null, anyHi = !!hi;

    // edges
    for (var e = 0; e < edges.length; e++) {
      var ed = edges[e], A = ed.a, B = ed.b;
      var involved = hi && (A === hi || B === hi);
      var alpha = involved ? 0.85 : (anyHi ? EDGE_BASE[ed.k] * 0.15 : EDGE_BASE[ed.k]);
      if (alpha < 0.012) continue;
      ctx.strokeStyle = involved ? hexA(COL[A.type], alpha) : hexA('#8390d6', alpha);
      ctx.lineWidth = involved ? 1.4 : 0.7;
      ctx.beginPath(); ctx.moveTo(A._sx, A._sy); ctx.lineTo(B._sx, B._sy); ctx.stroke();
    }

    // nodes (outer first, domains on top)
    drawNodes(sources, hset, anyHi);
    drawNodes(begrippen, hset, anyHi);
    drawNodes(practices, hset, anyHi);
    drawNodes(core, hset, anyHi);
    drawNodes(domains, hset, anyHi);

    // domain labels (always)
    ctx.textBaseline = 'middle';
    for (var d = 0; d < domains.length; d++) {
      var dm = domains[d], dim = anyHi && !(hi === dm || (hset && hset[dm.id]));
      ctx.font = '600 12.5px "Ease SemiDisplay","DM Sans",sans-serif';
      var right = Math.cos(dm._a) >= 0; ctx.textAlign = right ? 'left' : 'right';
      var off = sizeOf(dm) * cam.s + 8;
      ctx.fillStyle = hexA('#eef0fb', dim ? 0.16 : 0.95);
      ctx.fillText(dm.label, dm._sx + (right ? off : -off), dm._sy);
    }

    if (hoverN) showTip(hoverN); else hideTip();
    requestAnimationFrame(frame);
  }

  function drawNodes(list, hset, anyHi) {
    for (var i = 0; i < list.length; i++) {
      var n = list[i];
      if (n._sx < -40 || n._sx > W + 40 || n._sy < -40 || n._sy > H + 40) continue;
      var sel = n === selN, hov = n === hoverN;
      var on = !anyHi || sel || hov || (hset && hset[n.id]);
      var sz = sizeOf(n) * cam.s * ((sel || hov) ? 1.28 : 1);
      // subtle aura (small; not a strong halo)
      var ga = sz * 1.7;
      ctx.globalCompositeOperation = 'lighter';
      ctx.globalAlpha = on ? 0.32 : 0.05;
      ctx.drawImage(glow[n.type], n._sx - ga, n._sy - ga, ga * 2, ga * 2);
      // crisp disc
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = on ? 1 : 0.2;
      ctx.fillStyle = COL[n.type];
      ctx.beginPath(); ctx.arc(n._sx, n._sy, Math.max(0.8, sz), 0, TAU); ctx.fill();
      // bright core point
      ctx.globalAlpha = on ? 0.9 : 0.2; ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(n._sx, n._sy, Math.max(0.4, sz * 0.34), 0, TAU); ctx.fill();
      if (sel || hov) {
        ctx.globalAlpha = 1; ctx.strokeStyle = hexA(COL[n.type], 0.95); ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(n._sx, n._sy, sz + 3.5, 0, TAU); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  }

  // ---- tooltip -----------------------------------------------------------
  var gtip = document.getElementById('gtip');
  function showTip(n) {
    gtip.innerHTML = '<div class="tt-type">' + TYPE_LABEL[n.type] + '</div>' + esc(n.label);
    gtip.style.left = n._sx + 'px'; gtip.style.top = n._sy + 'px'; gtip.style.display = 'block';
  }
  function hideTip() { gtip.style.display = 'none'; }

  // ---- picking -----------------------------------------------------------
  function pick(mx, my) {
    var best = null, bd = 1e9;
    var all = sources.concat(begrippen, practices, core, domains);   // domains win ties
    for (var i = 0; i < all.length; i++) {
      var n = all[i], dx = n._sx - mx, dy = n._sy - my, d = dx * dx + dy * dy;
      var rr = Math.max(7, sizeOf(n) * cam.s + 5); rr *= rr;
      if (d < rr && d <= bd) { bd = d; best = n; }
    }
    return best;
  }

  // ---- interaction -------------------------------------------------------
  var drag = null, moved = false;
  cv.addEventListener('mousedown', function (ev) { drag = { x: ev.clientX, y: ev.clientY, cx: camT.x, cy: camT.y }; moved = false; cv.classList.add('grabbing'); });
  window.addEventListener('mouseup', function () { drag = null; cv.classList.remove('grabbing'); });
  window.addEventListener('mousemove', function (ev) {
    var rect = cv.getBoundingClientRect(), mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    if (drag) {
      var dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 3) moved = true;
      camT.x = drag.cx + dx; camT.y = drag.cy + dy; cam.x = camT.x; cam.y = camT.y; hoverN = null; return;
    }
    hoverN = pick(mx, my); cv.style.cursor = hoverN ? 'pointer' : 'grab';
  });
  cv.addEventListener('mouseleave', function () { hoverN = null; hideTip(); });
  cv.addEventListener('click', function (ev) {
    if (moved) return;
    var rect = cv.getBoundingClientRect(), n = pick(ev.clientX - rect.left, ev.clientY - rect.top);
    if (n) selectNode(n); else closePanel();
  });
  cv.addEventListener('wheel', function (ev) {
    ev.preventDefault();
    var rect = cv.getBoundingClientRect(), mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
    var f = Math.exp(-ev.deltaY * 0.0016), ns = Math.max(0.5, Math.min(7, cam.s * f));
    var wx = (mx - cx - cam.x) / cam.s, wy = (my - cy - cam.y) / cam.s;
    cam.s = ns; cam.x = mx - cx - wx * ns; cam.y = my - cy - wy * ns;
    camT.s = cam.s; camT.x = cam.x; camT.y = cam.y;
  }, { passive: false });
  document.getElementById('zoom-in').onclick = function () { zoomBy(1.35); };
  document.getElementById('zoom-out').onclick = function () { zoomBy(0.7); };
  document.getElementById('zoom-reset').onclick = function () { camT = { s: 0.9, x: 0, y: 0 }; };
  function zoomBy(f) { camT.s = Math.max(0.5, Math.min(7, camT.s * f)); }

  // ---- selection + panel -------------------------------------------------
  var panel = document.getElementById('panel');
  function selectNode(n) {
    selN = n; renderPanel(n);
    panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false');
    var w = worldOf(n), ns = Math.max(camT.s, n.type === 'bron' || n.type === 'begrip' ? 2.2 : 1.7);
    camT.s = ns; camT.x = -w[0] * ns; camT.y = -w[1] * ns;
  }
  function closePanel() { panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); selN = null; }
  function focusId(id) { var n = byId[id]; if (n) selectNode(n); }

  function esc(s) { return (s || '').replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function inl(s) { return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }
  function block(p) {
    p = (p || '').trim(); if (!p) return '';
    var ls = p.split('\n');
    if (ls[0].trim().charAt(0) === '|' && ls[1] && /^\|[-| :]+\|$/.test(ls[1].trim())) {
      var row = function (l) { return l.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); };
      var h = '<table><tr>' + row(ls[0]).map(function (c) { return '<th>' + inl(c) + '</th>'; }).join('') + '</tr>';
      for (var i = 2; i < ls.length; i++) { if (!ls[i].trim()) continue; h += '<tr>' + row(ls[i]).map(function (c) { return '<td>' + inl(c) + '</td>'; }).join('') + '</tr>'; }
      return h + '</table>';
    }
    if (ls.every(function (l) { return !l.trim() || l.trim().indexOf('- ') === 0; }))
      return '<ul>' + ls.filter(function (l) { return l.trim(); }).map(function (l) { return '<li>' + inl(l.trim().slice(2)) + '</li>'; }).join('') + '</ul>';
    return '<p>' + inl(p).replace(/\n/g, '<br>') + '</p>';
  }
  function blocks(a) { if (!a) return ''; if (typeof a === 'string') a = [a]; return a.map(block).join(''); }
  function rel(title, ids) {
    ids = (ids || []).filter(function (id) { return byId[id]; });
    if (!ids.length) return '';
    var cap = 50, chips = ids.slice(0, cap).map(function (id) {
      var t = byId[id]; return '<button data-id="' + id + '" style="--rc:' + (COL[t.type] || '#9298b4') + '"><span class="dot"></span><span class="t">' + esc(t.label) + '</span></button>';
    }).join('');
    var more = ids.length > cap ? '<div class="meta-line">+' + (ids.length - cap) + ' meer</div>' : '';
    return '<h3>' + title + ' <span style="color:var(--muted);font-weight:400">(' + ids.length + ')</span></h3><div class="rel">' + chips + '</div>' + more;
  }
  function renderPanel(n) {
    var d = n.data || {}, col = COL[n.type], body = '';
    if (n.type === 'practice') {
      if (d.summary) body += '<p class="lede">' + inl(d.summary) + '</p>';
      if (d.toelichting && d.toelichting.length) body += '<div class="prose">' + blocks(d.toelichting) + '</div>';
      if (d.body && d.body.length) body += '<h3>Aandachtspunten</h3><div class="prose">' + blocks(d.body) + '</div>';
      body += rel('Domeinen', n.domains) + rel('Bronnen', n.sources) + rel('Samenhangende good practices', n.related_practices) + rel('Fases', n.phases) + rel('Organisatieniveaus', n.levels);
    } else if (n.type === 'domain') {
      if (d.short) body += '<p class="lede">' + inl(d.short) + '</p>';
      if (d.wat) body += '<h3>Wat houdt dit in?</h3><div class="prose">' + blocks(d.wat) + '</div>';
      if (d.waarom) body += '<h3>Waarom belangrijk?</h3><div class="prose">' + blocks(d.waarom) + '</div>';
      body += rel('Good practices', n.practices) + rel('Basiskennis (bronnen)', n.sources) + rel('Samenhangende domeinen', n.related_domains);
    } else if (n.type === 'bron') {
      if (d.categorie) body += '<p class="meta-line">Categorie: ' + esc(d.categorie) + '</p>';
      if (d.omschrijving) body += '<div class="prose">' + blocks(d.omschrijving) + '</div>';
      if (d.url) body += '<p class="meta-line"><a href="' + esc(d.url) + '" target="_blank" rel="noopener">' + esc(d.url) + '</a></p>';
      body += rel('Gebruikt door good practices', n.cited_by_practices) + rel('Basiskennis bij domeinen', n.cited_by_domains) + rel('Genoemd bij begrippen', n.referenced_by_begrippen);
    } else if (n.type === 'begrip') {
      if (d.omschrijving) body += '<p class="lede">' + inl(d.omschrijving) + '</p>';
      body += rel('Zie ook (bronnen)', n.sources);
    } else { // phase / level
      body += '<p class="lede">' + esc(TYPE_LABEL[n.type]) + ': <strong>' + esc(n.label) + '</strong></p>';
      body += rel('Good practices', n.practices);
    }
    var href = n.href || '', btn = '';
    if (/^https?:/i.test(href)) btn = '<a class="openpage" href="' + esc(href) + '" target="_blank" rel="noopener">Open bron ↗</a>';
    else if (href.charAt(0) === '#') btn = '<a class="openpage" href="https://demo-opschalingsticket-digitale-assistent.dokploy.adc-it.com/' + esc(href) + '" target="_blank" rel="noopener">Open volledige pagina →</a>';
    panel.innerHTML =
      '<div class="panel-head"><div class="grow"><span class="type-tag" style="--tt:' + col + '"><span class="dot"></span>' + esc(TYPE_LABEL[n.type]) + '</span>' +
      '<h2>' + esc(n.label) + '</h2></div><button class="close" aria-label="Sluiten">✕</button></div>' +
      '<div class="panel-body">' + body + btn + '</div>';
  }
  panel.addEventListener('click', function (ev) {
    if (ev.target.closest('.close')) { closePanel(); return; }
    var b = ev.target.closest('button[data-id]'); if (b) focusId(b.getAttribute('data-id'));
  });
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') closePanel(); });

  // ---- boot --------------------------------------------------------------
  function setTxt(id, v) { var el = document.getElementById(id); if (el) el.textContent = v; }
  setTxt('c-dom', domains.length); setTxt('c-prac', practices.length); setTxt('c-src', sources.length); setTxt('c-beg', begrippen.length);
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
  setTimeout(function () { loadingEl.classList.add('hidden'); }, 350);
  try { var q = new URLSearchParams(location.search).get('node'); if (q && byId[q]) setTimeout(function () { focusId(q); }, 500); } catch (e) {}
})();
