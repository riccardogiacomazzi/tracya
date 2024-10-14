export default function sketchPath(p) {
  let seed = Math.random() * 1247;
  let clicks = 1;
  var mySize, grad;

  // colors
  let colors2 = "897286-c15774-6483a9-485c89-cebca2".split("-").map((a) => "#" + a);
  let colorBg = "7b8ba3-7cb6df-c4cbda-c4cbda-517bba".split("-").map((a) => "#" + a);
  let colorselet = [];

  let unit_x, unit_y;
  let multiplier = Math.random() * 555;
  let count;
  let mods = [];

  p.setup = function () {
    p.randomSeed(seed);
    mySize = p.min(p.windowWidth, p.windowHeight);
    p.createCanvas(p.windowWidth, p.windowHeight);
    colorselet[0] = p.random(colors2);
    colorselet[1] = p.random(colors2);
    colorselet[2] = p.random(colors2);
    colorselet[3] = p.random(colorBg);
    colorselet[4] = p.random(colorBg);
    unit_x = p.windowWidth;
    unit_y = p.windowHeight;

    p.noStroke();
    let wideCount = p.width / unit_x;
    let highCount = p.height / unit_y;
    count = wideCount * highCount;

    let index = 0;

    for (let y = 0; y < highCount; y++) {
      for (let x = 0; x < wideCount; x++) {
        mods[index++] = new Module(x * unit_x, y * unit_y, 0, 0, p.random(0.1, 0.25), unit_x);
      }
    }

    p.background(p.random(colorBg));
  };

  p.draw = function () {
    for (let i = 0; i < count; i++) {
      p.randomSeed(seed);
      mods[i].update();
      mods[i].draw();
    }
  };

  class Module {
    constructor(xOff, yOff, x, y, speed, unit) {
      this.xOff = xOff;
      this.yOff = yOff;
      this.x = p.sin(x);
      this.y = p.sin(y);
      this.speed = speed * 5;
      this.unit = unit;
      this.xDir = 1;
      this.yDir = 1;
    }

    update() {
      this.x = this.x + this.speed * this.xDir;
      this.y = this.y + this.speed * this.yDir;

      if (this.x >= this.unit || this.x <= 0) {
        this.xDir *= -1;
        this.x = this.x + 1 * this.xDir;
        this.y = this.y + 1 * this.yDir;
      }
      if (this.y >= this.unit || this.y <= 0) {
        this.yDir *= -1;
        this.y = this.y + 1 * this.yDir;
      }
    }

    draw() {
      p.stroke(p.str(p.random(colorselet)) + "1a");
      p.strokeWeight(2 * p.random(p.random(0.5, 1)));
      p.fill(p.str(p.random(colorselet)) + "80");

      p.drawingContext.shadowColor = p.random(colors2);
      p.drawingContext.shadowOffsetX = -1;
      p.drawingContext.shadowOffsetY = -1;
      p.drawingContext.shadowBlur = 0;
      p.drawingContext.shadowColor = p.random(colors2);
      p.drawingContext.shadowOffsetX = 1;
      p.drawingContext.shadowOffsetY = 1;
      p.drawingContext.shadowBlur = 0;
      let y_size = this.unit * p.noise(p.random(), p.frameCount / 10);

      p.push();
      p.translate(this.xOff + this.x, this.yOff + this.y);

      grad = p.drawingContext.createLinearGradient(0, 0, y_size, y_size);
      grad.addColorStop(0, p.random(colorselet));
      grad.addColorStop(1, p.str(p.random(colorselet)));
      p.drawingContext.fillStyle = grad;

      p.ellipse(0, 0, y_size / 3, 5, y_size * 0.5);

      p.pop();
    }
  }
}
