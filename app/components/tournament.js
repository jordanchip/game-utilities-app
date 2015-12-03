var React = require("react");


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
  displayBracket: function() {
    $('.list-group').bracket({
        init: minimalData /* data to initialize the bracket with */ });
  },
  render: function() {
    return (
      <div className="container">
        <h2>List Group With Linked Items</h2>
        <div className="list-group">
          <a className="list-group-item active" onClick={this.displayBracket}>First item</a>
          <a className="list-group-item">Second item</a>
          <a className="list-group-item">Third item</a>
        </div>
      </div>
    );
  }
}); 

module.exports = Tournament;