var React = require('react');

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

var Ideas = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {

    return (
      <div>

        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Post an idea!
        </Button>

      <div className="list-group">
      <p></p>
      
        <a href="#" className="list-group-item">First item</a>
        <a href="#" className="list-group-item">Second item</a>
        <a href="#" className="list-group-item">Third item</a>
      </div>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Just post it</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           <form role="form">
          <div>
            <div className="form-login">
                <input type="text" id="ideaTitle" className="form-control input-sm chat-input" placeholder="Title" />
              <br/>
              <textarea name="ideaEntry" cols="78" rows="10" ></textarea>
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                 <a href="#" className="btn btn-primary btn-md">Post <i className="fa fa-sign-in"></i></a>
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

module.exports = Ideas;