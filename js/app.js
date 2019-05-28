const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");

canvas.width = 700;
canvas.height = 700;

context.strokeStyle = "#2c2c2";
context.lineWidth = 2.5;

let painting = false;

function paintingStop() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    context.beginPath();
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
    context.closePath();
  }
}

function onMouseDown(evnet) {
  painting = true;
}

function onMouseUp(event) {}

function init() {
  if (canvas) {
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", paintingStop);
    canvas.addEventListener("mouseleave", paintingStop);
  }
}

init();
