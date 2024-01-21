// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// add_order_details.js

// Get the objects we need to modify
let addOrderDetailsForm = document.getElementById('add-order-details-form-ajax');

// Modify the objects we need
addOrderDetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("order_id");
    let inputBoardGameID = document.getElementById("board_game_id");
    let inputQuantityOrdered = document.getElementById("quantity_ordered");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let boardGameIDValue = inputBoardGameID.value;
    let quantityOrderedValue = inputQuantityOrdered.value;

    // Put our data we want to send in a javascript object
    let data = {
        order_id: orderIDValue,
        board_game_id: boardGameIDValue,
        quantity_ordered: quantityOrderedValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-details-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputBoardGameID.value = '';
            inputQuantityOrdered.value = '';
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
    let currentTable = document.getElementById("order-details-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let orderIDCell = document.createElement("TD");
    let boardGameIDCell = document.createElement("TD");
    let quantityOrderedCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    orderIDCell.innerText = newRow.order_id;
    boardGameIDCell.innerText = newRow.board_game_id;
    quantityOrderedCell.innerText = newRow.quantity_ordered;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrderDetails(newRow.order_id);
    };

    // Add the cells to the row 
    row.appendChild(orderIDCell);
    row.appendChild(boardGameIDCell);
    row.appendChild(quantityOrderedCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.order_id);

    // Add the row to the table
    currentTable.appendChild(row);
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("order_id");
    let option = document.createElement("option");
    option.text = newRow.order_id;
    option.value = newRow.order_id;
    selectMenu.add(option);


    window.location.reload()
}