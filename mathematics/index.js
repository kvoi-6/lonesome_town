const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = window.innerWidth - 5;
canvas.height = window.innerHeight - 5;

setInterval(update, 25);


var ticksPassed = 0

var messages = [
    "No return",
    "Say hi to the whales",
    "y = mx+b. Remember that now.",
    "help im trapped in a web page",
    "How many toes DO sharks have?",
    "Gorganzola Mozzarella",
    "Goodbye",
    "Cows with Nouns are the only means to survival",
    "https://www.youtube.com/@deceasedlettuce",
    ".;,;.",
    "Jacob Horse is here!",
    "Asymmetrical Maths is the way to the future",
    "Okay?"
]

async function generate(pointCount) {
    //Get initial points
    var points = []

    for (let i=0; i<pointCount; i++) {
        points.push({
            x: Math.floor((Math.random() * 0.8 + 0.1) * canvas.width),
            y: Math.floor((Math.random() * 0.8 + 0.1) *canvas.height)
        })

    }

    for (let i=0; i<points.length; i++) {
        c.fillStyle = "black"
        c.fillRect(points[i].x-1, points[i].y-1,3,3)
    }

    //Get mean point
    var meanPoint = {x:0, y:0}

    for (let i=0; i<points.length; i++) {
        meanPoint.x += points[i].x;
        meanPoint.y += points[i].y;
    }
    meanPoint.x /= pointCount
    meanPoint.y /= pointCount

    c.fillStyle = "red"
    c.fillRect(meanPoint.x-1, meanPoint.y-1,3,3)

    //Get angles
    for (let i=0; i<points.length; i++) {
        let p = points[i]
        p.angle = Math.atan((p.y - meanPoint.y) / (p.x - meanPoint.x))
        if (p.x > meanPoint.x) {
            p.angle += Math.PI
        }
        c.font = '10pt arial'
        c.fillText(p.angle, p.x+5,p.y+5)
    }

    if (Math.random() < 0.3) {
        c.font = '40pt impact'
        c.fillText(messages[Math.floor(Math.random() * messages.length)], Math.random() * canvas.width, Math.random() * canvas.height)
    }

    //World's laziest sorting algorithm
    for (let i=0; i<points.length; i++) {
        for (let j=i+1; j<points.length; j++) {
            if (points[i].angle < points[j].angle) {
                let temp = points[i]
                points[i] = points[j]
                points[j] = temp
            }
        }
    }

    //Draw line
    c.fillStyle = 'black'
    //c.moveTo(points[points.length-1].x, points[points.length-1].y)
    c.beginPath()
    for (let i=0; i<points.length; i++) {
        c.lineTo(points[i].x, points[i].y)
    }
    c.lineTo(points[0].x, points[0].y)
    c.stroke()
}

function update(){
    c.globalAlpha = 0.06
    c.fillStyle = 'white'
    c.fillRect(0,0, canvas.width, canvas.height)
    c.globalAlpha = 1

    if (ticksPassed % 16 == 0) {
        generate(1 + ticksPassed / 16)
        let audio = new Audio('boom.mp3');
        audio.volume = 1 - 1 / (ticksPassed/2000.0 + 1)
        audio.play();
    }

    ticksPassed ++
}