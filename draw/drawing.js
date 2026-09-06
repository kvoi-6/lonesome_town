const LEFT_CLICK = 0;
const RIGHT_CLICK = 2;
const MIDDLE_CLICK = 1;
const LAYER = {BACKGROUND:0, DRAWING:1, ACTIVE_TOOL:2};

//get HTML elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const toolbar = document.getElementById("toolbar");

let documentSize = {x:1920,y:1080};
let mousePos = {x:0, y:0};

//set canvas display size
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
function updateCanvasSize() {
    //get new size
    canvasWidth = window.innerWidth - toolbar.clientWidth-20;
    canvasHeight = window.innerHeight - canvas.offsetTop-20;

    //update canvas size
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.imageSmoothingEnabled = false;

    //draw base color
    ctx.fillStyle = 'rgb(57, 52, 66)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    let ratio = {x: documentSize.x / canvasWidth, y: documentSize.y / canvasHeight};

    drawScale = 1 / Math.max(ratio.x, ratio.y) - (0.01);
    
    drawOffset.x = (canvasWidth - documentSize.x*drawScale)/2;
    drawOffset.y = (canvasHeight - documentSize.y*drawScale)/2;
    
}

//layers
let layers = []; //array of all layers
let drawScale = 0.5; //scale to draw layers at
let drawOffset = {x:0, y:0};
class Layer {
    canvas;
    width;
    height;
    ctx;

    //sets up layer from specified size
    constructor(width=documentSize.x, height=documentSize.y) {
        this.canvas = document.createElement('canvas');
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled= false
    }

    //fills entire layer with color
    fill(color='#FFF') {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0,0,this.width,this.height);
        return this;
    }

    //clears entire layer
    clear() {
        this.ctx.clearRect(0,0,this.width,this.height);
    }

    //adds layer to layers[] array
    add() {
        layers.push(this);
    }

    //draws the layer on the main canvas
    draw() {
        let drawWidth = this.width * drawScale;
        let drawHeight = this.height * drawScale;

        ctx.drawImage(this.canvas, drawOffset.x, drawOffset.y, drawWidth, drawHeight);

    }
}

//draws all layers
function drawLayers() {
    for (let i=0; i<layers.length; i++) {
        layers[i].draw();
    }
}


//listen for mouse movements
window.addEventListener('mousemove', (event) => {
    mousePos = {x:(event.clientX - canvas.offsetLeft),y:(event.clientY - canvas.offsetTop)};
    mousePos.x -= drawOffset.x;
    mousePos.x /= drawScale;
    mousePos.y -= drawOffset.y;
    mousePos.y /= drawScale;
    
    let ctx = layers[LAYER.DRAWING].ctx;
    ctx.fillStyle = '#666';
    ctx.fillRect(Math.round(mousePos.x), Math.round(mousePos.y), 8, 8);
    drawLayers();
});

//listen for window resize
window.addEventListener('resize', (event) => {
    updateCanvasSize();
    drawLayers();
 });


function selectTool(tool) {

}

//initializing stuff
//set initial canvas size
updateCanvasSize();
//add background layer
new Layer().fill().add()
//add drawing layer
new Layer().add()
//add tool layer
new Layer().add()

layers[1].ctx.fillStyle = 'red';
layers[1].ctx.fillRect(100, 100, 200, 400);


drawLayers()

