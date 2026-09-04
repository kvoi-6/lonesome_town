
var buttonness = 0;

function buttonButton() {
    buttonness ++;
    let imageScale = 75 + Math.floor(50 * Math.random());
    let image = "<a href = \"stupid/index.html\">" +
    "<img src=\"img/trixie_icon.png\" alt=\"button moment\" style=\"width:" + imageScale + "px;height:" + imageScale + "px;\"></img>"
    + "</a>";
    let text = "<h1>" + buttonness + "<h1>";
    document.getElementById("button_button").innerHTML = (Math.random() < 0.5) ?
        text + image : image + text;
    
    
}
