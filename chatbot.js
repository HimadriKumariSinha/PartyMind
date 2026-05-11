// ============================================================
// PartyMind AI — Chatbot
// ============================================================

// ─── API Key (optional) ─────────────────────────────────────
// Paste your Anthropic API key here for live AI responses.
// Get one free at: https://console.anthropic.com → API Keys
// Leave empty to use the built-in smart offline fallback.
const ANTHROPIC_API_KEY = ''; // e.g. 'sk-ant-api03-...'

// ─── Offline Smart Fallback ─────────────────────────────────
function getOfflineReply(text, themeName, themeData) {
  const q    = text.toLowerCase();
  const t    = themeName || 'your theme';
  const dec  = themeData?.decorations?.slice(0, 3).join(', ')  || '';
  const food = themeData?.food?.slice(0, 3).join(', ')          || '';
  const music= themeData?.music?.slice(0, 3).join(', ')         || '';
  const acts = themeData?.activities?.slice(0, 3).join(', ')    || '';
  const tip  = themeData?.tips || '';

  if (/decor|balloon|setup|table|centerpiece|flower/.test(q))
    return `🎨 For a **${t}** party, try these decor ideas:\n• ${dec}\n\nPro tip: layer textures and heights on tables — tall candles + low flower arrangements look stunning! ✨`;
  if (/food|eat|drink|menu|snack|cake|dessert|catering/.test(q))
    return `🍽️ Perfect **${t}** food picks:\n• ${food}\n\nFor the cake, ask your baker to match the color palette — guests always notice! 🎂`;
  if (/music|song|playlist|dj|band|play/.test(q))
    return `🎵 Set the **${t}** vibe with:\n• ${music}\n\nTip: start with upbeat tracks during arrival, slow it down at dinner, then crank it up for dancing! 💃`;
  if (/activit|game|fun|entertain|ice.?break/.test(q))
    return `🎮 Activities perfect for **${t}**:\n• ${acts}\n\nIce-breaker idea: give every guest a fun fact card about the theme to spark conversations! 🃏`;
  if (/budget|cost|cheap|save|money|afford|price/.test(q))
    return `💰 Smart budget tips for **${t}**:\n• DIY centerpieces can cut decor costs by 60%\n• Buy bulk snacks & decant into themed bowls\n• Use a Spotify playlist instead of a live DJ\n• Print invites digitally — saves ₹500–₹2000 easily! 🎯`;
  if (/invite|invitation|card|guest/.test(q))
    return `💌 Invitation ideas for **${t}**:\n• Use Canva free templates — search "${t} party"\n• Send a WhatsApp voice note for a personal touch\n• Include dress code, theme hint, and RSVP deadline\n• Digital invites save money AND look super polished! 📲`;
  if (/dress|wear|outfit|costume|attire|cloth/.test(q))
    return `👗 Dress code ideas for **${t}**:\n• ${themeData?.dress?.slice(0, 3).join(', ') || 'themed attire'}\n\nTip: mention the dress code on the invite so guests come prepared — it makes photos 10x better! 📸`;
  if (/light|lamp|candle|glow|ambiance|atmosphere/.test(q))
    return `💡 Lighting magic for **${t}**:\n• ${themeData?.lighting?.slice(0, 3).join(', ') || 'warm fairy lights, candles, uplighting'}\n\nGolden rule: dim the main lights after dinner. Warm glow = instant party vibe! 🕯️`;
  if (/tip|advice|suggest|help|idea|recommend/.test(q))
    return `✨ Top tip for **${t}**: ${tip}\n\nAlso — take a "before" photo of your setup before guests arrive. You'll thank yourself later! 📷`;
  if (/hi|hello|hey|hola|namaste/.test(q))
    return `🎉 Hey there! I'm PartyMind AI, your personal party planner!\n\nI'm ready to help with your **${t}** party. Ask me about:\n• 🎨 Decorations\n• 🍽️ Food & drinks\n• 🎵 Music\n• 💰 Budget tips\n• 👗 Dress code\n\nWhat shall we plan first?`;

  return `🎊 Great question about your **${t}** party!\n\nHere's my top suggestion: ${tip || "Focus on one wow-factor element — whether it's lighting, a photo booth, or a signature cocktail — and keep everything else simple. Guests remember the feeling, not the details!"}\n\nAsk me about decorations, food, music, budget, or activities for more specific help! 💫`;
}

// ─── Send Chat ──────────────────────────────────────────────
async function sendChat() {
  const input = document.getElementById('ci2');
  const text  = input.value.trim();
  if (!text) return;

  input.value = '';
  input.style.height = 'auto';
  addChatMsg(text, true);
  chatHistory.push({ role: 'user', content: text });
  const typing = addTyping();

  const theme     = THEMES[state.selectedTheme];
  const sysPrompt = `You are PartyMind AI, an expert party planner for a ${state.selectedTheme} themed ${state.occasion} party. Details: ${state.guests} guests, ${state.age}, ${state.venue} venue, ${state.food} food, ${state.music} music, budget level ${state.budget}/4. Be concise (under 150 words), fun, use emojis, bullet points where needed. Stay on topic.`;

  // Try live Anthropic API if key is set
  if (ANTHROPIC_API_KEY && ANTHROPIC_API_KEY.startsWith('sk-ant')) {
    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-dangerous-direct-browser-calls': 'true',
          'x-api-key': ANTHROPIC_API_KEY
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          system: sysPrompt,
          messages: chatHistory.slice(-10)
        })
      });
      const data = await res.json();
      if (!data.error) {
        const reply = data.content?.[0]?.text || '🎉 Happy to help with your party!';
        chatHistory.push({ role: 'assistant', content: reply });
        typing.querySelector('.cbub').innerHTML = reply
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return;
      }
    } catch (e) { /* fall through to offline */ }
  }

  // Offline fallback
  await new Promise(r => setTimeout(r, 600));
  const reply = getOfflineReply(text, state.selectedTheme, theme);
  chatHistory.push({ role: 'assistant', content: reply });
  typing.querySelector('.cbub').innerHTML = reply
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

function chipChat(text) {
  document.getElementById('ci2').value = text.replace(/[^\w\s]/g, '').trim();
  sendChat();
}

// ─── Chat UI Helpers ────────────────────────────────────────
function addChatMsg(text, isUser = false) {
  const cms = document.getElementById('cms');
  const div = document.createElement('div');
  div.className = 'cmsg' + (isUser ? ' um' : '');
  div.innerHTML = `<div class="cav">${isUser ? 'YOU' : '🤖'}</div><div class="cbub">${text}</div>`;
  cms.appendChild(div);
  cms.scrollTop = cms.scrollHeight;
  return div;
}

function addTyping() {
  const cms = document.getElementById('cms');
  const div = document.createElement('div');
  div.className = 'cmsg';
  div.innerHTML = `<div class="cav">🤖</div><div class="cbub"><span class="tdot"></span><span class="tdot"></span><span class="tdot"></span></div>`;
  cms.appendChild(div);
  cms.scrollTop = cms.scrollHeight;
  return div;
}

function renderChatChips(theme) {
  const chips = ['Decoration tips 🎨', 'Menu ideas 🍽️', 'Music picks 🎵', 'Budget tips 💰', 'Activities 🎮'];
  document.getElementById('cqc').innerHTML = chips
    .map(c => `<div class="cch" onclick="chipChat('${c}')">${c}</div>`)
    .join('');
}

// ─── Chat Input Auto-resize & Enter key ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const ci2 = document.getElementById('ci2');
  ci2.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 120) + 'px';
  });
  ci2.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendChat();
    }
  });
});
