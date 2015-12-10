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

            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Points</th>
                  <th>Input</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Jon</td>
                  <td>0</td>
                  <td><input type="text" size="4"/></td>
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
                <input type="text" ref="ideaTitle" className="form-control input-sm chat-input" placeholder="Title" />
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                 <a onClick={this.onClick} className="btn btn-primary btn-md">Add <i className="fa fa-sign-in"></i></a>
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