var board;
var score;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0,4,0,0], /* 2D array represents 4x4 grid. */
        [0,0,8,0],
        [0,0,0,16],
        [0,0,32,0]
    ]

    // iterate through rows
    for (let r=0;r<rows;r++){
        // iterate through columns
        for (let c=0;c<columns;c++){
            //example: <div id="0-0"></div> (create a div for each spot on grid)
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            let num = board[r][c];
            updateTile(tile, num); //add new div to board.
            document.getElementById("board").append(tile);
        }
    }
}

function updateTile(tile, num){
    tile.innerText = "";
    tile.classList.value = ""; //clear the classlist
    tile.classList.add("tile");
    if (num>0){
        tile.innerText = num;
        if (num <= 4096){
            tile.classList.add("t"+num.toString());
        } else {
            tile.classList.add("t8192") //numbers can go higher but from here on colours are same.
        }
    }
}