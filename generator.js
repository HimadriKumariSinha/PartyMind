// ============================================================
// PartyMind AI — Generator & Render Logic
// ============================================================

// ─── Smart Theme Picker ─────────────────────────────────────
function pickTheme() {
  if (state.theme !== 'auto') return state.theme;

  const scores = {};
  THEME_KEYS.forEach(k => scores[k] = 0);

  // Occasion-based
  if (['Wedding', 'Anniversary'].includes(state.occasion)) {
    scores['Masquerade Ball'] += 3;
    scores['Great Gatsby']    += 3;
  }
  if (state.occasion === 'Birthday' && state.age === 'Kids') scores['Tropical'] += 4;
  if (state.occasion === 'Halloween') scores['Enchanted Forest'] += 4;
  if (['Corporate', 'Farewell'].includes(state.occasion))  scores['Great Gatsby'] += 3;
  if (state.occasion === 'New Year') scores['80s Retro'] += 3;

  // Age
  if (state.age === 'Teens' || state.age === 'Kids') {
    scores['80s Retro'] += 2;
    scores['Tropical']  += 2;
  }
  if (state.age === 'Adults') {
    scores['Great Gatsby']    += 2;
    scores['Masquerade Ball'] += 2;
  }
  if (state.age === 'Mixed') {
    scores['Tropical']          += 2;
    scores['Enchanted Forest']  += 2;
  }

  // Venue
  if (['Outdoor', 'Garden', 'Beach'].includes(state.venue)) {
    scores['Tropical']         += 3;
    scores['Enchanted Forest'] += 2;
  }
  if (['Indoor', 'Banquet Hall'].includes(state.venue)) {
    scores['Masquerade Ball'] += 2;
    scores['Great Gatsby']    += 2;
  }
  if (state.venue === 'Rooftop') {
    scores['Great Gatsby'] += 3;
    scores['80s Retro']    += 2;
  }

  // Budget
  if (state.budget >= 3) {
    scores['Masquerade Ball'] += 2;
    scores['Great Gatsby']    += 2;
  }
  if (state.budget <= 1) {
    scores['Tropical']  += 2;
    scores['80s Retro'] += 2;
  }

  return THEME_KEYS.sort((a, b) => scores[b] - scores[a])[0];
}

function rankThemes() {
  const tmp    = { ...state };
  const scores = {};
  THEME_KEYS.forEach(k => {
    scores[k] = 0;
    if (['Wedding', 'Anniversary'].includes(tmp.occasion) && ['Masquerade Ball', 'Great Gatsby'].includes(k))       scores[k] += 3;
    if (tmp.age === 'Teens'   && ['80s Retro', 'Tropical'].includes(k))                                              scores[k] += 2;
    if (tmp.age === 'Adults'  && ['Great Gatsby', 'Masquerade Ball'].includes(k))                                    scores[k] += 2;
    if (['Outdoor', 'Beach'].includes(tmp.venue)        && ['Tropical', 'Enchanted Forest'].includes(k))             scores[k] += 2;
    if (['Indoor', 'Banquet Hall'].includes(tmp.venue)  && ['Masquerade Ball', 'Great Gatsby'].includes(k))         scores[k] += 2;
    if (tmp.budget >= 3 && ['Masquerade Ball', 'Great Gatsby'].includes(k))                                         scores[k] += 2;
  });
  const sorted = THEME_KEYS.sort((a, b) => scores[b] - scores[a]);
  const picked = state.selectedTheme;
  return [picked, ...sorted.filter(k => k !== picked)];
}

