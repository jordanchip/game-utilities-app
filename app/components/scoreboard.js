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


  addPlayer: function() {

    var name = this.refs.playerName.value;

    if(!name)
      return;

    var scoreTable = document.getElementById("board");
    var tr = document.createElement("tr");
    var td = document.createElement("td");
    var textElement = document.createTextNode(name);
    td.appendChild(textElement);
    tr.appendChild(td);

    td = document.createElement("td");
    textElement = document.createTextNode("0");
    td.appendChild(textElement);
    tr.appendChild(td);



    td = document.createElement("td");
    var inputBox = document.createElement('input');
    inputBox.setAttribute('type', 'text');
    inputBox.setAttribute('size', '4');
    td.appendChild(inputBox);
    tr.appendChild(td);

    td = document.createElement("td");
    var button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn btn-info btn-sm');


    value = 1;
    button.addEventListener('click', function() {

      var inputBoxName = "input" + value;
      var pointsField = "points" + value;

      console.log(inputBoxName);

      var newPoints = this.refs.ideaTitle.value;;

      console.log(newPoints);

    });

    textElement = document.createTextNode("update");
    button.appendChild(textElement);
    td.appendChild(button);
    tr.appendChild(td);



    scoreTable.appendChild(tr);

    this.close();

  },


  render: function() {
    return (
      <div className="table-responsive">

        <Button
          id="addButton"
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Add a Player
        </Button>

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
                <tr>
                  <td>Jon</td>
                  <td id="points1">0</td>
                  <td><input id="input1" type="text" size="4"/></td>
                  <td><button type="button" className="btn btn-info btn-sm">update</button></td>
                </tr>
                <tr>
                  <td>Grant</td>
                  <td>1</td>
                  <td><input type="text" size="4"/></td>
                  <td><button type="button" className="btn btn-info btn-sm">update</button></td>
                </tr>
                <tr>
                  <td>Jordan</td>
                  <td>2</td>
                  <td><input type="text" size="4"/></td>
                 <td> <button type="button" className="btn btn-info btn-sm">update</button></td>
                </tr>
                <tr>
                  <td>Guy</td>
                  <td>3</td>
                  <td><input type="text" size="4"/></td>
                  <td><button type="button" className="btn btn-info btn-sm">update</button></td>
                </tr>

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