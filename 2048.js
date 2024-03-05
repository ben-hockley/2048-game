var board;
var score;
var rows = 4;
var columns = 4;

window.onload = function(){
    setGame();
}

function setGame(){
    board = [
        [0,0,0,0], /* 2D array represents 4x4 grid. */
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
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
    //create two 2 tiles to start the game:
    setTwo();
    setTwo();
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

//controls

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft"){
        slideLeft(); //slide tiles left
        setTwo(); //add a two tile (random)
    }
    else if(e.code == "ArrowRight"){
        slideRight();
        setTwo();
    }
    else if (e.code == "ArrowUp"){
        slideUp();
        setTwo();
    }
    else if (e.code == "ArrowDown"){
        slideDown();
        setTwo();
    }
    document.getElementById("score").innerText = score;
})

function filterZero(row){ //used in slide function (below)
    return row.filter(num => num!= 0) //remove all zeroes from array
}

function slide(row){ //used in all slide____ functions (below)
    row = filterZero(row);

    //slide
    for (let i=0;i<row.length-1;i++){
        //check every 2
        if (row[i] == row[i+1]){ //merge tiles
            row[i] *= 2;
            row[i+1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row);
    //add zeroes
    while (row.length < columns){
        row.push(0);
    }
    return row;
}

function slideLeft(){ //shifts all tiles to the left.
    for (let r=0;r<rows;r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c=0;c<columns;c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }   
}
function slideRight(){ //shifts all tiles to the left.
    for (let r=0;r<rows;r++){
        let row = board[r];
        row.reverse();
        row = slide(row)
        board[r] = row;
        board[r] = row.reverse();
        for (let c=0;c<columns;c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }   
}
function slideUp(){ //shifts all tiles to the left.
    for (let c=0;c<columns;c++){
        let row = board[board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);
        for (let r=0;r<rows;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }   
}
function slideDown(){ //shifts all tiles to the left.
    for (let c=0;c<columns;c++){
        let row = board[board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r=0;r<rows;r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }   
}
function setTwo(){
    if (!hasEmptyTile()){
        return;
    }
    let found = false;
    while (!found){
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0){
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("t2");
            found = true;
        }
    }
}
function hasEmptyTile(){
    let count = 0;
    for (let r=0;r<rows;r++){
        for (let c=0;c<columns;c++){
            if (board[r][c] == 0){
                return true;
            }
        }
    }
    return false;
}