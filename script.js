const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.getElementsByClassName('jsColor');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = '#2c2c2c';
ctx.lineWidth = 2.5;

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
}

function handleRangechange(event){
    const ranges = event.target.value;
    ctx.lineWidth = ranges;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerHTML = 'Fill';
    }else{
        filling = true;
        mode.innerHTML = 'Paint';
    }
}

if(canvas){
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener('click', changeColor));
if(range){
    range.addEventListener('input', handleRangechange);
}
if(mode){
    mode.addEventListener('click', handleModeClick);
}