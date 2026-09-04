
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
//document.body.appendChild(newImg);
var imgData;

const image = document.getElementById('img');
//image.src = "image.png";
canvas.width = 500;
canvas.height = 500;

async function goop() {
  ctx.drawImage(image, 0, 0, image.width, image.height);

  imgData = ctx.getImageData(0, 0, image.width, image.height);
  console.log(imgData);
  for (let i=0; i<imgData.data.length; i+=4) {
    let arr = imgData.data;
    console.log("R: " + arr[i] + " G: " + arr[i+1] + " B: " + arr[i+2] + " A: " + arr[i+3]);
  }
}
image.addEventListener("load", () => {
  goop();
});

function getPixelArea() {
  
}