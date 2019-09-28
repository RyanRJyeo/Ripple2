//Creating the pixel board
var generateBoard = function(){
        //creating the board and giving them a name
        for (var row = 1; row <= 100; row++){
            for (var col = 1; col <= 100; col++) {
                var unique_name = 'grid-'+row+'-'+col;
                var unique_id = row+''+col;
                var button = document.createElement("div");

                button.setAttribute("name", unique_name);
                button.setAttribute("class", 'pixels');
                button.addEventListener("mouseover", colorThis, true);
                document.querySelector('.playBoard').appendChild(button);
            }
        };
};



//Choosing the board color
var colorBoard = function(picker){
    document.querySelectorAll(".pixels").forEach(x=>{
        x.style.backgroundColor = "#" + picker.toString();
    })
    console.log("i changed the board!");
}
//Choosing the pencil color
var colorPalete = "white";
var pencilColor = function(picker){
    colorPalete = "#" + picker.toString();
}
var colorThis = function(event){
    event.target.style.backgroundColor = colorPalete;
    console.log("i entered!");
}
//Generating the board
generateBoard();


//Start Button
var start = function(){
    document.querySelector(".playBox").classList.remove("hidden");
    document.querySelector(".reset").classList.remove("hidden");
    document.querySelector(".duplicate").classList.remove("hidden");
    document.querySelector(".colorPicker").classList.remove("hidden");
    document.querySelector(".boardPicker").classList.remove("hidden");
    document.querySelector(".playButton").classList.add("hidden");
}
document.querySelector(".playButton").addEventListener("click", start);



//Reset Button
var boardColor = "black"
var reset = function(){
    var pixels = document.querySelectorAll(".pixels")
    pixels.forEach(x=>{
        x.style.backgroundColor = boardColor;
    })
};
document.querySelector(".reset").addEventListener("click", reset);



//Duplicate Button
var board;
var copyBoard = function(){
    //Left side copy
    board = document.querySelectorAll(".pixels");
    var boardCopy = document.querySelector(".boardCopy");
    for(i = 0; i < board.length; i++){
        var clone = board[i].cloneNode( true );
        clone.setAttribute("class", "pixels");
        if(board[i].classList[1] === "white-color"){
            clone.classList.add("white-color")
        }
        boardCopy.appendChild( clone );
    }
    //bottom copy
    var boardCopy2 = document.querySelector(".boardCopy2");
    for(i = 0; i < board.length; i++){
        var clone = board[i].cloneNode( true );
        clone.setAttribute("class", "pixels");
        if(board[i].classList[1] === "white-color"){
            clone.classList.add("white-color")
        }
        boardCopy2.appendChild( clone );
    }
    var boardCopy3 = document.querySelector(".boardCopy3");
    for(i = 0; i < board.length; i++){
        var clone = board[i].cloneNode( true );
        clone.setAttribute("class", "pixels");
        if(board[i].classList[1] === "white-color"){
            clone.classList.add("white-color")
        }
        boardCopy3.appendChild( clone );
    }
    //removing the mouseover event listener once the copy board function has been utilized
    var remove = document.querySelectorAll(".pixels")
    remove.forEach(x=>{
        x.removeEventListener("mouseover", colorThis, true);
    });
}

var duplicate = function(){
    document.querySelectorAll(".hidden").forEach(x=>{x.classList.remove("hidden");});
    document.getElementById('large').removeAttribute("id");
    document.querySelector(".printButton").classList.remove("hidden");
    document.querySelector(".reloadButton").classList.remove("hidden");
    document.querySelector(".colorPicker").classList.add("hidden");
    document.querySelector(".boardPicker").classList.add("hidden");
    document.querySelector(".playButton").classList.add("hidden");
    document.querySelector(".reset").classList.add("hidden");
    document.querySelector(".duplicate").classList.add("hidden");
}
document.querySelector(".duplicate").addEventListener("click", duplicate);
document.querySelector(".duplicate").addEventListener("click", copyBoard);