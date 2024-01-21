// CS 340 Project
// Group #97: Hayden Burgess, Quynh Nguyen
// Project Title: Tabletoppers Games
// Citation: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// delete_board_game.js

// called on button click, will pass boardGameID
function deleteBoardGame(boardGameID) {
  let link = '/delete-board-game-ajax/';
  let data = {
    board_game_id: boardGameID
  };

  $.ajax({
    url: link,
    type: 'DELETE',
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    success: function(result) {
      deleteRow(boardGameID);
    }
  });
}

function deleteRow(boardGameID){
    let table = document.getElementById("board-game-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       if (table.rows[i].getAttribute("data-value") == boardGameID) {
            table.deleteRow(i);
            break;
       }
    }
    window.location.reload()
}