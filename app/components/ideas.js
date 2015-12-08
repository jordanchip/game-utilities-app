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
    ideas: [],
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  // handle login button submit
  postIdea: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var title = this.refs.ideaTitle.value;
    var text = this.refs.ideaText.value;
    if (!title || !text) {
      return;
    }
    // login via API
    auth.post(title, text, function(posted) {
      // login callback
      if (!posted) {
        window.alert("failure");
        return this.setState({
          error: true
        });
      }
    }.bind(this));
  },

  // when the component loads, get the list items
  componentDidMount: function() {
    api.getIdeas(this.setIdeas);
  },

    // reload the list of items
  reload: function() {
    api.getIdeas(this.setIdeas);
  },

  // callback for getting the list of items, sets the list state
  setIdeas: function(status, data) {
    if (status) {
      // set the state for the list of items
      this.setState({
        ideas: data.ideas
      });
    } else {
      // if the API call fails, redirect to the login page
      this.context.router.transitionTo('/login');
    }
  },

  addIdea: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var title = this.refs.ideaTitle.value;
    var text = this.refs.ideaText.value;
    if (!title || !text) {
      return;
    }
    // call API to add item, and reload once added
    api.post(title, text, this.props.reload);
    this.refs.ideaTitle.value = '';
    this.refs.ideaText.value = '';
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
                <input type="text" ref="ideaTitle" className="form-control input-sm chat-input" placeholder="Title" />
              <br/>
              <textarea ref="ideaText" name="ideaEntry" cols="78" rows="10" ></textarea>
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                 <a onClick={postIdea} className="btn btn-primary btn-md">Post <i className="fa fa-sign-in"></i></a>
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