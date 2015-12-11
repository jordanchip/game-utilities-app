var $ = require("jquery");

// API object
var api = {
  // get the list of items, call the callback when complete

  post: function(title, text, index) {
    var url = "/api/ideas";
    $.ajax({
      url: url,
      dataType: 'json',
      type: 'GET',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {

        if (cb)
          cb(false, status);
      }
    });
  },

  getIdeas: function(cb) {
    var url = "/api/ideas";
    $.ajax({
      url: url,
      type: 'GET',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        if (cb)
          cb(false, status);
      }
    });
  },
  // add an item, call the callback when complete
  addIdea: function(title, text, index, cb) {
    var url = "/api/ideas";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        idea: {
          'title': title,
          'text': text,
          'index': index
        }
      }),
      type: 'POST',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        if (cb)
          cb(false, status);
      }
    });

  },

        // delete an item, call the callback when complete
  deleteIdea: function(idea, cb) {
    var url = "/api/ideas/" + idea.id;
    $.ajax({
      url: url,
      type: 'DELETE',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove any login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },
  // update an item, call the callback when complete
  updateItem: function(item, cb) {
    var url = "/api/items/" + item.id;
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        item: {
          title: item.title,
          completed: item.completed
        }
      }),
      type: 'PUT',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is any error, remove any login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    });
  },


  addTournament: function(title1, data, cb) {
    var url = "/api/tournaments";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify(data),
      type: 'POST',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    })
  },

  getTournamentForUser: function(cb) {
    var url = "/api/tournaments";
    $.ajax({
      url: url,
      type: 'GET',
      headers: {'Authorization': localStorage.token},
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    })
  },

  addPlayer: function(data, cb){
    console.log('name is');
    console.log(data);
    var url = "/api/scoreboard";
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        data: {
          'playerName': data,
        }
      }),
      type: 'POST',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is an error, remove the login token
        delete localStorage.token;
        if (cb)
          cb(false, status);
      }
    })
  },

  getScoreboard: function(cb) {
    var url = "/api/scoreboard";
    $.ajax({
      url: url,
      type: 'GET',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        if (cb)
          cb(false, status);
      }
    });
  },

  updateScoreboard: function(item, cb) {
    var url = "/api/scoreboard/"+item.player;
    $.ajax({
      url: url,
      contentType: 'application/json',
      data: JSON.stringify({
        item: {
          name: item.player,
          score: item.score
        }
      }),
      type: 'PUT',
      success: function(res) {
        if (cb)
          cb(true, res);
      },
      error: function(xhr, status, err) {
        // if there is any error, remove any login token
        if (cb)
          cb(false, status);
      }
    });
  }
};

// data: JSON.stringify({
//         item: {
//           title: title1,
//           data: data
//         }
//       }),

module.exports = api;

