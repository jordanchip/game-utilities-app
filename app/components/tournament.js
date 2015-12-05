var React = require("react");

var Button = require('react-bootstrap/lib/Button');

var hideButtonStyle = {
  visibility: 'hidden'
};
var showButtonStyle = {
  visibility: 'visible'
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

var Tournament = React.createClass({
  // componentDidMount: function() {
  //   $('.tournamentThing').bracket({
  //       init: minimalData /* data to initialize the bracket with */ });
  // },

  getInitialState() {
    return { showButton: false };
  },

  saveFn: function(data) {
    var json = jQuery.toJSON(data);
    $('#saveOutput').text('POST ' +userData+' '+json);
  },
  displayBracket: function() {
    console.log("Displaying Bracket");
    this.setState({ showButton: true });

    // $('.list-group').bracket({
    //     init: minimalData /* data to initialize the bracket with */ });
    // var container = $('list-group')
    // container.bracket({
    //   init: minimalData,
    //   save: saveFn,
    //   userData: "http://myapi"})
 
    // /* You can also inquiry the current data */
    // var data = container.bracket('data')
    // $('#dataOutput').text(jQuery.toJSON(data))

    $('.list-group').bracket({
      init: minimalData,
      save: function(){}
    })

    document.getElementById("buttonDiv").style.visibility = 'visible';
  },

  componentDidMount: function() {
    document.getElementById("buttonDiv").style.visibility = 'hidden';
  },

  back: function() {
    this.setState({ showButton: false  });
  },
  render: function() {

    return (
      <div className="container">
        <h2>Tournaments</h2>
        <div className="list-group">
          <a className="list-group-item" onClick={this.displayBracket}>First item</a>
          <a className="list-group-item">Second item</a>
          <a className="list-group-item">Third item</a>
        </div>
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