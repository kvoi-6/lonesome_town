//get HTML elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 80;

ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.fillStyle = '#000';
ctx.clearRect(4, 4, canvas.width-8, canvas.height-8);
console.log('p')

let draw = false;
let mousePos = {x:0, y:0};
let hue = 0;
window.addEventListener('mousemove', (event) => {
    lastPos = {x:mousePos.x, y:mousePos.y};

    mousePos = {x:(event.clientX - canvas.offsetLeft),y:(event.clientY - canvas.offsetTop)};
    
    if (!draw) return

    distance = Math.sqrt(Math.pow(mousePos.x - lastPos.x, 2) + Math.pow(mousePos.y - lastPos.y, 2));
    if (distance)
        hue += distance / 2
     drawPoint()
    
});

window.addEventListener('mousedown', (event)=>{
   draw = true;
   drawPoint()
});

window.addEventListener('mouseup', (event)=>{
   draw = false;
});

function drawPoint() {
    ctx.fillStyle = `hsl(${ Math.floor(hue%360)} ${100}% ${50}%)`

    console.log(Math.floor(hue%360))
    ctx.fillRect(Math.round(mousePos.x), Math.round(mousePos.y), 4, 4);
}