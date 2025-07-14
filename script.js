const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: undefined,
  y: undefined
};

document.addEventListener('mousemove', function(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

class Drop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = 10 + Math.random() * 20;
    this.speed = 2 + Math.random() * 4;
    this.opacity = 0.4 + Math.random() * 0.6;
  }

  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const minDist = 100;

    if (dist < minDist) {
      if (dist > 0) {
        this.x += dx / dist;
        this.y += dy / dist;
      }
    } else {
      this.y += this.speed;
    }

    if (this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(0, 174, 239, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }
}

let drops = [];

function init() {
  drops = [];
  for (let i = 0; i < 300; i++) {
    drops.push(new Drop());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let drop of drops) {
    drop.update();
    drop.draw();
  }
  requestAnimationFrame(animate);
}

init();
animate();
