//When title is pressed
var titleButton = document.querySelector(".playTitle");
var swoosh = function(){
    titleButton.classList.add("small");
    document.querySelector(".playPage").classList.remove("hidden");
}
titleButton.addEventListener("click", swoosh);


//Creating the pixel board
var generateBoard = function(){
        //creating the board and giving them a name
        for (var row = 1; row <= 100; row++){
            for (var col = 1; col <= 100; col++) {
                var unique_name = 'grid-'+row+'-'+col;
                var unique_id = row+''+col;
                var button = document.createElement("div");

                button.setAttribute("name", unique_name);
                button.classList.add("pixels", "pixels1")
                button.addEventListener("mousedown", startDraw, true);
                button.addEventListener("mouseover", colorThis, true);
                button.addEventListener("mouseup", endDraw, true);
                button.addEventListener("touchstart", touchDraw, true);
                button.addEventListener("touchmove", touchColor, true);
                button.addEventListener("touchend", touchEnd, true);
                document.querySelector('.playBoard').appendChild(button);
            }
        };
};



//Choosing the board color
var boardColor = "black";
var colorBoard = function(picker){
    boardColor = "#" + picker.toString();
    document.querySelectorAll(".pixels").forEach(x=>{
        x.style.backgroundColor = boardColor;
    })
    console.log("i changed the board!");
}
//Eraser color
var erase = false;
var eraseNow = function(){
    var rubber = document.querySelector("#rubber");
    if(erase == false){
        erase = true;
        rubber.style.opacity = 1;
        var toErase = document.querySelectorAll(".pixels");
        toErase.forEach(x=>{
            x.removeEventListener("mousedown", startDraw, true);
            x.removeEventListener("mouseover", colorThis, true);
            x.removeEventListener("mouseup", endDraw, true);
            x.addEventListener("mouseover", erasing, true);
        })
    } else if (erase == true) {
        erase = false;
        rubber.style.opacity = 0.3;
        var toErase = document.querySelectorAll(".pixels");
        toErase.forEach(x=>{
            x.removeEventListener("mouseover", erasing, true);
            x.addEventListener("mousedown", startDraw, true);
            x.addEventListener("mouseover", colorThis, true);
            x.addEventListener("mouseup", endDraw, true);
        });
    }
}
var erasing = function(event){
        event.target.style.backgroundColor = boardColor;
        console.log("I'm erasing!");
}
//Choosing the pencil color
var draw = false
var colorPalete = "white";
var pencilColor = function(picker){
    colorPalete = "#" + picker.toString();
}
var startDraw = function(event){
    draw = true;
}
var colorThis = function(event){
    if (draw == true){
        event.target.style.backgroundColor = colorPalete;
        console.log("i entered!");
    } else {
        console.log("Please mouse down on the draw-board!")
    }
}
var endDraw = function(){
    draw = false;
}
var touchDraw = function(event){
    draw = true;
    event.preventDefault();
}
var path;
var touchColor = function(event){
    var touchPixels = document.querySelectorAll(".pixels");
    if (draw == true){
        event.target.style.backgroundColor = colorPalete;
        event.preventDefault();
        console.log("i touched!" + event.target);
    }
}
var touchEnd = function(){
    draw = false;
}
//Generating the board
generateBoard();


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


//Start Button
var start = function(){
    document.querySelector(".playBox").classList.remove("hidden");
    document.querySelector(".reset").classList.remove("hidden");
    document.querySelector(".duplicate").classList.remove("hidden");
    document.querySelector(".colorPicker").classList.remove("hidden");
    document.querySelector(".eraserPicker").classList.remove("hidden");
    document.querySelector(".boardPicker").classList.remove("hidden");
    document.querySelector(".playButton").classList.add("hidden");
}
document.querySelector(".playButton").addEventListener("click", start);



//Reset Button
var reset = function(){
    var pixels = document.querySelectorAll(".pixels")
    pixels.forEach(x=>{
        x.style.backgroundColor = boardColor;
    })
};
document.querySelector(".reset").addEventListener("click", reset);



