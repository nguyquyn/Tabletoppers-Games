// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// add_warehouse.js

// Get the objects we need to modify
let addWarehouseForm = document.getElementById('add-warehouse-form-ajax');

// Modify the objects we need
addWarehouseForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputWarehouseLocation = document.getElementById("input_warehouse_location");
    let inputBoardGameID = document.getElementById("board_game_id");
    let inputQuantityStock = document.getElementById("quantity_stock");

    // Get the values from the form fields
    let warehouseLocationValue = inputWarehouseLocation.value;
    let boardGameIDValue = inputBoardGameID.value;
    let quantityStockValue = inputQuantityStock.value;

    // Put our data we want to send in a javascript object
    let data = {
        warehouse_location: warehouseLocationValue,
        board_game_id: boardGameIDValue,
        quantity_stock: quantityStockValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-warehouse-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputWarehouseLocation.value = '';
            inputBoardGameID.value = '';
            inputQuantityStock.value = '';
        
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
    let currentTable = document.getElementById("warehouse-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let warehouseLocationCell = document.createElement("TD");
    let boardGameIDCell = document.createElement("TD");
    let quantityStockCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.warehouse_id;
    warehouseLocationCell.innerText = newRow.warehouse_location;
    boardGameIDCell.innerText = newRow.board_game_id;
    quantityStockCell.innerText = newRow.quantity_stock;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.warehouse_id);
    };
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(warehouseLocationCell);
    row.appendChild(boardGameIDCell);
    row.appendChild(quantityStockCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.warehouse_id);
    
    // Add the row to the table
    currentTable.appendChild(row);

    window.location.reload()
}