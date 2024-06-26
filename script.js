var cnv;
let time = 0;
let wave = [];
let waveStart;
var radiusSlider, nSlider, timeSlider;
let p = 1;
let n;

function setup() {
  cnv = createCanvas(windowWidth-100, windowHeight-100);
  cnv.position((windowWidth-width)/2, (windowHeight-height)/2);
  radiusSlider = createSlider(30, 100, 60, 1);
  nSlider = createSlider(1, 13, 3, 1);
  timeSlider = createSlider(0.001, 0.15, 0.02, 0.001);
}

function draw() {
  p = 1;
  n = nSlider.value();
  stroke(0);
  background(color(200, 255, 200));
  translate(width/4, height/2);
  strokeWeight(4);
  point(0, 0);
  let pos = createVector();
  let radius;
  for (let i = 0; i < n; i++) {
    let prevPos = createVector(pos.x, pos.y);
    noFill();
    strokeWeight(2);
    radius = radiusSlider.value() * (4/(p*PI));
    circle(pos.x, pos.y, radius*2);
    pos.add(createVector(radius * cos(p*time), radius * sin(p*time)));
    if (i > 0) {
      stroke(0);
      strokeWeight(2);
      line(prevPos.x, prevPos.y, pos.x, pos.y);
    }
    if (i == n-1) {
      wave.push(pos.y);
    }
    p += 2;
    fill(0);
    strokeWeight(1);
    circle(pos.x, pos.y, 6);
  }

  time += timeSlider.value();
 
  waveStart = (width+radiusSlider.value())/4;
  let offset = 0;
  noFill();
  strokeWeight(2)
  beginShape();
  for (let i = wave.length; i >= 0; i--) {
    vertex(waveStart-offset, wave[i]);
    offset-=0.8;
  }
  endShape();
  if (wave.length > 800) {
    wave.splice(0, 1);
  }
  strokeWeight(2);
  line(pos.x, pos.y, waveStart, wave[wave.length-1]);
  strokeWeight(6);
  point(waveStart, wave[wave.length-1]);
  strokeWeight(3);
  rect(-width/4, -height/2, width, height);
  noStroke();
  fill(0);
  textSize(16);
  // translate(-width/3, -height/2);
  text(`R: ${radiusSlider.value()}`, -30, 180);
  text(`N: ${nSlider.value()}`, -30, 210);
  text(`Speed: ${(timeSlider.value()*10).toFixed(3)}`, -30, 240);
}

window.onresize = () => {
  resizeCanvas(windowWidth-100, windowHeight-100);
  cnv.position((windowWidth-width)/2, (windowHeight-height)/2);
}
