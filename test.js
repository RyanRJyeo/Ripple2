//Title Button
var swoosh = function(){
    document.querySelector(".playTitle").classList.add("small");
    document.querySelector(".playPage").classList.remove("hidden");
}

//Info Buttons
var infoBoard = document.querySelector(".carousel-board");
var removeInfo = function(){
    document.querySelector(".infoBoard").removeChild(infoBoard);
}
removeInfo();
var getInfo = function(){
    document.querySelector(".infoBoard").appendChild(infoBoard);
}
var showInfo = function(){
    setTimeout(function(){infoBoard.style.opacity = '1';}, 800);
    getInfo();
    document.querySelector(".close-button").classList.remove("hidden");
    document.querySelector(".info").classList.add("hidden");
}
var closeInfo = function(){
    infoBoard.style.opacity = '0';
    setTimeout(function(){document.querySelector(".infoBoard").removeChild(infoBoard)}, 800);
    document.querySelector(".close-button").classList.add("hidden");
    document.querySelector(".info").classList.remove("hidden");
}
//Choosing the board color
var boardColor = "#EDEFEC";
var colorBoard = function(picker){
    boardColor = "#" + picker.toString();
    document.getElementById("playboard").style.backgroundColor = boardColor;
    console.log("i changed the board!");
}

//Choosing the pencil color
var colorPalete = "black";
var pencilColor = function(picker){
    colorPalete = "#" + picker.toString();
}

//Erase function
var erase = false;
var eraseNow = function() {
    if (erase == false){
        erase = true;
        document.getElementById("rubber").style.opacity = 1;
    } else if (erase == true){
        erase = false;
        document.getElementById("rubber").style.opacity = 0.3;
    }
}

//Reset Button
var reset = function(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//Start Button
var startGame = function(){
    //Display Game Board
    document.querySelector(".playArea").classList.remove("fade");
    //Display Utility Buttons
    document.querySelector(".reset").classList.remove("hidden");
    document.querySelector(".eraserPicker").classList.remove("hidden");
    document.querySelector(".colorPicker").classList.remove("hidden");
    document.querySelector(".boardPicker").classList.remove("hidden");
    document.querySelector(".duplicate").classList.remove("hidden");
    //Remove start button
    document.querySelector(".playButton").classList.add("hidden");
}

//Duplicate Button
var Duplicate = function(){
    //Stopping the draw function
    duplicate = true;
    //making original drawboard smaller
    document.getElementById("sketchpad").style.width = "50%";
    document.getElementById("sketchpad").style.height = "50%";
    //cloning Canvases
    function cloneCanvas(canvas) {
    var newCanvas = document.createElement('canvas');
    var newCanvas2 = document.createElement('canvas');
    var newCanvas3 = document.createElement('canvas');
    var context = newCanvas.getContext('2d');
    var context2 = newCanvas2.getContext('2d');
    var context3 = newCanvas3.getContext('2d');
    //set dimensions
    newCanvas.width = document.getElementById("sketchpad").width;
    newCanvas.height = document.getElementById("sketchpad").height;
    newCanvas.style.width = "100%";
    newCanvas2.width = document.getElementById("sketchpad").width;
    newCanvas2.height = document.getElementById("sketchpad").height;
    newCanvas2.style.width = "100%";
    newCanvas3.width = document.getElementById("sketchpad").width;
    newCanvas3.height = document.getElementById("sketchpad").height;
    newCanvas3.style.width = "100%";
    //apply the old canvas to the new one
    context.drawImage(document.getElementById("sketchpad"), 0, 0);
    context2.drawImage(document.getElementById("sketchpad"), 0, 0);
    context3.drawImage(document.getElementById("sketchpad"), 0, 0);
    //append new canvas
    document.querySelector(".sketchpad2").appendChild(newCanvas);
    document.querySelector(".sketchpad3").appendChild(newCanvas2);
    document.querySelector(".sketchpad4").appendChild(newCanvas3);
    }
    cloneCanvas();
    //displaying end game buttons
    document.querySelector(".printButton").classList.remove("hidden");
    document.querySelector(".reloadButton").classList.remove("hidden");
    //removing draw mode buttons & play button
    document.querySelector(".colorPicker").classList.add("hidden");
    document.querySelector(".eraserPicker").classList.add("hidden");
    document.querySelector(".boardPicker").classList.add("hidden");
    document.querySelector(".reset").classList.add("hidden");
    document.querySelector(".duplicate").classList.add("hidden");
    document.querySelector(".playButton").classList.add("hidden");
}


/////////////////////////////////////////////////
//Defining the canvas height and width
var canvas = document.getElementById('sketchpad');
var settingDimensions = function(){
    canvas.width = document.getElementById("playboard").offsetWidth - 10;
    canvas.height = document.getElementById("playboard").offsetWidth - 10;
}
settingDimensions();
window.onresize = settingDimensions();
var ctx = canvas.getContext('2d');
var duplicate = false;
function drawDot(ctx,x,y) {
    if (duplicate == true){
        return;
    } else if (erase == true){
        ctx.fillStyle = boardColor;
    } else if (erase == false){
        ctx.fillStyle = colorPalete;
    };
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

//Mouse draw function
var mouseX,mouseY,mouseDown=0;
function sketchpad_mouseDown() {
    mouseDown=1;
    drawDot(ctx,mouseX,mouseY);
    event.preventDefault();
}

function sketchpad_mouseUp() {
    mouseDown=0;
}

function sketchpad_mouseMove(e) {
    getMousePos(e);
    if (mouseDown==1) {
        drawDot(ctx,mouseX,mouseY);
    }
}
function getMousePos(e) {
    if (!e)
     var e = event;

    if (e.offsetX) {
        mouseX = e.offsetX;
        mouseY = e.offsetY;
    }
    else if (e.layerX) {
        mouseX = e.layerX;
        mouseY = e.layerY;
    }
}

//Touch draw function
var touchX,touchY;
function sketchpad_touchStart() {
    getTouchPos();
    drawDot(ctx,touchX,touchY,12);
    event.preventDefault();
}
function sketchpad_touchMove(e) {
    getTouchPos(e);
    drawDot(ctx,touchX,touchY,12);
    event.preventDefault();
}
function getTouchPos(e) {
    if (!e)
        var e = event;
    if (e.touches) {
        if (e.touches.length == 1) { // Only deal with one finger
            var touch = e.touches[0]; // Get the information for finger #1
            touchX=touch.pageX-touch.target.offsetLeft;
            touchY=touch.pageY-touch.target.offsetTop;
        }
    }
}
//Adding the required event listeners
canvas.addEventListener('mousedown', sketchpad_mouseDown, false);
canvas.addEventListener('mousemove', sketchpad_mouseMove, false);
window.addEventListener('mouseup', sketchpad_mouseUp, false);
canvas.addEventListener('touchstart', sketchpad_touchStart, false);
canvas.addEventListener('touchmove', sketchpad_touchMove, false);
/////////////////////////////////////////////////