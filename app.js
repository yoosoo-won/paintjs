const canvasApp = document.getElementById('canvas-app');
const ctx = canvasApp.getContext('2d');
const colors = document.getElementsByClassName('color');
const range = document.getElementById('range');
const mode = document.getElementById('mode');
const saveBtn = document.getElementById('save');

let painting = false;
let filling = false;

const INIT_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvasApp.width = CANVAS_SIZE;
canvasApp.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INIT_COLOR;
ctx.fillStyle = INIT_COLOR;

// ctx.fillStyle = 'green';
// ctx.fillRect(50, 20, 100, 49);
// ctx.fillStyle = 'purple';
// ctx.fillRect(80, 100, 100, 49);

const stopPainting = () => {
  painting = false;
};

const startPainting = () => {
  painting = true;
};

const onMouseMove = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    console.log('1');
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    console.log('2');
    ctx.lineTo(x, y);
    ctx.stroke();
  }

};

const handleColorClick = (event) => {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
};

const handleCanvasClick = () => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};

const handleCM = (event) => {
  event.preventDefault();
};

if (canvasApp) {
  canvasApp.addEventListener('mousemove', onMouseMove);
  canvasApp.addEventListener('mousedown', startPainting);
  canvasApp.addEventListener('mouseup', stopPainting);
  canvasApp.addEventListener('mouseleave', stopPainting);
  canvasApp.addEventListener('click', handleCanvasClick);
  canvasApp.addEventListener('contextmenu', handleCM);
}

if (colors) {
  Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));
}

const handleRagneChange = (event) => {
  const size = event.target.value;
  ctx.lineWidth = size;
};

const handleModeClick = (event) => {
  if (filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = "Paint";
    // ctx.fillStyle = ctx.strokeStyle;
  }
};

const handleSave = () => {
  const image = canvasApp.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'PaintJS[EXPORT]';
  link.click();
};


if (range) {
  range.addEventListener('input', handleRagneChange)
}

if (mode) {
  mode.addEventListener('click', handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSave)
}