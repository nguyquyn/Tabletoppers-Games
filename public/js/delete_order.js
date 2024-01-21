// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// delete_order.js

// called on button click, will pass orderID
function deleteOrder(orderID) {
    let link = '/delete-order-ajax/';
    let data = {
      order_id: orderID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(orderID);
      }
    });
  }
  
  function deleteRow(orderID){
      let table = document.getElementById("order-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == orderID) {
              table.deleteRow(i);
              break;
         }
      }
      window.location.reload()
  }