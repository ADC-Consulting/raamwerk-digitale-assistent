/* =========================================================================
   Kennisgraaf — interactive knowledge graph (vanilla JS + force-graph)
   Reads window.KNOWLEDGE_GRAPH (from graph-data.js). No build step.
   ========================================================================= */
'use strict';
(function () {
  var KG = window.KNOWLEDGE_GRAPH;
  if (!KG || !KG.nodes) {
    document.getElementById('loading').textContent = 'Kon graafdata niet laden (graph-data.js).';
    return;
  }
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- lookups & derived data ----------------------------------------- */
  var byId = {};
  KG.nodes.forEach(function (n) { byId[n.id] = n; });

  var TYPE_VAR = {
    domain: '--node-domain', practice: '--node-practice', bron: '--node-bron',
    begrip: '--node-begrip', phase: '--node-phase', level: '--node-level',
    categorie: '--node-categorie'
  };
  var TYPE_LABEL = {};
  (KG.meta.node_types || []).forEach(function (t) { TYPE_LABEL[t.type] = t.label; });

  var BRON_LINKS = { cites_source: 1, domain_cites_source: 1, bron_in_category: 1, glossary_references_source: 1 };

  function srcId(l) { return typeof l.source === 'object' ? l.source.id : l.source; }
  function tgtId(l) { return typeof l.target === 'object' ? l.target.id : l.target; }
  function srcType(l) { var n = byId[srcId(l)]; return n ? n.type : null; }

  // degree + adjacency (built from the pristine string endpoints, once)
  var degree = {}, neighbors = {}, incident = {};
  KG.nodes.forEach(function (n) { degree[n.id] = 0; neighbors[n.id] = []; incident[n.id] = []; });
  KG.edges.forEach(function (e) {
    var s = e.source, t = e.target;
    if (byId[s] && byId[t]) {
      degree[s]++; degree[t]++;
      neighbors[s].push(t); neighbors[t].push(s);
      incident[s].push(e); incident[t].push(e);
    }
  });

  /* ---- palette (cached; refreshed on theme change) -------------------- */
  var pal = {};
  function refreshPalette() {
    var cs = getComputedStyle(document.documentElement);
    pal.ink = cs.getPropertyValue('--ink').trim();
    pal.paper = cs.getPropertyValue('--paper').trim();
    pal.muted = cs.getPropertyValue('--muted').trim();
    pal.line = cs.getPropertyValue('--line').trim();
    pal.node = {};
    Object.keys(TYPE_VAR).forEach(function (k) { pal.node[k] = cs.getPropertyValue(TYPE_VAR[k]).trim(); });
  }
  refreshPalette();

  function hexToRgb(h) {
    h = (h || '#888').replace('#', '');
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function rgba(hex, a) { var c = hexToRgb(hex); return 'rgba(' + c[0] + ',' + c[1] + ',' + c[2] + ',' + a + ')'; }
  function nodeColor(n) { return pal.node[n.type] || pal.muted; }

  /* ---- state ---------------------------------------------------------- */
  var typeVisible = {}; Object.keys(TYPE_VAR).forEach(function (k) { typeVisible[k] = true; });
  var activePhase = new Set(), activeLevel = new Set(), activeCat = new Set();
  var hlNodes = new Set(), hlLinks = new Set();
  var hoverNode = null, selNode = null;

  function isVisible(n) {
    if (!typeVisible[n.type]) return false;
    if (n.type === 'practice') {
      if (activePhase.size && !(n.phases || []).some(function (p) { return activePhase.has(p); })) return false;
      if (activeLevel.size && !(n.levels || []).some(function (l) { return activeLevel.has(l); })) return false;
    }
    if (n.type === 'bron' && activeCat.size && !(n.data && activeCat.has(n.data.categorie))) return false;
    return true;
  }
  function linkVisible(l) { var a = byId[srcId(l)], b = byId[tgtId(l)]; return a && b && isVisible(a) && isVisible(b); }

  function updateHighlight() {
    hlNodes.clear(); hlLinks.clear();
    var n = hoverNode || selNode;
    if (!n) return;
    hlNodes.add(n.id);
    (neighbors[n.id] || []).forEach(function (id) { hlNodes.add(id); });
    (incident[n.id] || []).forEach(function (l) { if (linkVisible(l)) hlLinks.add(l); });
  }

  /* ---- geometry / drawing --------------------------------------------- */
  function getR(n) {
    var base = { domain: (n.data && n.data.group === 'fundament') ? 7 : 5.5, practice: 3.4,
                 bron: 2.1, begrip: 2.8, phase: 5, level: 5, categorie: 5 }[n.type] || 3;
    return Math.min(base + Math.sqrt(degree[n.id] || 0) * 0.7, 16);
  }
  function trunc(s, n) { s = s || ''; return s.length > n ? s.slice(0, n - 1) + '…' : s; }

  function shouldLabel(n, scale) {
    if (hlNodes.size) return hlNodes.has(n.id);
    if (n.type === 'domain') return true;
    if (n.type === 'phase' || n.type === 'level' || n.type === 'categorie') return scale > 0.7;
    if (n.type === 'practice') return scale > 2.2;
    return scale > 4;
  }

  function drawNode(n, ctx, scale) {
    var r = getR(n), col = nodeColor(n);
    var dim = hlNodes.size && !hlNodes.has(n.id);
    var a = dim ? 0.12 : 1;
    ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.2832);
    ctx.fillStyle = rgba(col, a); ctx.fill();
    ctx.lineWidth = 0.6; ctx.strokeStyle = rgba(pal.paper, dim ? 0.1 : 0.9); ctx.stroke();

    if (n.type === 'domain' && n.data && n.data.group === 'fundament') {
      ctx.beginPath(); ctx.arc(n.x, n.y, r + 2.4, 0, 6.2832);
      ctx.lineWidth = 1.1; ctx.strokeStyle = rgba(col, dim ? 0.12 : 0.75); ctx.stroke();
    }
    if (selNode && selNode.id === n.id) {
      ctx.beginPath(); ctx.arc(n.x, n.y, r + 4, 0, 6.2832);
      ctx.lineWidth = 1.6; ctx.strokeStyle = rgba(pal.ink, 0.9); ctx.stroke();
    }
    if (shouldLabel(n, scale)) {
      var label = trunc(n.label, 32);
      var fs = Math.max(3, 11 / scale);
      ctx.font = '600 ' + fs + 'px "Ease SemiDisplay","DM Sans",sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      var y = n.y + r + 2 / scale;
      var w = ctx.measureText(label).width;
      ctx.fillStyle = rgba(pal.paper, dim ? 0 : 0.66);
      ctx.fillRect(n.x - w / 2 - 2 / scale, y - 0.5 / scale, w + 4 / scale, fs + 1.5 / scale);
      ctx.fillStyle = rgba(pal.ink, dim ? 0.15 : 0.95);
      ctx.fillText(label, n.x, y);
    }
  }

  /* ---- graph instance -------------------------------------------------- */
  var el = document.getElementById('graph');
  var Graph = ForceGraph()(el)
    .graphData({ nodes: KG.nodes, links: KG.edges })
    .backgroundColor('rgba(0,0,0,0)')
    .width(el.clientWidth).height(el.clientHeight)
    .autoPauseRedraw(false)           // keep a live loop so theme + hover always repaint
    .nodeId('id')
    .nodeLabel(function () { return ''; })   // disable built-in tooltip (we use a custom one)
    .nodeRelSize(4)
    .nodeVisibility(isVisible)
    .linkVisibility(linkVisible)
    .nodeCanvasObject(drawNode)
    .nodePointerAreaPaint(function (n, color, ctx) {
      var r = getR(n) + 2; ctx.fillStyle = color; ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.2832); ctx.fill();
    })
    .linkColor(function (l) {
      if (hlLinks.has(l)) return rgba(pal.node[srcType(l)] || pal.muted, 0.9);
      var base = BRON_LINKS[l.type] ? 0.08 : 0.22;
      return rgba(pal.line, hlNodes.size ? base * 0.4 : base);
    })
    .linkWidth(function (l) { return hlLinks.has(l) ? 1.8 : (BRON_LINKS[l.type] ? 0.4 : 0.7); })
    .linkDirectionalParticles(function (l) { return (!reduceMotion && hlLinks.has(l)) ? 2 : 0; })
    .linkDirectionalParticleWidth(1.8)
    .linkDirectionalParticleColor(function (l) { return rgba(pal.node[srcType(l)] || pal.muted, 0.95); })
    .onNodeHover(function (n) {
      hoverNode = n || null;
      el.style.cursor = n ? 'pointer' : '';
      updateHighlight();
      updateTip(n);
    })
    .onNodeClick(function (n) { selectNode(n, false); })
    .onBackgroundClick(function () { closePanel(); })
    .warmupTicks(300)                 // fully pre-settle before first paint (synchronous)
    .cooldownTicks(0)                 // then hold still — a calm, static constellation
    .onEngineStop(function () { hideLoading(); });

  // force tuning for an airy, organic constellation. Per-type repulsion pushes the
  // domains + filter hubs well apart (so their labels don't overlap) while the bron/
  // begrip cloud stays compact. distanceMax caps range so stray nodes don't fly off.
  Graph.d3Force('charge').strength(function (n) {
    if (n.type === 'domain') return -360;
    if (n.type === 'phase' || n.type === 'level' || n.type === 'categorie') return -240;
    if (n.type === 'practice') return -120;
    return -50; // bron, begrip
  }).distanceMax(420);
  Graph.d3Force('link').distance(function (l) {
    var t = l.type;
    if (t === 'domain_related') return 92;
    if (BRON_LINKS[t]) return 60;
    if (t === 'related_practice') return 55;
    return 38;
  }).strength(0.22);

  // layout is final after warmup, so frame it on the first frame. If the URL deep-links
  // a node (?node=<id>), open it instead of the overview and skip the follow-up refit.
  var deepId = null;
  try { deepId = new URLSearchParams(location.search).get('node'); } catch (e) {}
  requestAnimationFrame(function () {
    Graph.zoomToFit(0, 80); hideLoading();
    if (deepId && byId[deepId]) focusNode(deepId);
  });
  if (!(deepId && byId[deepId])) setTimeout(function () { Graph.zoomToFit(500, 80); hideLoading(); }, 500);
  setTimeout(hideLoading, 4000);      // safety net
  function hideLoading() { document.getElementById('loading').classList.add('hidden'); }

  /* ---- hover tooltip --------------------------------------------------- */
  var gtip = document.getElementById('gtip');
  function updateTip(n) {
    if (!n) { gtip.style.display = 'none'; return; }
    var sc = Graph.graph2ScreenCoords(n.x, n.y);
    gtip.innerHTML = '<div class="tt-type">' + (TYPE_LABEL[n.type] || n.type) + '</div>' + escapeHtml(n.label);
    gtip.style.left = sc.x + 'px';
    gtip.style.top = (sc.y - getR(n)) + 'px';
    gtip.style.display = 'block';
  }
  // keep tooltip glued to a moving/settling node
  el.addEventListener('mousemove', function () { if (hoverNode) updateTip(hoverNode); });

  /* ---- selection + panel ---------------------------------------------- */
  var panel = document.getElementById('panel');

  function selectNode(n, center) {
    if (!n) return;
    selNode = n;
    updateHighlight();
    renderPanel(n);
    panel.classList.add('open'); panel.setAttribute('aria-hidden', 'false');
    syncUrl(n.id);
    if (center && n.x != null) {
      Graph.centerAt(n.x, n.y, 600);
      Graph.zoom(Math.max(Graph.zoom(), 2.6), 600);
    }
  }
  function closePanel() {
    panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true');
    selNode = null; updateHighlight(); syncUrl(null);
  }
  function syncUrl(id) {
    try {
      var u = new URL(location.href);
      if (id) u.searchParams.set('node', id); else u.searchParams.delete('node');
      history.replaceState(null, '', u);
    } catch (e) {}
  }
  function focusNode(id) {
    var n = byId[id]; if (!n) return;
    if (!typeVisible[n.type]) { typeVisible[n.type] = true; syncLegend(); }
    selectNode(n, true);
  }

  function pageHref(n) {
    var h = n.href || '';
    if (!h) return null;
    if (/^https?:/i.test(h)) return { url: h, external: true };
    if (h.charAt(0) === '#') return { url: '../index.html' + h, external: false };
    return { url: h, external: false };
  }

  function escapeHtml(s) { return (s || '').replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function inlineFmt(s) { return escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); }

  function renderBlock(p) {
    p = (p || '').trim(); if (!p) return '';
    var lines = p.split('\n');
    if (lines[0].trim().charAt(0) === '|' && lines[1] && /^\|[-| :]+\|$/.test(lines[1].trim())) {
      var row = function (l) { return l.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); }); };
      var html = '<table><tr>' + row(lines[0]).map(function (c) { return '<th>' + inlineFmt(c) + '</th>'; }).join('') + '</tr>';
      for (var i = 2; i < lines.length; i++) { if (!lines[i].trim()) continue; html += '<tr>' + row(lines[i]).map(function (c) { return '<td>' + inlineFmt(c) + '</td>'; }).join('') + '</tr>'; }
      return html + '</table>';
    }
    if (lines.every(function (l) { return !l.trim() || l.trim().indexOf('- ') === 0; })) {
      return '<ul>' + lines.filter(function (l) { return l.trim(); }).map(function (l) { return '<li>' + inlineFmt(l.trim().slice(2)) + '</li>'; }).join('') + '</ul>';
    }
    return '<p>' + inlineFmt(p).replace(/\n/g, '<br>') + '</p>';
  }
  function renderBlocks(arr) {
    if (!arr) return ''; if (typeof arr === 'string') arr = [arr];
    return arr.map(renderBlock).join('');
  }

  function relSection(title, ids) {
    ids = (ids || []).filter(function (id) { return byId[id]; });
    if (!ids.length) return '';
    var cap = 60, shown = ids.slice(0, cap);
    var chips = shown.map(function (id) {
      var t = byId[id];
      return '<button data-id="' + id + '" style="--rc:' + nodeColor(t) + '"><span class="dot"></span><span class="t">' + escapeHtml(t.label) + '</span></button>';
    }).join('');
    var more = ids.length > cap ? '<span class="subhint">+' + (ids.length - cap) + ' meer</span>' : '';
    return '<h3>' + title + ' <span style="color:var(--muted);font-weight:400">(' + ids.length + ')</span></h3><div class="rel">' + chips + '</div>' + more;
  }

  function renderPanel(n) {
    var d = n.data || {};
    var col = nodeColor(n);
    var tag = '<span class="type-tag" style="--tt:' + col + '"><span class="dot"></span>' +
              escapeHtml(TYPE_LABEL[n.type] || n.type) +
              (n.type === 'domain' && d.group ? ' · ' + escapeHtml(d.group) : '') + '</span>';

    var body = '';
    if (n.type === 'practice') {
      if (d.summary) body += '<p class="lede">' + inlineFmt(d.summary) + '</p>';
      if (d.toelichting && d.toelichting.length) body += '<div class="prose">' + renderBlocks(d.toelichting) + '</div>';
      if (d.body && d.body.length) body += '<h3>Aandachtspunten</h3><div class="prose">' + renderBlocks(d.body) + '</div>';
      body += relSection('Domeinen', n.domains);
      body += relSection('Bronnen', n.sources);
      body += relSection('Samenhangende good practices', n.related_practices);
      body += relSection('Fases', n.phases);
      body += relSection('Organisatieniveaus', n.levels);
    } else if (n.type === 'domain') {
      if (d.short) body += '<p class="lede">' + inlineFmt(d.short) + '</p>';
      if (d.wat) body += '<h3>Wat houdt dit in?</h3><div class="prose">' + renderBlocks(d.wat) + '</div>';
      if (d.waarom) body += '<h3>Waarom belangrijk?</h3><div class="prose">' + renderBlocks(d.waarom) + '</div>';
      if (d.samenhang_blokken && d.samenhang_blokken.length) {
        body += '<h3>Samenhang</h3><div class="prose">' + d.samenhang_blokken.map(function (b) {
          return '<p><strong>' + escapeHtml(b.naam || '') + '</strong><br>' + inlineFmt(b.omschrijving || '') + '</p>';
        }).join('') + '</div>';
      }
      body += relSection('Good practices', n.practices);
      body += relSection('Basiskennis (bronnen)', n.sources);
      body += relSection('Samenhangende domeinen', n.related_domains);
    } else if (n.type === 'bron') {
      if (d.categorie) body += '<p class="meta-line">Categorie: ' + escapeHtml(d.categorie) + '</p>';
      if (d.omschrijving) body += '<div class="prose">' + renderBlocks(d.omschrijving) + '</div>';
      if (d.url) body += '<p class="meta-line"><a href="' + escapeHtml(d.url) + '" target="_blank" rel="noopener">' + escapeHtml(d.url) + '</a></p>';
      body += relSection('Gebruikt door good practices', n.cited_by_practices);
      body += relSection('Basiskennis bij domeinen', n.cited_by_domains);
      body += relSection('Genoemd bij begrippen', n.referenced_by_begrippen);
    } else if (n.type === 'begrip') {
      if (d.omschrijving) body += '<p class="lede">' + inlineFmt(d.omschrijving) + '</p>';
      body += relSection('Zie ook (bronnen)', n.sources);
    } else { // phase / level / categorie
      body += '<p class="lede">' + escapeHtml(TYPE_LABEL[n.type] || n.type) + ': <strong>' + escapeHtml(n.label) + '</strong></p>';
      body += relSection('Good practices', n.practices);
      body += relSection('Bronnen', n.bronnen);
    }

    var ph = pageHref(n);
    var btn = '';
    if (ph) {
      var txt = n.type === 'bron' ? 'Open bron ↗' : (ph.external ? 'Open link ↗' : 'Open volledige pagina →');
      btn = '<a class="openpage" href="' + escapeHtml(ph.url) + '"' + (ph.external ? ' target="_blank" rel="noopener"' : '') + '>' + txt + '</a>';
    }

    panel.innerHTML =
      '<div class="panel-head"><div class="grow">' + tag + '<h2>' + escapeHtml(n.label) + '</h2></div>' +
      '<button class="close" aria-label="Sluiten">✕</button></div>' +
      '<div class="panel-body">' + body + btn + '</div>';
  }

  panel.addEventListener('click', function (e) {
    if (e.target.closest('.close')) { closePanel(); return; }
    var b = e.target.closest('button[data-id]');
    if (b) focusNode(b.getAttribute('data-id'));
  });

  /* ---- rail: legend + filters ----------------------------------------- */
  var rail = document.getElementById('rail');
  function buildRail() {
    var legend = (KG.meta.node_types || []).map(function (t) {
      return '<button class="legrow" data-type="' + t.type + '"><span class="swatch" style="--sw:' + (pal.node[t.type] || pal.muted) + '"></span>' +
             '<span class="lbl">' + escapeHtml(t.label) + '</span><span class="cnt">' + t.count + '</span></button>';
    }).join('');

    var f = KG.meta.filters || {};
    var phaseChips = (f.phases || []).map(function (p) { return '<button class="chip" data-phase="phase:' + escapeHtml(p) + '">' + escapeHtml(p) + '</button>'; }).join('');
    var levelChips = (f.levels || []).map(function (l) { return '<button class="chip" data-level="level:' + escapeHtml(l) + '">' + escapeHtml(l) + '</button>'; }).join('');
    var catChips = (f.bron_categories || []).map(function (c) { return '<button class="chip" data-cat="' + escapeHtml(c.name) + '">' + escapeHtml(c.name) + '</button>'; }).join('');

    rail.innerHTML =
      '<div class="group"><div class="group-head"><h2>Knooptypen</h2><button class="reset" id="reset-all">herstel</button></div><div class="legend">' + legend + '</div></div>' +
      '<div class="group"><h2>Good practices — fase</h2><div class="chips">' + phaseChips + '</div></div>' +
      '<div class="group"><h2>Good practices — niveau</h2><div class="chips">' + levelChips + '</div></div>' +
      '<div class="group"><h2>Bronnen — categorie</h2><div class="chips">' + catChips + '</div></div>';
  }
  function syncLegend() {
    rail.querySelectorAll('.legrow').forEach(function (r) {
      r.classList.toggle('off', !typeVisible[r.getAttribute('data-type')]);
    });
  }
  buildRail();

  rail.addEventListener('click', function (e) {
    var lr = e.target.closest('.legrow');
    if (lr) { var ty = lr.getAttribute('data-type'); typeVisible[ty] = !typeVisible[ty]; syncLegend(); return; }
    if (e.target.id === 'reset-all') { resetFilters(); return; }
    var chip = e.target.closest('.chip'); if (!chip) return;
    chip.classList.toggle('on');
    if (chip.dataset.phase) toggleSet(activePhase, chip.dataset.phase);
    else if (chip.dataset.level) toggleSet(activeLevel, chip.dataset.level);
    else if (chip.dataset.cat) toggleSet(activeCat, chip.dataset.cat);
  });
  function toggleSet(set, v) { if (set.has(v)) set.delete(v); else set.add(v); }
  function resetFilters() {
    Object.keys(typeVisible).forEach(function (k) { typeVisible[k] = true; });
    activePhase.clear(); activeLevel.clear(); activeCat.clear();
    syncLegend();
    rail.querySelectorAll('.chip.on').forEach(function (c) { c.classList.remove('on'); });
  }

  /* ---- search ---------------------------------------------------------- */
  var searchInput = document.getElementById('search');
  var searchBox = document.getElementById('search-results');
  var results = [], activeIdx = -1;

  function runSearch() {
    var q = searchInput.value.trim().toLowerCase();
    if (!q) { searchBox.classList.remove('open'); return; }
    results = KG.nodes.filter(function (n) { return n.label.toLowerCase().indexOf(q) >= 0; })
      .sort(function (a, b) { return a.label.toLowerCase().indexOf(q) - b.label.toLowerCase().indexOf(q); })
      .slice(0, 14);
    activeIdx = -1;
    if (!results.length) { searchBox.innerHTML = '<div class="search-empty">Geen resultaten</div>'; searchBox.classList.add('open'); return; }
    searchBox.innerHTML = results.map(function (n, i) {
      return '<button data-i="' + i + '"><span class="swatch" style="width:.7rem;height:.7rem;border-radius:99px;background:' + nodeColor(n) + '"></span>' +
             escapeHtml(trunc(n.label, 44)) + '<span class="type-tag" style="--tt:' + nodeColor(n) + '"><span class="dot"></span>' + escapeHtml(TYPE_LABEL[n.type] || n.type) + '</span></button>';
    }).join('');
    searchBox.classList.add('open');
  }
  function chooseResult(i) {
    var n = results[i]; if (!n) return;
    searchBox.classList.remove('open'); searchInput.blur();
    focusNode(n.id);
  }
  searchInput.addEventListener('input', runSearch);
  searchInput.addEventListener('keydown', function (e) {
    if (!searchBox.classList.contains('open')) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); activeIdx = Math.min(activeIdx + 1, results.length - 1); markActive(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); activeIdx = Math.max(activeIdx - 1, 0); markActive(); }
    else if (e.key === 'Enter') { e.preventDefault(); chooseResult(activeIdx >= 0 ? activeIdx : 0); }
    else if (e.key === 'Escape') { searchBox.classList.remove('open'); }
  });
  function markActive() {
    searchBox.querySelectorAll('button').forEach(function (b, i) { b.classList.toggle('active', i === activeIdx); });
  }
  searchBox.addEventListener('click', function (e) { var b = e.target.closest('button[data-i]'); if (b) chooseResult(+b.getAttribute('data-i')); });
  document.addEventListener('click', function (e) { if (!e.target.closest('.search')) searchBox.classList.remove('open'); });

  /* ---- controls: zoom, theme, mobile filters -------------------------- */
  document.getElementById('zoom-in').addEventListener('click', function () { Graph.zoom(Graph.zoom() * 1.4, 300); });
  document.getElementById('zoom-out').addEventListener('click', function () { Graph.zoom(Graph.zoom() * 0.7, 300); });
  document.getElementById('zoom-fit').addEventListener('click', function () { Graph.zoomToFit(600, 60); });

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('kg-theme', next); } catch (e) {}
    refreshPalette();
    buildRail(); syncLegend();  // swatch colours follow the theme
  });

  document.getElementById('filters-toggle').addEventListener('click', function () { rail.classList.toggle('collapsed'); });

  /* ---- counts + resize ------------------------------------------------- */
  document.getElementById('count-nodes').textContent = (KG.meta.counts && KG.meta.counts.nodes) || KG.nodes.length;
  document.getElementById('count-edges').textContent = (KG.meta.counts && KG.meta.counts.edges) || KG.edges.length;

  window.addEventListener('resize', function () { Graph.width(el.clientWidth).height(el.clientHeight); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePanel(); });
})();
