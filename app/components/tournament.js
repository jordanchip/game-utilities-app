var React = require("react");
var api = require('./api.js');

var Button = require('react-bootstrap/lib/Button');

var hideButtonStyle = {
  visibility: 'hidden'
};
var showButtonStyle = {
  visibility: 'visible'
}
var bracketStyle = {
  color: 'black'
}

var minimalData = {
    teams : [
      ["Team 1", "Team 2"], /* first matchup */
      ["Team 3", "Team 4"]  /* second matchup */
    ],
    results : [
      [[1,2], [3,4]],       /* first round */
      [[4,6], [2,1]]        /* second round */
    ]
  };

var emptyData = {
  teams : [
    ['',''],
    ['','']
  ],
  results : []
};

var Tournament = React.createClass({
  // componentDidMount: function() {
  //   $('.tournamentThing').bracket({
  //       init: minimalData /* data to initialize the bracket with */ });
  // },

  getInitialState() {
    return { reload: false };
  },

  saveFn: function() {
    if (!localStorage.token) {
      alert("You must be signed in to save.");
      return;
    }
    var container = $('.bracket');
    var data = container.bracket('data');
    api.addTournament("UserBracket", data, function(loggedIn) {
      // login callback
      if (!loggedIn) {
        window.alert("failure");
        return this.setState({
          error: true
        });
      }
    }.bind(this));
  },

  resetBracket: function() {
    this.setState({reload: true});
  },

  componentDidUpdate: function() {
    if (this.state.reload) {
      this.displayBracket(emptyData);
      if (localStorage.token) {
        api.addTournament("UserBracket", emptyData);
      }
    }
  },

  displayBracket: function(data) {
    var container = $('.bracket');
    container.bracket({
      init: data,
      save: function(){}
    })

  },
  getBracketForUser: function() {
    api.getTournamentForUser(function(success,res) {
      if (success) {
        var item = res.item;
        var data;
        if (item.length == 1) {
          data = item[0].data;
        }
        else {
          data = emptyData;
        }
        var container = $('.bracket');
        container.bracket({
          init: data,
          save: function(){}
        });
        }
    });
  },

  componentDidMount: function() {
    if (localStorage.token) {
      this.getBracketForUser();
    }
    else {
      this.displayBracket(emptyData);
    }
  },

  back: function() {
    this.setState({ showButton: false  });
  },
  render: function() {

    return (
      <div className="container">
        <h2>Tournaments</h2>
        <div className="bracket" id="bracketID" style={bracketStyle}></div>
        <div id="buttonDiv">

          <Button 
            id="saveButton"
            bsStyle="primary"
            bsSize="large"
            onClick={this.saveFn}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
}); 

module.exports = Tournament;