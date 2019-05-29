const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "";
const CANVAS_SIZE = 700;

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

context.fillStyle = "white";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

context.strokeStyle = INITIAL_COLOR;
context.lineWidth = 2.5;

context.fillStyle = INITIAL_COLOR;
// context.fillRect(50, 20, 100, 49);

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
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  context.strokeStyle = color;
  context.fillStyle = color;
}

function handleRangeChgange(event) {
  const strokeSize = event.target.value;
  context.lineWidth = strokeSize;
}

function handleMode() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleContextMenu(event) {
  event.preventDefault();
}

function saveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
}

function init() {
  if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", paintingStop);
    canvas.addEventListener("mouseleave", paintingStop);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
  }

  Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
  );

  if (range) {
    range.addEventListener("input", handleRangeChgange);
  }

  if (mode) {
    mode.addEventListener("click", handleMode);
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", saveClick);
  }
}

init();
