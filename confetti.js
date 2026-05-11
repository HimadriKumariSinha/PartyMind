// ============================================================
// PartyMind AI — Confetti Effect
// ============================================================

function launchConfetti() {
  const canvas = document.getElementById('cc');
  const ctx    = canvas.getContext('2d');

  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#06B6D4', '#EF4444', '#ffffff'];
  const pieces = [];

  for (let i = 0; i < 160; i++) {
    pieces.push({
      x:     Math.random() * canvas.width,
      y:     -20,
      r:     Math.random() * 8 + 4,
      color: colors[~~(Math.random() * colors.length)],
      vx:    (Math.random() - 0.5) * 4,
      vy:    Math.random() * 4 + 2,
      rot:   Math.random() * 360,
      vr:    (Math.random() - 0.5) * 8,
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    });
  }

  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle   = p.color;
      ctx.globalAlpha = Math.max(0, 1 - frame / 120);

      if (p.shape === 'rect') {
        ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      p.x   += p.vx;
      p.y   += p.vy;
      p.rot += p.vr;
      p.vy  += 0.1;
    });

    frame++;
    if (frame < 140) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();
}
