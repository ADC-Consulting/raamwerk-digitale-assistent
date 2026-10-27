/* ===== Model =====
   One place for the fundament/domein split, the labels and the kerncijfers.
   The same fundament list lives in scripts/_content.py (Python cannot share this one). */

const FUNDAMENT_IDS = ['cultuur-adoptie', 'kennis-capaciteit', 'governance', 'infrastructuur-data'];

const isFundament = (id) => FUNDAMENT_IDS.includes(id);

const byNr = (a, b) => a.nr - b.nr;
const FUNDAMENTEN = window.RAAMWERK.DOMAINS.filter(d => isFundament(d.id)).sort(byNr);
const DOMEINEN = window.RAAMWERK.DOMAINS.filter(d => !isFundament(d.id)).sort(byNr);

/* "Fundament 2" / "Domein 7" — never abbreviated, per ontwerpprincipes section 9. */
const kindLabel = (d) => (isFundament(d.id) ? 'Fundament ' : 'Domein ') + d.nr;

/* Section 9: spell the fasen out, no "PoC" in the interface. */
const phaseLabel = (f) => (f === 'PoC' ? 'Proof of concept' : f);

const practicesFor = (id) => window.RAAMWERK.PRACTICES.filter(p => p.domains.includes(id));
const gpCountFor = (id) => practicesFor(id).length;
const gpLabel = (n) => n + ' good practice' + (n === 1 ? '' : 's');

/* Samenhang-blokken name other onderwerpen in prose ("Kennis en capaciteit",
   "Antwoordkwaliteit / Kwaliteit van de output"), so match on a normalised id
   or title, then fall back to a prefix. Longest key first, so a near-match
   never beats an exact one. */
const normaliseName = (s) => s.toLowerCase().replace(/&/g, 'en').replace(/[^a-z0-9]/g, '');

const TOPIC_KEYS = window.RAAMWERK.DOMAINS
  .reduce((acc, d) => acc.concat(
    [[normaliseName(d.id), d.id], [normaliseName(d.title), d.id]]), [])
  .sort((a, b) => b[0].length - a[0].length);

function topicByName(naam) {
  const n = normaliseName(naam || '');
  if (!n) return null;
  const hit = TOPIC_KEYS.find(([k]) => k === n)
    || TOPIC_KEYS.find(([k]) => n.startsWith(k) || k.startsWith(n));
  return hit ? window.RAAMWERK.DOMAINS.find(d => d.id === hit[1]) : null;
}

/* A praktische tip is a body paragraph; the raw HTML blocks are supporting content. */
const isTip = (block) => !/^\s*<(table|ul|img)/.test(block);
const tipCountFor = (p) => p.body.filter(isTip).length;
const TIP_TOTAL = window.RAAMWERK.PRACTICES.reduce((n, p) => n + tipCountFor(p), 0);

/* Kerncijfers, always in this order (ontwerpprincipes section 7). */
const STATS = [
  { n: FUNDAMENTEN.length, label: 'fundamenten' },
  { n: DOMEINEN.length, label: 'domeinen' },
  { n: window.RAAMWERK.PRACTICES.length, label: 'good practices' },
  { n: TIP_TOTAL, label: 'praktische tips' },
  { n: window.BRONNEN.length, label: 'bronnen' },
];

Object.assign(window, {
  FUNDAMENT_IDS, isFundament, FUNDAMENTEN, DOMEINEN,
  kindLabel, phaseLabel, practicesFor, gpCountFor, gpLabel, topicByName,
  isTip, tipCountFor, TIP_TOTAL, STATS,
});
