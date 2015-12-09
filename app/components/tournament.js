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
    return { showButton: false };
  },

  saveFn: function() {
    if (!localStorage.token) {
      return;
    }
    var container = $('.bracket');
    var data = container.bracket('data');
    api.addTournament("titleTest", data, function(loggedIn) {
      // login callback
      if (!loggedIn) {
        window.alert("failure");
        return this.setState({
          error: true
        });
      }
    }.bind(this));
  },


  displayBracket: function(data) {
    console.log("Displaying Bracket");
    document.getElementById("buttonDiv").style.visibility = 'visible';
    this.setState({ showButton: true });

    var container = $('.bracket');
    container.bracket({
      init: data,
      save: function(){}
    })

  },
  getBracketForUser: function() {
    api.getTournamentForUser(function(res) {
      console.log(res);
      // this.setState({
      //   tournament: res.data
      // });
      this.displayBracket(res.data).bind(this);
    });
  },

  componentDidMount: function() {
    if (localStorage.token) {
      this.getBracketForUser();
    }
    this.displayBracket();
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