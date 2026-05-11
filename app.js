// ============================================================
// PartyMind AI — App State & Initialisation
// ============================================================

// ─── Global State ───────────────────────────────────────────
let state = {
  occasion: 'Birthday',
  age: 'Adults',
  guests: 50,
  duration: 4,
  date: '',
  venue: 'Indoor',
  budget: 2,
  food: 'Veg',
  music: 'Live Band',
  theme: 'auto',
  dress: 'Smart Casual',
  location: '',
  special: '',
  selectedTheme: null
};

const budgetLabels = [
  '₹5,000 – ₹15,000',
  '₹20,000 – ₹50,000',
  '₹60,000 – ₹1,00,000',
  '₹2,00,000+'
];

let chatHistory   = [];
let cdInterval    = null;

// ─── Dark / Light Toggle ────────────────────────────────────
document.getElementById('tt').onclick = () => {
  const html   = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('tt').textContent = isDark ? '☀️' : '🌙';
};

// ─── Nav Helpers ────────────────────────────────────────────
function scrollTop() {
  document.getElementById('top').scrollIntoView({ behavior: 'smooth' });
}
function gotoGen() {
  document.getElementById('gen').scrollIntoView({ behavior: 'smooth' });
}

// ─── Chip Setup ─────────────────────────────────────────────
function initChips() {
  setupChips('ocChips', v => state.occasion = v);
  setupChips('agChips', v => state.age      = v);
  setupChips('vChips',  v => state.venue    = v, 'vc');
  setupChips('fdChips', v => state.food     = v);
  setupChips('muChips', v => state.music    = v);
  setupChips('thChips', v => state.theme    = v);
  setupChips('dcChips', v => state.dress    = v);

  document.getElementById('gr').oninput = e => {
    state.guests = +e.target.value;
    document.getElementById('gv').textContent = e.target.value;
  };
  document.getElementById('dr').oninput = e => {
    state.duration = +e.target.value;
    document.getElementById('dv').textContent = e.target.value;
  };
  document.getElementById('br').oninput = e => {
    state.budget = +e.target.value;
    document.getElementById('bd').textContent = budgetLabels[e.target.value - 1];
  };
}

function setupChips(id, cb, cls = 'co') {
  document.getElementById(id).querySelectorAll('.' + cls).forEach(el => {
    el.onclick = () => {
      document.getElementById(id).querySelectorAll('.' + cls).forEach(x => x.classList.remove('on'));
      el.classList.add('on');
      cb(el.dataset.v);
    };
  });
}

// ─── Wizard Step Navigation ─────────────────────────────────
function goStep(n) {
  document.querySelectorAll('.wstep').forEach(s => s.classList.remove('active'));
  document.getElementById('ws' + n).classList.add('active');

  document.querySelectorAll('.pstep').forEach(s => {
    const sn = +s.dataset.s;
    s.classList.remove('active', 'done');
    if      (sn < n)  s.classList.add('done');
    else if (sn === n) s.classList.add('active');
  });

  for (let i = 1; i <= 3; i++) {
    const el = document.getElementById('pl' + i);
    if (el) el.classList.toggle('done', i < n);
  }

  document.getElementById('gen').scrollIntoView({ behavior: 'smooth' });
}

// ─── Toast ──────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ─── Sound FAB ──────────────────────────────────────────────
let soundOn = false;
document.getElementById('sfab').onclick = () => {
  soundOn = !soundOn;
  document.getElementById('sfab').textContent = soundOn ? '🔊' : '🔇';
  showToast(soundOn ? '🎵 Vibe mode on!' : '🔇 Sound off');
};

// ─── Initialise ─────────────────────────────────────────────
initChips();
