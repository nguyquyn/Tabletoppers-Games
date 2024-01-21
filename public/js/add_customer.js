// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// add_customer.js

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFirstName = document.getElementById("first_name");
    let inputLastName = document.getElementById("last_name");
    let inputEmail = document.getElementById("customer_email");
    let inputStreet = document.getElementById("street");
    let inputState = document.getElementById("state");
    let inputZipcode = document.getElementById("zipcode");


    // Get the values from the form fields
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let streetValue = inputStreet.value;
    let stateValue = inputState.value;
    let zipcodeValue = inputZipcode.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_first_name: firstNameValue,
        customer_last_name: lastNameValue,
        customer_email: emailValue,
        customer_street: streetValue,
        customer_state: stateValue, 
        customer_zipcode: zipcodeValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputStreet.value = '';
            inputState.value = '';
            inputZipcode.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    let row = document.createElement("TR");
    let customerIDCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let streetCell = document.createElement("TD");
    let stateCell = document.createElement("TD");
    let zipcodeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    customerIDCell.innerText = newRow.customer_id;
    firstNameCell.innerText = newRow.customer_first_name;
    lastNameCell.innerText = newRow.customer_last_name;
    emailCell.innerText = newRow.customer_email;
    streetCell.innerText = newRow.customer_street;
    stateCell.innerText = newRow.customer_state;
    zipcodeCell.innerText = newRow.customer_zipcode;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customer_id);
    };

    // Add the cells to the row 
    row.appendChild(customerIDCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(streetCell);
    row.appendChild(stateCell);
    row.appendChild(zipcodeCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customer_id);

    // Add the row to the table
    currentTable.appendChild(row);

    window.location.reload()
}