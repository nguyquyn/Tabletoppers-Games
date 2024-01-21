// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// delete_customer.js

// called on button click, will pass customerID
function deleteCustomer(customerID) {
    let link = '/delete-customer-ajax/';
    let data = {
      customer_id: customerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customerID);
      }
    });
  }

  // call to lookup table row that matches customerID to delete
  function deleteRow(customerID){
      let table = document.getElementById("customer-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == customerID) {
              table.deleteRow(i);
              break;
         }
      }
      window.location.reload()
  }