// ─── Generate Flow ──────────────────────────────────────────
async function generateParty() {
  state.location = document.getElementById('locIn').value;
  state.special  = document.getElementById('specIn').value;
  state.date     = document.getElementById('evDate').value;

  goStep(4);

  const steps = [
    [0.1, '🎊', 'Analyzing your preferences...'],
    [0.3, '🎨', 'Matching perfect themes...'],
    [0.5, '🍽️', 'Crafting food & drink menu...'],
    [0.7, '🎵', 'Curating music playlist...'],
    [0.9, '✨', 'Finalizing your dream party...'],
    [1.0, '🎉', 'Ready! Launching your plan...'],
  ];

  for (const [pct, emoji, txt] of steps) {
    await sleep(700);
    document.getElementById('gfill').style.width = (pct * 100) + '%';
    document.getElementById('gem').textContent   = emoji;
    document.getElementById('gstep').textContent = txt;
  }

  await sleep(600);
  renderResults();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Render Results ─────────────────────────────────────────
function renderResults() {
  const picked = pickTheme();
  state.selectedTheme = picked;
  const theme = THEMES[picked];

  // Show results section
  document.getElementById('gen').style.display = 'none';
  const res = document.getElementById('results');
  res.style.display = 'block';
  res.scrollIntoView({ behavior: 'smooth' });

  launchConfetti();

  // Countdown
  if (state.date) {
    document.getElementById('cdb').style.display = 'flex';
    startCountdown(new Date(state.date));
  }

  // Header
  document.getElementById('rbadge').textContent = `${theme.icon} ${state.occasion} Party Plan`;
  document.getElementById('rtitle').textContent = `${theme.icon} ${picked}`;
  document.getElementById('rdesc').textContent  = theme.desc;

  // Colour palette
  document.getElementById('rpal').innerHTML = theme.colors
    .map(c => `<div class="pd" style="background:${c}" title="${c}"></div>`)
    .join('');

  // Theme cards ranked
  const ranking = rankThemes();
  document.getElementById('tcc').innerHTML = ranking.map((k, i) => {
    const t = THEMES[k];
    return `<div class="tcard${k === picked ? ' sel' : ''}" onclick="switchTheme('${k}')" style="animation-delay:${i * 0.08}s">
      ${i === 0 ? '<div class="tcbest">Best Match</div>' : ''}
      <div class="tcion">${t.icon}</div>
      <div class="tcname">${k}</div>
      <div class="tcsub">${t.sub}</div>
    </div>`;
  }).join('');

  renderDetailCards(theme);
  renderChecklist();
  renderMoodboard(theme);
  renderChatChips(theme);

  chatHistory = [{
    role: 'user',
    content: `My party: ${state.occasion} for ${state.age}, ${state.guests} guests, ${state.venue} venue, ${state.food} food, ${state.music} music, ${picked} theme.`
  }];
}

// ─── Detail Cards ───────────────────────────────────────────
function renderDetailCards(theme) {
  const cards = [
    { icon: '🎨', title: 'Decorations',      items: theme.decorations },
    { icon: '🍽️', title: 'Food & Drinks',    items: theme.food        },
    { icon: '🎵', title: 'Music Playlist',   items: theme.music       },
    { icon: '👗', title: 'Dress Code',        items: theme.dress       },
    { icon: '🎮', title: 'Activities & Games',items: theme.activities  },
    { icon: '💡', title: 'Lighting Setup',    items: theme.lighting    },
  ];
  document.getElementById('dg').innerHTML = cards.map((c, i) => `
    <div class="dcard" style="animation-delay:${i * 0.1}s">
      <div class="dch"><div class="dicon">${c.icon}</div><div class="dtitle">${c.title}</div></div>
      <div class="ditems">${c.items.map(it => `<div class="ditem">${it}</div>`).join('')}</div>
    </div>`).join('');
}

// ─── Checklist ──────────────────────────────────────────────
function renderChecklist() {
  const items = [
    '📅 Set the event date & book venue',
    '💌 Design & send invitations',
    '🎨 Order theme decorations',
    '🍽️ Book catering / finalize menu',
    '🎵 Book DJ / band / playlist',
    '📸 Hire photographer / set up photo booth',
    '🎁 Arrange party favours for guests',
    '👗 Confirm dress code with all guests',
    '🕯️ Set up lighting & ambiance',
    '🎂 Order themed cake',
    '🪑 Arrange seating & furniture',
    '🔊 Test sound system & speakers',
    '🛒 Shop for all supplies & props',
    '🧹 Arrange venue cleanup crew',
    '🚗 Plan guest parking & transport',
    '🎊 Day-of: decorate 3 hours early',
  ];
  document.getElementById('cl').innerHTML = items.map(item => `
    <div class="ci" onclick="toggleCheck(this)">
      <div class="cb"></div>
      <div class="ct">${item}</div>
    </div>`).join('');
}

function toggleCheck(el) {
  el.classList.toggle('done');
  el.querySelector('.cb').textContent = el.classList.contains('done') ? '✓' : '';
}

// ─── Moodboard ──────────────────────────────────────────────
function renderMoodboard(theme) {
  const tiles = [
    { emoji: theme.icon, label: 'Theme Vibe',  bg: theme.colors[2] + '33' },
    { emoji: '🎨',        label: 'Color Palette', bg: theme.colors[0] + '55' },
    { emoji: '🍽️',        label: 'Cuisine',       bg: 'rgba(16,185,129,0.2)' },
    { emoji: '💡',        label: 'Lighting',      bg: 'rgba(245,158,11,0.2)' },
    { emoji: '🎵',        label: 'Music',         bg: 'rgba(139,92,246,0.2)' },
    { emoji: '👗',        label: 'Fashion',       bg: 'rgba(236,72,153,0.2)' },
    { emoji: '🎮',        label: 'Activities',    bg: 'rgba(6,182,212,0.2)'  },
    { emoji: '🌟',        label: 'Ambiance',      bg: theme.colors[1] + '33' },
  ];
  document.getElementById('mbg').innerHTML = tiles.map(t => `
    <div class="mbt" style="background:${t.bg};border-color:${t.bg}">
      ${t.emoji}
      <span class="ml">${t.label}</span>
    </div>`).join('');
}

// ─── Switch Theme ───────────────────────────────────────────
function switchTheme(key) {
  state.selectedTheme = key;
  document.querySelectorAll('.tcard').forEach(c => c.classList.remove('sel'));
  event.currentTarget.classList.add('sel');
  renderDetailCards(THEMES[key]);
  document.getElementById('rbadge').textContent = `${THEMES[key].icon} ${state.occasion} Party Plan`;
  document.getElementById('rtitle').textContent = `${THEMES[key].icon} ${key}`;
  document.getElementById('rdesc').textContent  = THEMES[key].desc;
  document.getElementById('rpal').innerHTML = THEMES[key].colors
    .map(c => `<div class="pd" style="background:${c}"></div>`).join('');
  renderMoodboard(THEMES[key]);
  renderChatChips(THEMES[key]);
  showToast(`Switched to ${key}! ✨`);
}

// ─── Countdown Timer ────────────────────────────────────────
function startCountdown(target) {
  if (cdInterval) clearInterval(cdInterval);
  cdInterval = setInterval(() => {
    const diff = target - new Date();
    if (diff <= 0) { clearInterval(cdInterval); return; }
    document.getElementById('cdd').textContent = String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('cdh').textContent = String(Math.floor(diff % 86400000 / 3600000)).padStart(2, '0');
    document.getElementById('cdm').textContent = String(Math.floor(diff % 3600000 / 60000)).padStart(2, '0');
    document.getElementById('cds').textContent = String(Math.floor(diff % 60000 / 1000)).padStart(2, '0');
  }, 1000);
}

// ─── Surprise Me ────────────────────────────────────────────
function surpriseMe() {
  const occasions = ['Birthday', 'Anniversary', 'Farewell', 'Graduation', 'New Year'];
  const ages      = ['Adults', 'Teens', 'Mixed'];
  const venues    = ['Indoor', 'Outdoor', 'Rooftop'];

  state.occasion = occasions[~~(Math.random() * occasions.length)];
  state.age      = ages[~~(Math.random() * ages.length)];
  state.venue    = venues[~~(Math.random() * venues.length)];
  state.guests   = [20, 50, 100, 200][~~(Math.random() * 4)];
  state.budget   = ~~(Math.random() * 4) + 1;
  state.theme    = THEME_KEYS[~~(Math.random() * THEME_KEYS.length)];

  document.getElementById('gv').textContent = state.guests;
  document.getElementById('gr').value       = state.guests;
  showToast('🎲 Surprise! Generating random party...');
  gotoGen();

  setTimeout(() => {
    goStep(4);
    setTimeout(async () => {
      const steps = [
        [0.3, '🎊', 'Mixing random vibes...'],
        [0.7, '✨', 'Almost ready!'],
        [1.0, '🎉', 'Surprise party ready!']
      ];
      for (const [p, e, t] of steps) {
        await sleep(700);
        document.getElementById('gfill').style.width = (p * 100) + '%';
        document.getElementById('gem').textContent   = e;
        document.getElementById('gstep').textContent = t;
      }
      await sleep(500);
      renderResults();
    }, 100);
  }, 600);
}

// ─── Reset ──────────────────────────────────────────────────
function resetG() {
  document.getElementById('results').style.display = 'none';
  document.getElementById('gen').style.display     = 'block';
  document.getElementById('gfill').style.width     = '0%';
  goStep(1);
  gotoGen();
  chatHistory = [];
  document.getElementById('cms').innerHTML =
    '<div class="cmsg"><div class="cav">🤖</div><div class="cbub">Hi! Your party plan is ready! Ask me anything about your party theme! 🎉</div></div>';
  if (cdInterval) clearInterval(cdInterval);
}

// ─── Download Plan ──────────────────────────────────────────
function dlPDF() {
  const theme   = THEMES[state.selectedTheme];
  const content = `
PartyMind AI — Party Plan
=========================
Theme: ${state.selectedTheme}
Occasion: ${state.occasion}
Age Group: ${state.age}
Guests: ${state.guests}
Duration: ${state.duration} hours
Venue: ${state.venue}
Budget: ${budgetLabels[state.budget - 1]}
Food: ${state.food}
Music: ${state.music}
Dress Code: ${state.dress}
${state.location ? 'Location: ' + state.location : ''}

DECORATIONS:
${theme.decorations.map((d, i) => `${i + 1}. ${d}`).join('\n')}

FOOD & DRINKS:
${theme.food.map((d, i) => `${i + 1}. ${d}`).join('\n')}

MUSIC:
${theme.music.map((d, i) => `${i + 1}. ${d}`).join('\n')}

DRESS CODE:
${theme.dress.map((d, i) => `${i + 1}. ${d}`).join('\n')}

ACTIVITIES:
${theme.activities.map((d, i) => `${i + 1}. ${d}`).join('\n')}

LIGHTING:
${theme.lighting.map((d, i) => `${i + 1}. ${d}`).join('\n')}

PRO TIP: ${theme.tips}

Generated by PartyMind AI ✨`;

  const blob = new Blob([content], { type: 'text/plain' });
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `PartyMind_${state.selectedTheme.replace(/\s/g, '_')}_Plan.txt`;
  a.click();
  showToast('📥 Party plan downloaded!');
}

// ─── Share ──────────────────────────────────────────────────
function shareP() {
  const text = `🎊 Check out my ${state.selectedTheme} party plan for ${state.guests} guests! Generated by PartyMind AI ✨`;
  if (navigator.share) {
    navigator.share({ title: 'PartyMind AI Party Plan', text });
  } else {
    navigator.clipboard.writeText(text).then(() => showToast('🔗 Link copied to clipboard!'));
  }
}
