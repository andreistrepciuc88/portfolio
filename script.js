const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();


(() => {
  // Evita di inizializzare il gioco due volte.
  if (document.querySelector("#neon-moto-game")) return;

  const style = document.createElement("style");
  style.textContent = `
    #neon-moto-game {
      --game-cyan: #5ee7e2;
      position: relative;
      width: min(900px, 100%);
      margin: 70px auto;
      padding: 22px;
      color: #eaf2ff;
      font-family: inherit;
      background: rgba(8, 15, 29, .82);
      border: 1px solid rgba(94, 231, 226, .2);
      border-radius: 18px;
      box-shadow: 0 0 45px rgba(0, 220, 255, .06);
      overflow: hidden;
    }

    #neon-moto-game * { box-sizing: border-box; }

    #neon-moto-game .nmg-heading {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 16px;
    }

    #neon-moto-game .nmg-eyebrow {
      color: var(--game-cyan);
      font-size: 11px;
      letter-spacing: .2em;
      text-transform: uppercase;
    }

    #neon-moto-game h2 {
      margin: 5px 0 0;
      font-size: clamp(22px, 4vw, 32px);
      letter-spacing: .04em;
    }

    #neon-moto-game .nmg-stats {
      display: flex;
      gap: 20px;
      text-align: right;
    }

    #neon-moto-game .nmg-stat-label {
      display: block;
      color: #8fa2ba;
      font-size: 10px;
      letter-spacing: .12em;
    }

    #neon-moto-game .nmg-stat-value {
      display: block;
      margin-top: 3px;
      color: var(--game-cyan);
      font-size: 21px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
    }

    #neon-moto-game .nmg-screen {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(94, 231, 226, .24);
      border-radius: 12px;
      background: #050b16;
    }

    #neon-moto-game canvas {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 16 / 9;
      touch-action: pan-y;
    }

    #neon-moto-game .nmg-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 12px;
      padding: 20px;
      text-align: center;
      background: rgba(3, 8, 18, .68);
      backdrop-filter: blur(5px);
    }

    #neon-moto-game .nmg-overlay[hidden] { display: none; }

    #neon-moto-game .nmg-overlay h3 {
      margin: 0;
      font-size: clamp(22px, 4vw, 34px);
    }

    #neon-moto-game .nmg-overlay p {
      max-width: 360px;
      margin: 0;
      color: #bdcce0;
      font-size: 13px;
      line-height: 1.7;
    }

    #neon-moto-game .nmg-button {
      padding: 12px 22px;
      color: #061018;
      background: var(--game-cyan);
      border: 0;
      border-radius: 7px;
      font: inherit;
      font-weight: 800;
      cursor: pointer;
      transition: transform .2s, box-shadow .2s;
    }

    #neon-moto-game .nmg-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 22px rgba(94, 231, 226, .3);
    }

    #neon-moto-game .nmg-controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 14px;
      color: #9cacc1;
      font-size: 12px;
    }

    #neon-moto-game .nmg-arrows {
      display: flex;
      gap: 8px;
    }

    #neon-moto-game .nmg-arrow {
      width: 48px;
      height: 42px;
      color: var(--game-cyan);
      background: rgba(94, 231, 226, .07);
      border: 1px solid rgba(94, 231, 226, .28);
      border-radius: 8px;
      font-size: 20px;
      cursor: pointer;
      touch-action: manipulation;
            -webkit-user-select: none;
      user-select: none;
      -webkit-touch-callout: none;
    }

    #neon-moto-game .nmg-arrow:active {
      background: rgba(94, 231, 226, .22);
    }

        @media (max-width: 520px) {
      #neon-moto-game { margin: 40px auto; padding: 14px; }
      #neon-moto-game .nmg-controls {
        align-items: stretch;
        flex-direction: column;
        gap: 14px;
      }
      #neon-moto-game .nmg-arrows {
        width: 100%;
        gap: 14px;
      }
      #neon-moto-game .nmg-arrow {
        flex: 1;
        width: auto;
        height: 76px;
        font-size: 30px;
        border-radius: 14px;
      }
      #neon-moto-game .nmg-stats { gap: 12px; }
    }

    @media (prefers-reduced-motion: reduce) {
      #neon-moto-game .nmg-button { transition: none; }
    }
  `;
  document.head.appendChild(style);

  const game = document.createElement("section");
  game.id = "neon-moto-game";
  game.setAttribute("aria-label", "Gioco arcade Neon Ride");
  game.innerHTML = `
    <div class="nmg-heading">
      <div>
        <div class="nmg-eyebrow">Mini game / 001</div>
        <h2>NEON RIDE<span style="color:#5ee7e2">.</span></h2>
      </div>
      <div class="nmg-stats">
        <div>
          <span class="nmg-stat-label">PUNTEGGIO</span>
          <span class="nmg-stat-value" data-score>0000</span>
        </div>
        <div>
          <span class="nmg-stat-label">RECORD</span>
          <span class="nmg-stat-value" data-best>0000</span>
        </div>
      </div>
    </div>

    <div class="nmg-screen">
      <canvas width="800" height="450" aria-label="Strada arcade: schiva gli ostacoli">
        Il gioco richiede un browser con supporto Canvas.
      </canvas>
      <div class="nmg-overlay">
        <h3 data-overlay-title>PRONTO A PARTIRE?</h3>
        <p data-overlay-text>
          Schiva le auto, resta in strada e supera il tuo record.
          Più resisti, più la velocità aumenta.
        </p>
        <button class="nmg-button" data-start>AVVIA LA MOTO ↗</button>
      </div>
    </div>

    <div class="nmg-controls">
      <span>← → oppure A / D per sterzare · Evita gli ostacoli</span>
      <div class="nmg-arrows">
        <button class="nmg-arrow" data-left aria-label="Sposta la moto a sinistra">←</button>
        <button class="nmg-arrow" data-right aria-label="Sposta la moto a destra">→</button>
      </div>
    </div>
  `;

  // Inserisce il gioco prima del footer, se presente.
  // Il gioco viene aggiunto alla pagina, ma non necessariamente nel footer.
game.id = "neon-moto-game";

const gameContainer =
  document.querySelector("#game-section") ||
  document.querySelector("main") ||
  document.body;

gameContainer.appendChild(game);

// Il pulsante nella hero porta al gioco e lo avvia.
document.querySelector("#openMotoGame")?.addEventListener("click", () => {
  game.scrollIntoView({ behavior: "smooth", block: "center" });

  const startButton = game.querySelector("[data-start]");
  if (startButton && !game.querySelector(".nmg-overlay").hidden) {
    startButton.click();
  }
});

  const canvas = game.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const overlay = game.querySelector(".nmg-overlay");
  const startButton = game.querySelector("[data-start]");
  const scoreEl = game.querySelector("[data-score]");
  const bestEl = game.querySelector("[data-best]");
  const titleEl = game.querySelector("[data-overlay-title]");
  const textEl = game.querySelector("[data-overlay-text]");

  const W = canvas.width;
  const H = canvas.height;
  const playerY = H - 92;
  const keys = { left: false, right: false };

  let running = false;
  let gameOver = false;
  let animationId = 0;
  let lastTime = 0;
  let spawnTimer = 0;
  let score = 0;
  let speed = 230;
  let roadOffset = 0;
  let playerX = W / 2;
  let obstacles = [];
  let particles = [];

  let best = 0;
  try {
    best = Number(localStorage.getItem("neonRideBest")) || 0;
  } catch (_) {}
  bestEl.textContent = String(best).padStart(4, "0");

  function roadWidth(y) {
    return 180 + (y / H) * 420;
  }

  function roadCenter(y) {
    return W / 2 + Math.sin(roadOffset * 0.0007 + y * 0.004) * (y / H) * 12;
  }

  function drawBackground() {
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#081326");
    sky.addColorStop(1, "#030711");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // Stelle e bagliori lontani.
    for (let i = 0; i < 38; i++) {
      const x = (i * 137 + 31) % W;
      const y = (i * 71 + 17) % 180;
      ctx.fillStyle = i % 3 === 0
        ? "rgba(94,231,226,.65)"
        : "rgba(180,205,255,.3)";
      ctx.fillRect(x, y, 2, 2);
    }

    // Strada in prospettiva.
    const topY = 125;
    const bottomLeft = roadCenter(H) - roadWidth(H) / 2;
    const bottomRight = roadCenter(H) + roadWidth(H) / 2;
    const topCenter = roadCenter(topY);
    const topWidth = roadWidth(topY);

    ctx.beginPath();
    ctx.moveTo(topCenter - topWidth / 2, topY);
    ctx.lineTo(topCenter + topWidth / 2, topY);
    ctx.lineTo(bottomRight, H);
    ctx.lineTo(bottomLeft, H);
    ctx.closePath();

    const asphalt = ctx.createLinearGradient(0, topY, 0, H);
    asphalt.addColorStop(0, "#101b2d");
    asphalt.addColorStop(1, "#17253a");
    ctx.fillStyle = asphalt;
    ctx.fill();

    // Bordi luminosi.
    ctx.save();
    ctx.shadowColor = "#5ee7e2";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = "rgba(94,231,226,.8)";
    ctx.lineWidth = 2;
    for (const side of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(topCenter + side * topWidth / 2, topY);
      ctx.lineTo(
        roadCenter(H) + side * roadWidth(H) / 2,
        H
      );
      ctx.stroke();
    }
    ctx.restore();

    // Linee tratteggiate animate.
    for (let i = 0; i < 12; i++) {
      const y = topY + ((i * 48 + roadOffset * 0.65) % (H - topY));
      const perspective = (y - topY) / (H - topY);
      const lineH = 3 + perspective * 18;
      const lineW = 2 + perspective * 5;
      const center = roadCenter(y);

      ctx.fillStyle = `rgba(94,231,226,${0.18 + perspective * 0.6})`;
      for (const lane of [-1 / 6, 1 / 6]) {
        ctx.fillRect(
          center + lane * roadWidth(y) - lineW / 2,
          y,
          lineW,
          lineH
        );
      }
    }

    // Bagliori laterali.
    ctx.fillStyle = "rgba(94,231,226,.035)";
    ctx.fillRect(0, 0, 3, H);
    ctx.fillRect(W - 3, 0, 3, H);
  }

  function drawBike(x, y) {
    ctx.save();
    ctx.translate(x, y);

    // Ombra luminosa.
    ctx.shadowColor = "#5ee7e2";
    ctx.shadowBlur = 18;
    ctx.fillStyle = "rgba(94,231,226,.16)";
    ctx.beginPath();
    ctx.ellipse(0, 5, 28, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Ruote.
    ctx.fillStyle = "#02050b";
    ctx.strokeStyle = "#52677c";
    ctx.lineWidth = 3;
    for (const yy of [-25, 25]) {
      ctx.beginPath();
      ctx.roundRect(-7, yy - 13, 14, 27, 6);
      ctx.fill();
      ctx.stroke();
    }

    // Carena.
    ctx.fillStyle = "#101f34";
    ctx.strokeStyle = "#5ee7e2";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -37);
    ctx.lineTo(15, -14);
    ctx.lineTo(12, 19);
    ctx.lineTo(0, 31);
    ctx.lineTo(-12, 19);
    ctx.lineTo(-15, -14);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Serbatoio e dettagli.
    ctx.fillStyle = "#5ee7e2";
    ctx.beginPath();
    ctx.moveTo(0, -24);
    ctx.lineTo(8, -10);
    ctx.lineTo(5, 2);
    ctx.lineTo(-5, 2);
    ctx.lineTo(-8, -10);
    ctx.closePath();
    ctx.fill();

    // Faro.
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 12;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(-4, -34, 8, 4);

    // Scia.
    ctx.shadowColor = "#5ee7e2";
    ctx.shadowBlur = 10;
    ctx.strokeStyle = "rgba(94,231,226,.7)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-5, 31);
    ctx.lineTo(-9, 45);
    ctx.moveTo(5, 31);
    ctx.lineTo(9, 45);
    ctx.stroke();

    ctx.restore();
  }

  function drawObstacle(o) {
    ctx.save();
    ctx.translate(o.x, o.y);

    const scale = 0.55 + (o.y / H) * 0.55;
    ctx.scale(scale, scale);

    ctx.shadowColor = o.color;
    ctx.shadowBlur = 12;

    // Auto stilizzata vista dall'alto.
    ctx.fillStyle = "#080d17";
    ctx.strokeStyle = o.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-19, -29, 38, 58, 8);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.fillStyle = "#20334a";
    ctx.beginPath();
    ctx.roundRect(-13, -16, 26, 19, 4);
    ctx.fill();

    ctx.fillStyle = o.color;
    ctx.fillRect(-13, 20, 7, 3);
    ctx.fillRect(6, 20, 7, 3);
    ctx.fillStyle = "#f3f7ff";
    ctx.fillRect(-12, -27, 6, 3);
    ctx.fillRect(6, -27, 6, 3);

    ctx.restore();
  }

  function drawParticles(dt) {
    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      ctx.globalAlpha = Math.max(0, p.life / 0.45);
      ctx.fillStyle = "#5ee7e2";
      ctx.fillRect(p.x, p.y, 3, 3);
    }
    ctx.globalAlpha = 1;
    particles = particles.filter(p => p.life > 0);
  }

  function update(dt) {
    roadOffset += speed * dt;
    score += dt * 12;
    speed = Math.min(470, 230 + score * 0.55);

    if (keys.left) playerX -= 300 * dt;
    if (keys.right) playerX += 300 * dt;

    const leftEdge = roadCenter(playerY) - roadWidth(playerY) / 2 + 30;
    const rightEdge = roadCenter(playerY) + roadWidth(playerY) / 2 - 30;
    playerX = Math.max(leftEdge, Math.min(rightEdge, playerX));

    spawnTimer += dt;
    const interval = Math.max(0.48, 1.05 - score / 1800);

        if (spawnTimer >= interval) {
      spawnTimer = 0;
      const lanes = [-0.4, -0.2, 0, 0.2, 0.4];
      let lane = lanes[Math.floor(Math.random() * lanes.length)];

      // Una volta su tre l'auto nasce sopra la posizione della moto.
      if (Math.random() < 0.3) {
        const rel = (playerX - roadCenter(playerY)) / roadWidth(playerY);
        lane = Math.max(-0.44, Math.min(0.44, rel));
      }

      const spawnY = 135;
      obstacles.push({
        lane,
        x: roadCenter(spawnY) + lane * roadWidth(spawnY),
        y: spawnY,
        color: Math.random() > 0.5 ? "#ff5488" : "#a78bfa",
        passed: false
      });
    }

    for (const o of obstacles) {
      o.y += speed * dt;
      o.x = roadCenter(o.y) + o.lane * roadWidth(o.y);

      const obstacleScale = 0.55 + (o.y / H) * 0.55;
      const hitWidth = 18 * obstacleScale + 10;
      const hitHeight = 27 * obstacleScale + 10;

      if (
        Math.abs(o.x - playerX) < hitWidth &&
        Math.abs(o.y - playerY) < hitHeight
      ) {
        endGame();
        return;
      }

      if (!o.passed && o.y > playerY + 40) {
        o.passed = true;
        score += 25;
      }
    }

    obstacles = obstacles.filter(o => o.y < H + 60);

    if (Math.random() < dt * 14) {
      particles.push({
        x: playerX + (Math.random() - 0.5) * 20,
        y: playerY + 35,
        vx: (Math.random() - 0.5) * 35,
        vy: 80 + Math.random() * 90,
        life: 0.45
      });
    }

    scoreEl.textContent = String(Math.floor(score)).padStart(4, "0");
  }

  function render(dt = 0) {
    drawBackground();
    for (const o of obstacles) drawObstacle(o);
    drawParticles(dt);
    drawBike(playerX, playerY);
  }

  function frame(timestamp) {
    if (!running) return;

    const dt = Math.min((timestamp - (lastTime || timestamp)) / 1000, 0.035);
    lastTime = timestamp;

    update(dt);
    render(dt);

    if (running) animationId = requestAnimationFrame(frame);
  }

  function startGame() {
    cancelAnimationFrame(animationId);
    score = 0;
    speed = 230;
    roadOffset = 0;
    spawnTimer = 0;
    obstacles = [];
    particles = [];
    playerX = W / 2;
    lastTime = 0;
    gameOver = false;
    running = true;
    keys.left = false;
    keys.right = false;

    overlay.hidden = true;
    scoreEl.textContent = "0000";
    animationId = requestAnimationFrame(frame);
  }

  function endGame() {
    if (!running) return;
    running = false;
    gameOver = true;
    cancelAnimationFrame(animationId);

    const finalScore = Math.floor(score);
    if (finalScore > best) {
      best = finalScore;
      bestEl.textContent = String(best).padStart(4, "0");
      try {
        localStorage.setItem("neonRideBest", String(best));
      } catch (_) {}
    }

    titleEl.textContent = "CRASH! RIDE SAFE 💥";
    textEl.textContent =
      `Hai totalizzato ${finalScore} punti. ` +
      "Riprova e cerca di superare il tuo record!";
    startButton.textContent = "RIPROVA ↻";
    overlay.hidden = false;
  }

  function setKey(key, value) {
    if (key === "ArrowLeft" || key.toLowerCase() === "a") {
      keys.left = value;
    }
    if (key === "ArrowRight" || key.toLowerCase() === "d") {
      keys.right = value;
    }
  }

  document.addEventListener("keydown", e => {
    if (!game.contains(document.activeElement) &&
        !running && e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" && e.key.toLowerCase() !== "a" &&
        e.key.toLowerCase() !== "d") return;

    if (["ArrowLeft", "ArrowRight", "a", "d", "A", "D"].includes(e.key)) {
      e.preventDefault();
      setKey(e.key, true);
    }
  });

  document.addEventListener("keyup", e => setKey(e.key, false));
  window.addEventListener("blur", () => {
    keys.left = false;
    keys.right = false;
  });

  game.querySelector("[data-left]").addEventListener("pointerdown", e => {
    e.preventDefault();
    keys.left = true;
  });
  game.querySelector("[data-right]").addEventListener("pointerdown", e => {
    e.preventDefault();
    keys.right = true;
  });

  for (const button of game.querySelectorAll(".nmg-arrow")) {
    button.addEventListener("contextmenu", e => e.preventDefault());
    button.addEventListener("pointerup", () => {
      keys.left = false;
      keys.right = false;
    });
    button.addEventListener("pointerleave", () => {
      keys.left = false;
      keys.right = false;
    });
    button.addEventListener("pointercancel", () => {
      keys.left = false;
      keys.right = false;
    });
  }

  startButton.addEventListener("click", startGame);

  // Schermata iniziale statica.
  render();
})();

