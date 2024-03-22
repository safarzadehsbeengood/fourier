var cnv;
let time = 0;
let radius =50;
let wave = [];
let waveStart;
var radiusSlider;

function ptc(time, r){
  return createVector(r*cos(time), r*sin(time));
}

function setup() {
  cnv = createCanvas(windowWidth-100, windowHeight-100);
  cnv.position((windowWidth-width)/2, (windowHeight-height)/2);
  radiusSlider = createSlider(30, 200);
}

function draw() {
  radius = radiusSlider.value();
  background(200);
  translate(width/3, height/2);
  strokeWeight(3);
  noFill();
  circle(0, 0, radius*2);

  let pos = ptc(time, radius);
  wave.push(pos.y);
  fill(0);
  strokeWeight(1);
  circle(pos.x, pos.y, 6);
  strokeWeight(1);
  line(0, 0, pos.x, pos.y);
  time += 0.05;
 
  waveStart = radius+30;
  let offset = 0;
  noFill();
  strokeWeight(3)
  beginShape();
  for (let i = wave.length; i >= 0; i--) {
    vertex(waveStart-offset, wave[i]);
    offset-=0.8;
  }
  endShape();
  strokeWeight(2);
  line(pos.x, pos.y, waveStart, wave[wave.length-1]);
}
