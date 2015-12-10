var React = require("react");

var Popover = require('react-bootstrap/lib/Popover');
var Tooltip = require('react-bootstrap/lib/Tooltip');
var Button = require('react-bootstrap/lib/Button');
var Modal = require('react-bootstrap/lib/Modal');
var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var textStyle = {

  color: 'RoyalBlue',
  paddingTop: '10px',
  fontSize: '15px',
  fontFamily: 'Comic Sans MS'
};



var scoreArray = [{"player":"Jon", "points":"0"},
                  {"player":"Grant", "points":"0"},
                  {"player":"Jordan", "points":"0"},
                  {"player":"Guy", "points":"0"},
                  ];
                  
var removeIndex = 0;

function updatePoints(newPoints, value) {

  scoreArray[value].points=newPoints;

  var pointIndex="point"+value;

  pointElement = document.getElementById(pointIndex);

  pointElement.innerHTML=newPoints;
}

function removeElement(value) {

  console.log(value);

  scoreArray.splice(value, 1);
  /*var board = document.getElementById("board");
    
  console.log(value);

  board.removeChild(board.childNodes[value]);

  var childNodes = board.childNodes;

  var i;
  for(i=0; i < childNodes.length; i++) {
    var pointIndex="point"+i;
    var childNode = childNodes[i];
    var elementToSet = childNode.getElementsByTagName('td')[1];
    elementToSet.setAttribute("id", pointIndex);
    var updateButton = childNode.getElementsByTagName('td')[3];
    var removeButton = childNode.getElementsByTagName('td')[4];
    

  } */

}

var Scoreboard = React.createClass({

  getInitialState() {
    //ideas: [],
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  setList: function() {


    var i;
    for(i=0; i < scoreArray.length; i++) {

      this.addInitialElement(scoreArray[i].player, scoreArray[i].points, i);
    }

  },

  wipeScreen: function() {

    var board = document.getElementById("board");
    while(board.firstChild) {
      board.removeChild(board.firstChild);
    }

  },

    reset: function() {

    scoreArray = [];

    this.wipeScreen();

    },

  erase: function() {

    removeElement(removeIndex);

    this.wipeScreen();

    this.setList();
  },

  addInitialElement: function(name, points, value) {

    if(!name)
      return;

    var scoreTable = document.getElementById("board");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var textElement = document.createTextNode(name);
    td.appendChild(textElement);
    tr.appendChild(td);

    pointElement = document.createElement("td");
    textElement = document.createTextNode(points);
    pointElement.setAttribute("id", "point"+value);
    pointElement.appendChild(textElement);
    tr.appendChild(pointElement);

    td = document.createElement("td");
    var inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('size', '4');
    td.appendChild(inputBox);
    tr.appendChild(td);

//----------------------update button-------------------------
    td = document.createElement("td");
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-info btn-sm');

    button.addEventListener('click', function() {


      var newPoints = inputBox.value;

      updatePoints(newPoints, value);

   });

    textElement = document.createTextNode("update");
    button.appendChild(textElement);
    td.appendChild(button);
    tr.appendChild(td);

//----------------------remove button-------------------------
/*    td = document.createElement("td");
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-danger btn-sm');

    button.addEventListener('click', this.erase);

    textElement = document.createTextNode("remove");
    button.appendChild(textElement);
    td.appendChild(button);
    tr.appendChild(td); */
//---------------------append it all-------------------------
    scoreTable.appendChild(tr);

  },

  setList: function() {

    var i;
    for(i=0; i < scoreArray.length; i++) {

      this.addInitialElement(scoreArray[i].player, scoreArray[i].points, i);
    }

  },

  componentDidMount: function() {


    this.setList();

  },

    // reload the list of items
  reload: function() {

    this.setList();

  },

  addPlayer: function() {

    var name = this.refs.playerName.value;

    if(!name)
      return;

    var scoreElement = {"player":name, "points":"0"};

    scoreArray.push(scoreElement);

    this.wipeScreen();

    this.setList();

    this.close();
  },


  render: function() {
    return (
      <div className="table-responsive">

      <div className="btn-toolbar">
        <Button
          id="addButton"
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add a Player
        </Button>

        <Button 
          id="resetButton"
          bsStyle="danger"
          bsSize="large"
          onClick={this.reset}
        >
          Reset
        </Button>
        </div>
            <table id="scoreTable" className="table table-striped">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Points</th>
                  <th>Input</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody id="board">


              </tbody>
            </table>

            <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>What is his name?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form role="form">
          <div>
            <div className="form-login">
                <input type="text" ref="playerName" className="form-control input-sm chat-input" placeholder="Title" />
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                 <a onClick={this.addPlayer} className="btn btn-primary btn-md">Add <i className="fa fa-sign-in"></i></a>
                </span>
              </div>
            </div>
          </div>
        </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
          </div>
    );
  }
});

module.exports = Scoreboard;