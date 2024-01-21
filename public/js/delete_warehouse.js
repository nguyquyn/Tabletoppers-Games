// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// delete_warehouse.js

// called on button click, will pass warehouseID
function deleteWarehouse(warehouseID) {
    let link = '/delete-warehouse-ajax/';
    let data = {
      warehouse_id: warehouseID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(warehouseID);
      }
    });
  }

  // call to lookup table row that matches warehouseID to delete
  function deleteRow(warehouseID){
      let table = document.getElementById("warehouse-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == warehouseID) {
              table.deleteRow(i);
              break;
         }
      }
    
    window.location.reload()
  }