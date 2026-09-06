//stupid

const MAX_SIZE = 600

let images = ['img/main-page-bg.png', 'img/game-page-bg.png', 'img/project-page-bg.png', 'img/omega-2-preview-0.png']

function load_image(path) {
    let myImage = new Image()
    myImage.src = path
    let aspect_ratio = myImage.width / myImage.height
    let wide = aspect_ratio >= 0

    let width = wide ? MAX_SIZE : MAX_SIZE * aspect_ratio
    let height = wide ? MAX_SIZE / aspect_ratio : MAX_SIZE



    let image = "<img src=\"" + path + "\" alt=\"button moment\" style=\"width:" + width + "px;height:" + height + "px;\"></img>"
    document.getElementById("gallery").insertAdjacentHTML('beforeend', image)
}

for (let i=0; i<images.length; i++) {
   load_image(images[i])
}
