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
    //console.log(json);
  },


  displayBracket: function() {
    console.log("Displaying Bracket");
    this.setState({ showButton: true });
    // document.getElementById("buttonDiv").style.visibility="visible";  
    // document.getElementById("bracketID").style.visibility="visible";  


    // $('.list-group').bracket({
    //     init: minimalData /* data to initialize the bracket with */ });
    // var container = $('list-group')
    // container.bracket({
    //   init: minimalData,
    //   save: saveFn,
    //   userData: "http://myapi"})
 
    // /* You can also inquiry the current data */
    // $('#dataOutput').text(jQuery.toJSON(data))

    var container = $('.bracket');
    container.bracket({
      init: emptyData,
      save: this.saveFn
    })


    // $('.bracket').effect("size", {
    //     to: { width: 00, height: 500 }
    // }, 10000 );

    // $('.bracket').animate({
    //   height: '100px',
    //   width: '100px'
    // });

    document.getElementById("buttonDiv").style.visibility = 'visible';
  },

  componentDidMount: function() {
    this.displayBracket();
    document.getElementById("buttonDiv").style.visibility = 'hidden';
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
            onClick={this.back}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}); 

module.exports = Tournament;