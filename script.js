const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR
ctx.lineWidth = 2.5;

ctx.fillStyle = '#ffffff'
ctx.fillRect(0, 0, 700, 700);

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!paiting){
        ctx.beginPath(); //path를 만듦
        ctx.moveTo(x, y); //시작 위치
    }else{
        ctx.lineTo(x, y); //끝나는 위치
        ctx.stroke(); //획을 긋는다
    }
}
let paiting = false;
let filling = false;

function stopPainting(event){
    paiting = false;
} 

function startPainting(enent){
    paiting = true;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangechange(event){
    const ranges = event.target.value;
    ctx.lineWidth = ranges;
}

function handleModeClick(event){
    const fills = event.target.style.backgroundColor;
    if(filling === true){
        filling = false;
        mode.innerHTML = 'Fill';
    }else{
        filling = true;
        mode.innerHTML = 'Paint';
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    console.log(event);
    //event.preventDefault(); //우클릭 작동x
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = 'PaintJS';
    link.click();
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM); //contextmenu -> 우클릭 했을 때  나오는 메뉴 조작
}

Array.from(colors).forEach(color => color.addEventListener('click', changeColor));
if(range){
    range.addEventListener('input', handleRangechange);
}
if(mode){
    mode.addEventListener('click', handleModeClick);
}
if(saveBtn){
    saveBtn.addEventListener('click', handleSaveClick);
}