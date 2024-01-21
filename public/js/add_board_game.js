// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// add_board_game.js

// Get the objects we need to modify
let addBoardGameForm = document.getElementById('add-board-game-form-ajax');

// Modify the objects we need
addBoardGameForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("name");
    let inputPrice = document.getElementById("price");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        board_game_name: nameValue,
        board_game_price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-board-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("board-game-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let priceCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.board_game_id;
    nameCell.innerText = newRow.board_game_name;
    priceCell.innerText = newRow.board_game_price;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteBoardGame(newRow.board_game_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.board_game_id);

    // Add the row to the table
    currentTable.appendChild(row);

    let selectMenu = document.getElementById("board_game_name");
    let option = document.createElement("option");
    option.text = newRow.board_game_name;
    option.value = newRow.board_game_id;
    selectMenu.add(option);

    window.location.reload()
}