//Duplicate Button
var copyBoard = function(){
    //Left side copy
    var board = document.querySelectorAll(".pixels");
    var boardCopy = document.querySelector(".boardCopy");
    for(i = 0; i < board.length; i++){
        var clone = board[i].cloneNode( true );
        clone.classList.add("pixels", "pixel2")
        // if(board[i].classList[1] === "white-color"){
        //     clone.classList.add("white-color")
        // }
        boardCopy.appendChild( clone );
    }
    //bottom copy
    var boardCopy2 = document.querySelector(".boardCopy2");
    for(i = 0; i < board.length; i++){
        var clone = board[i].cloneNode( true );
        clone.classList.add("pixels", "pixel3")
        // if(board[i].classList[1] === "white-color"){
        //     clone.classList.add("white-color")
        // }
        boardCopy2.appendChild( clone );
    }
    var boardCopy3 = document.querySelector(".boardCopy3");
    for(i = 0; i < board.length; i++){
        var clone = board[i].cloneNode( true );
        clone.classList.add("pixels", "pixel4")
        // if(board[i].classList[1] === "white-color"){
        //     clone.classList.add("white-color")
        // }
        boardCopy3.appendChild( clone );
    }
    //removing the mouseover event listener once the copy board function has been utilized
    var remove = document.querySelectorAll(".pixels")
    remove.forEach(x=>{
        x.removeEventListener("mouseover", colorThis, true);
        x.removeEventListener("touchmove", colorThis, true);
    });
}

var duplicate = function(){
    document.getElementById('large').removeAttribute("id");
    document.querySelector(".boardCopy").classList.remove("hidden");
    document.querySelector(".boardCopy2").classList.remove("hidden");
    document.querySelector(".boardCopy3").classList.remove("hidden");
    document.querySelector(".printButton").classList.remove("hidden");
    document.querySelector(".reloadButton").classList.remove("hidden");
    document.querySelector(".colorPicker").classList.add("hidden");
    document.querySelector(".eraserPicker").classList.add("hidden");
    document.querySelector(".boardPicker").classList.add("hidden");
    document.querySelector(".playButton").classList.add("hidden");
    document.querySelector(".reset").classList.add("hidden");
    document.querySelector(".duplicate").classList.add("hidden");
}
document.querySelector(".duplicate").addEventListener("click", duplicate);
document.querySelector(".duplicate").addEventListener("click", copyBoard);

// //Replay Button
// var replay = function(){
//     //removing pixels from the drawboard and the duplicate boards too
//     var removingPixels1 = document.querySelectorAll(".pixels1");
//     for (i = 0; i < removingPixels1.length; i++){
//         document.querySelector(".playBoard").removeChild(removingPixels1[i]);
//     }
//     var removingPixels2 = document.querySelectorAll(".pixels2");
//     for (i = 0; i < removingPixels2.length; i++){
//         document.querySelector(".boardCopy").removeChild(removingPixels2[i]);
//     }
//     var removingPixels3 = document.querySelectorAll(".pixels3");
//     for (i = 0; i < removingPixels3.length; i++){
//         document.querySelector(".boardCopy2").removeChild(removingPixels3[i]);
//     }
//     var removingPixels4 = document.querySelectorAll(".pixels4");
//     for (i = 0; i < removingPixels4.length; i++){
//         document.querySelector(".boardCopy3").removeChild(removingPixels4[i]);
//     }
//     //removing the duplicate boards
//     document.querySelector(".boardCopy").classList.add("hidden");
//     document.querySelector(".boardCopy2").classList.add("hidden");
//     document.querySelector(".boardCopy3").classList.add("hidden");
//     //removing the end game buttons
//     document.querySelector(".printButton").classList.add("hidden");
//     document.querySelector(".reloadButton").classList.add("hidden");
//     document.querySelector(".playButton").classList.add("hidden");
//     //adding back the playing mode buttons
//     document.querySelector(".colorPicker").classList.remove("hidden");
//     document.querySelector(".eraserPicker").classList.remove("hidden");
//     document.querySelector(".boardPicker").classList.remove("hidden");
//     document.querySelector(".reset").classList.remove("hidden");
//     document.querySelector(".duplicate").classList.remove("hidden");
//     //making the OG drawboard larger
//     document.querySelector(".playBoard").setAttribute("id", "large");
//     //generating back the OG pixels
//     generateBoard();
// }