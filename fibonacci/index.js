const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


let canvasSize = Math.min(window.innerWidth, window.innerHeight-60) - 5;
canvas.width = canvasSize;
canvas.height = canvasSize;



setInterval(update, 20);
const RENDER_STYLE = {
    ORIGINAL : 0,
    ONE_STEP: 1
}
var base = 10;
var chartSize = 400;

var mousePos = {x:0, y:0};

//returns the scale of a single square on the chart
function getDrawScale() {
    return canvasSize / base;
}
//updates data related to the base slider
function fromBaseSlider(target) {
    let value = target.valueAsNumber;
    document.getElementById("base_label").innerHTML = "Base " + value;
    base = value;
}
//listen for change in slider
//update base to match slider
window.addEventListener('input', (event) => {
    let target = event.target;
    fromBaseSlider(target);
});
fromBaseSlider(document.getElementById("base_slider"));


window.addEventListener('mousemove', (event) => {
    mousePos = {x:(event.clientX - canvas.offsetLeft),y:(event.clientY - canvas.offsetTop)};
 });

window.addEventListener('resize', (event) => {
    canvasSize = Math.min(window.innerWidth, window.innerHeight-100) - 5;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
 });

var counter = 0;

function update(){
    c.fillStyle = '#976f6f'
    c.fillRect(0, 0, canvas.width, canvas.height);
    renderTable(0, 0, RENDER_STYLE.ORIGINAL);
    //renderTable(100 + base * getDrawScale(), 50, RENDER_STYLE.ONE_STEP);
    counter += 0.02;
}

function renderTable(x, y, style) {
    var mouseTransPos = {
        x: (mousePos.x - x) / getDrawScale(),
        y: (mousePos.y - y) / getDrawScale(),

    }

    for (let ix=0; ix<base; ix++) {
        for (let iy=0; iy<base; iy++) {
            var r, g, b;
            switch (style) {
                case RENDER_STYLE.ORIGINAL:
                    r = ix / (base-1);
                    g = iy / (base-1);
                    b = 0;
                    break;
                //I DONT KNOW WHAT THIS IS?
                case RENDER_STYLE.ONE_STEP:
                    r = iy / base;
                    g = ((ix + iy) % base) / base;
                    b = 0;
                    break;
            }

            

            c.fillStyle = `rgb(${Math.round(r*255)} ${Math.round(g*255)} ${Math.round(b*255)})`
 
            c.fillRect(ix * getDrawScale() + x, iy * getDrawScale() + y, getDrawScale()+1, getDrawScale()+1)

            
           
        }
    }

    for (let ix=0; ix<base; ix++) {
        for (let iy=0; iy<base; iy++) {
            if (
                mouseTransPos.x > ix && mouseTransPos.x <= ix + 1 &&
                mouseTransPos.y > iy && mouseTransPos.y <= iy + 1
            ) {
                connectTiles(x, y, ix, iy);
            }
        }
    }


}

function connectTiles(x, y, ix, iy, seen = []) {

    c.beginPath();
    connect:while (true) {
        //check if value seen before
        //stop connecting if seen before
        for (let i=0; i<seen.length; i++) {
            let s = seen[i];
            if (ix == s.x && iy == s.y) {
                break connect;
            }
        }
        seen.push({x: ix, y: iy});
        if (seen.length == 1) {
            c.strokeStyle = 'white';
            c.lineWidth = 5;
            c.lineCap = 'round'
        }
        c.moveTo(x + (ix + 0.5) * getDrawScale(), y + (iy + 0.5) * getDrawScale());
        c.lineTo(x + (iy + 0.5) * getDrawScale(), y + ((ix + iy) % base + 0.5) * getDrawScale());

        
        let new_ix = iy;
        iy = (ix + iy) % base;
        ix = new_ix;
    }
    c.stroke();

    let index = counter % seen.length;
    let progress = index % 1;
    progress = Math.sin(Math.PI * (progress-0.5)) * 0.5 + 0.5

    for (let index = 0; index < seen.length; index++) {
        index = Math.floor(index)
        let pos1 = {x:x + (seen[index].x + 0.5) * getDrawScale(),y: y + (seen[index].y + 0.5) * getDrawScale()};
        let index2 = (index + 1) % seen.length;
        let pos2 = {x:x + (seen[index2].x + 0.5) * getDrawScale(),y: y + (seen[index2].y + 0.5) * getDrawScale()};
        let circleX = pos1.x * (1-progress) + pos2.x * progress;
        let circleY = pos1.y * (1-progress) + pos2.y * progress;

        c.fillStyle = '#000'
        c.beginPath();
        c.arc(circleX, circleY, getDrawScale()*0.1 + 5, 0, 2*Math.PI);
        c.fill();
        c.strokeStyle = '#fff'
        c.beginPath();
        c.arc(circleX, circleY, getDrawScale()*0.1 + 5, 0, 2*Math.PI);
        c.stroke();
    }
    
    
}