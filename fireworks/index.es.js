/**
 * name: fireworks-js
 * version: 2.5.1
 * author: Vitalij Ryndin (https://crashmax.ru)
 * homepage: https://fireworks.js.org
 * license MIT
 */
function x(e) {
  return Math.abs(Math.floor(e));
}
function d(e, t) {
  return Math.random() * (t - e) + e;
}
function a(e, t) {
  return Math.floor(d(e, t + 1));
}
function m(e, t, i, s) {
  const n = Math.pow;
  return Math.sqrt(n(e - i, 2) + n(t - s, 2));
}
function g(e, t, i = 1) {
  if (e > 360 || e < 0)
    throw new Error(`Expected hue 0-360 range, got \`${e}\``);
  if (t > 100 || t < 0)
    throw new Error(`Expected lightness 0-100 range, got \`${t}\``);
  if (i > 1 || i < 0)
    throw new Error(`Expected alpha 0-1 range, got \`${i}\``);
  return `hsla(${e}, 100%, ${t}%, ${i})`;
}
const w = (e) => {
  if (typeof e == "object" && e !== null) {
    if (typeof Object.getPrototypeOf == "function") {
      const t = Object.getPrototypeOf(e);
      return t === Object.prototype || t === null;
    }
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  return !1;
}, b = [
  "__proto__",
  "constructor",
  "prototype"
], v = (...e) => e.reduce((t, i) => (Object.keys(i).forEach((s) => {
  b.includes(s) || (Array.isArray(t[s]) && Array.isArray(i[s]) ? t[s] = i[s] : w(t[s]) && w(i[s]) ? t[s] = v(t[s], i[s]) : t[s] = i[s]);
}), t), {});
class S {
  x;
  y;
  ctx;
  hue;
  friction;
  gravity;
  flickering;
  lineWidth;
  explosionLength;
  angle;
  speed;
  brightness;
  coordinates = [];
  decay;
  alpha = 1;
  constructor({
    x: t,
    y: i,
    ctx: s,
    hue: n,
    decay: r,
    gravity: c,
    friction: l,
    brightness: o,
    flickering: u,
    lineWidth: p,
    explosionLength: f
  }) {
    for (this.x = t, this.y = i, this.ctx = s, this.hue = n, this.gravity = c, this.friction = l, this.flickering = u, this.lineWidth = p, this.explosionLength = f, this.angle = d(0, Math.PI * 2), this.speed = a(1, 10), this.brightness = a(o.min, o.max), this.decay = d(r.min, r.max); this.explosionLength--; )
      this.coordinates.push([t, i]);
  }
  update(t) {
    this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.friction, this.x += Math.cos(this.angle) * this.speed, this.y += Math.sin(this.angle) * this.speed + this.gravity, this.alpha -= this.decay, this.alpha <= this.decay && t();
  }
  draw() {
    const t = this.coordinates.length - 1;
    this.ctx.beginPath(), this.ctx.lineWidth = this.lineWidth, this.ctx.fillStyle = g(this.hue, this.brightness, this.alpha), this.ctx.moveTo(
      this.coordinates[t][0],
      this.coordinates[t][1]
    ), this.ctx.lineTo(this.x, this.y), this.ctx.strokeStyle = g(
      this.hue,
      this.flickering ? d(0, this.brightness) : this.brightness,
      this.alpha
    ), this.ctx.stroke();
  }
}
class E {
  hue;
  rocketsPoint;
  opacity;
  acceleration;
  friction;
  gravity;
  particles;
  explosion;
  mouse;
  boundaries;
  sound;
  delay;
  brightness;
  decay;
  flickering;
  intensity;
  traceLength;
  traceSpeed;
  lineWidth;
  lineStyle;
  autoresize;
  constructor() {
    this.autoresize = !0, this.lineStyle = "round", this.flickering = 50, this.traceLength = 3, this.traceSpeed = 10, this.intensity = 30, this.explosion = 5, this.gravity = 1.5, this.opacity = 0.5, this.particles = 50, this.friction = 0.95, this.acceleration = 1.05, this.hue = {
      min: 0,
      max: 360
    }, this.rocketsPoint = {
      min: 50,
      max: 50
    }, this.lineWidth = {
      explosion: {
        min: 1,
        max: 3
      },
      trace: {
        min: 1,
        max: 2
      }
    }, this.mouse = {
      click: !1,
      move: !1,
      max: 1
    }, this.delay = {
      min: 30,
      max: 60
    }, this.brightness = {
      min: 50,
      max: 80
    }, this.decay = {
      min: 0.015,
      max: 0.03
    }, this.sound = {
      enabled: !1,
      files: [
        "explosion0.mp3",
        "explosion1.mp3",
        "explosion2.mp3"
      ],
      volume: {
        min: 4,
        max: 8
      }
    }, this.boundaries = {
      height: 0,
      width: 0,
      x: 50,
      y: 50
    };
  }
  updateOptions(t) {
    Object.assign(this, v(this, t));
  }
}
const h = new E();
class L {
  constructor(t) {
    this.canvas = t, this.pointerDown = this.pointerDown.bind(this), this.pointerUp = this.pointerUp.bind(this), this.pointerMove = this.pointerMove.bind(this);
  }
  active = !1;
  x;
  y;
  subscribe() {
    this.canvas.addEventListener("pointerdown", this.pointerDown), this.canvas.addEventListener("pointerup", this.pointerUp), this.canvas.addEventListener("pointermove", this.pointerMove);
  }
  unsubscribe() {
    this.canvas.removeEventListener("pointerdown", this.pointerDown), this.canvas.removeEventListener("pointerup", this.pointerUp), this.canvas.removeEventListener("pointermove", this.pointerMove);
  }
  usePointer(t, i) {
    (h.mouse.click || h.mouse.move) && (this.x = t.pageX - this.canvas.offsetLeft, this.y = t.pageY - this.canvas.offsetTop, this.active = i);
  }
  pointerDown(t) {
    this.usePointer(t, h.mouse.click);
  }
  pointerUp(t) {
    this.usePointer(t, !1);
  }
  pointerMove(t) {
    this.usePointer(t, this.active);
  }
}
class M {
  constructor(t) {
    this.render = t;
  }
  tick = 0;
  rafId = 0;
  fps = 60;
  tolerance = 0.1;
  now;
  start() {
    this.now = performance.now();
    const t = 1e3 / this.fps, i = (s) => {
      this.rafId = requestAnimationFrame(i);
      const n = s - this.now;
      n >= t - this.tolerance && (this.render(), this.now = s - n % t, this.tick += n * (h.intensity * Math.PI) / 1e3);
    };
    this.rafId = requestAnimationFrame(i);
  }
  stop() {
    cancelAnimationFrame(this.rafId);
  }
}
class z {
  constructor(t) {
    this.fireworks = t, this.handleResize = this.handleResize.bind(this);
  }
  subscribe() {
    h.autoresize && window.addEventListener("resize", this.handleResize);
  }
  unsubscribe() {
    h.autoresize && window.removeEventListener("resize", this.handleResize);
  }
  handleResize() {
    this.fireworks.updateSize();
  }
}
class C {
  sounds = [];
  audioContext;
  onInit = !1;
  constructor() {
    this.init();
  }
  init() {
    !this.onInit && h.sound.enabled && (this.onInit = !0, this.audioContext = new (window.AudioContext || window.webkitAudioContext)(), this.loadSounds());
  }
  async loadSounds() {
    for (const t of h.sound.files) {
      const i = await (await fetch(t)).arrayBuffer();
      this.audioContext.decodeAudioData(i).then((s) => {
        this.sounds.push(s);
      }).catch((s) => {
        throw s;
      });
    }
  }
  play() {
    if (h.sound.enabled && this.sounds.length) {
      const t = this.audioContext.createBufferSource(), i = this.sounds[a(0, this.sounds.length - 1)], s = this.audioContext.createGain();
      t.buffer = i, s.gain.value = d(
        h.sound.volume.min / 100,
        h.sound.volume.max / 100
      ), s.connect(this.audioContext.destination), t.connect(s), t.start(0);
    } else
      this.init();
  }
}
class O {
  x;
  y;
  sx;
  sy;
  dx;
  dy;
  ctx;
  hue;
  speed;
  acceleration;
  traceLength;
  totalDistance;
  angle;
  brightness;
  coordinates = [];
  currentDistance = 0;
  constructor({
    x: t,
    y: i,
    dx: s,
    dy: n,
    ctx: r,
    hue: c,
    speed: l,
    traceLength: o,
    acceleration: u
  }) {
    for (this.x = t, this.y = i, this.sx = t, this.sy = i, this.dx = s, this.dy = n, this.ctx = r, this.hue = c, this.speed = l, this.traceLength = o, this.acceleration = u, this.totalDistance = m(t, i, s, n), this.angle = Math.atan2(n - i, s - t), this.brightness = a(50, 70); this.traceLength--; )
      this.coordinates.push([t, i]);
  }
  update(t) {
    this.coordinates.pop(), this.coordinates.unshift([this.x, this.y]), this.speed *= this.acceleration;
    const i = Math.cos(this.angle) * this.speed, s = Math.sin(this.angle) * this.speed;
    this.currentDistance = m(
      this.sx,
      this.sy,
      this.x + i,
      this.y + s
    ), this.currentDistance >= this.totalDistance ? t(this.dx, this.dy, this.hue) : (this.x += i, this.y += s);
  }
  draw() {
    const t = this.coordinates.length - 1;
    this.ctx.beginPath(), this.ctx.moveTo(
      this.coordinates[t][0],
      this.coordinates[t][1]
    ), this.ctx.lineTo(this.x, this.y), this.ctx.strokeStyle = g(this.hue, this.brightness), this.ctx.stroke();
  }
}
class R {
  target;
  container;
  canvas;
  ctx;
  width;
  height;
  sound;
  resize;
  mouse;
  traces = [];
  explosions = [];
  waitStopRaf;
  raf;
  running = !1;
  constructor(t, i = {}) {
    this.target = t, this.container = t, this.createCanvas(this.target), this.updateOptions(i), this.sound = new C(), this.resize = new z(this), this.mouse = new L(this.canvas), this.raf = new M(this.render.bind(this));
  }
  get isRunning() {
    return this.running;
  }
  get version() {
    return "2.5.1";
  }
  start() {
    this.running || (this.canvas.isConnected || this.createCanvas(this.target), this.running = !0, this.resize.subscribe(), this.mouse.subscribe(), this.raf.start());
  }
  stop(t = !1) {
    !this.running || (this.running = !1, this.resize.unsubscribe(), this.mouse.unsubscribe(), this.raf.stop(), this.clear(), t && this.canvas.remove());
  }
  async waitStop(t) {
    if (!!this.running)
      return new Promise((i) => {
        this.waitStopRaf = () => {
          !this.waitStopRaf || (requestAnimationFrame(this.waitStopRaf), !this.traces.length && !this.explosions.length && (this.waitStopRaf = null, this.stop(t), i()));
        }, this.waitStopRaf();
      });
  }
  pause() {
    this.running = !this.running, this.running ? this.raf.start() : this.raf.stop();
  }
  clear() {
    !this.ctx || (this.traces = [], this.explosions = [], this.ctx.clearRect(0, 0, this.width, this.height));
  }
  updateOptions(t) {
    h.updateOptions(t);
  }
  updateSize({
    width: t = this.container.clientWidth,
    height: i = this.container.clientHeight
  } = {}) {
    this.width = t, this.height = i, this.canvas.width = t, this.canvas.height = i, this.updateBoundaries({
      ...h.boundaries,
      width: t,
      height: i
    });
  }
  updateBoundaries(t) {
    this.updateOptions({ boundaries: t });
  }
  createCanvas(t) {
    t instanceof HTMLCanvasElement ? (t.isConnected || document.body.append(t), this.canvas = t) : (this.canvas = document.createElement("canvas"), this.container.append(this.canvas)), this.ctx = this.canvas.getContext("2d"), this.updateSize();
  }
  render() {
    !this.ctx || !this.running || (this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillStyle = `rgba(0, 0, 0, ${h.opacity})`, this.ctx.fillRect(0, 0, this.width, this.height), this.ctx.globalCompositeOperation = "lighter", this.ctx.lineCap = h.lineStyle, this.ctx.lineJoin = "round", this.initTrace(), this.drawTrace(), this.drawExplosion());
  }
  initTrace() {
    if (this.waitStopRaf)
      return;
    const {
      hue: t,
      delay: i,
      rocketsPoint: s,
      boundaries: n,
      traceLength: r,
      traceSpeed: c,
      acceleration: l,
      mouse: o
    } = h;
    (this.raf.tick > a(i.min, i.max) || this.mouse.active && o.max > this.traces.length) && (this.traces.push(
      new O({
        x: this.width * a(s.min, s.max) / 100,
        y: this.height,
        dx: this.mouse.x && o.move || this.mouse.active ? this.mouse.x : a(n.x, n.width - n.x * 2),
        dy: this.mouse.y && o.move || this.mouse.active ? this.mouse.y : a(n.y, n.height * 0.5),
        ctx: this.ctx,
        hue: a(t.min, t.max),
        speed: c,
        acceleration: l,
        traceLength: x(r)
      })
    ), this.raf.tick = 0);
  }
  drawTrace() {
    this.ctx.lineWidth = d(
      h.lineWidth.trace.min,
      h.lineWidth.trace.max
    );
    let t = this.traces.length;
    for (; t--; )
      this.traces[t].draw(), this.traces[t].update((i, s, n) => {
        this.initExplosion(i, s, n), this.sound.play(), this.traces.splice(t, 1);
      });
  }
  initExplosion(t, i, s) {
    const {
      particles: n,
      flickering: r,
      lineWidth: c,
      explosion: l,
      brightness: o,
      friction: u,
      gravity: p,
      decay: f
    } = h;
    let y = x(n);
    for (; y--; )
      this.explosions.push(
        new S({
          x: t,
          y: i,
          ctx: this.ctx,
          hue: s,
          friction: u,
          gravity: p,
          flickering: a(0, 100) <= r,
          lineWidth: d(
            c.explosion.min,
            c.explosion.max
          ),
          explosionLength: x(l),
          brightness: o,
          decay: f
        })
      );
  }
  drawExplosion() {
    let t = this.explosions.length;
    for (; t--; )
      this.explosions[t].draw(), this.explosions[t].update(() => {
        this.explosions.splice(t, 1);
      });
  }
}
export {
  R as Fireworks,
  R as default
};
