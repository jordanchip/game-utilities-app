var React = require('react');

var api = require("./api.js");

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

var ideaArray = [
{"title":"idea one", "text":"this is a cool idea", "index":"1"}, 
{"title":"idea two", "text":"this is a cool idea", "index":"2"},  
{"title":"idea three", "text":"this is a cool idea", "index":"3"} 
];

var Ideas = React.createClass({
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


    var json = {"title":title, "text":text, "index":ideaArray.length+1};

    ideaArray.push(json);

    var element = document.createElement('a');
    var textElement = document.createTextNode(title);
    element.appendChild(textElement);
    element.setAttribute("class", "list-group-item");
    element.setAttribute("id", ideaArray.length);
    document.getElementById("idealist").appendChild(element);

    this.close;
    //api.post(title, text, this.props.reload);
    //this.refs.ideaTitle.value = '';
    //this.refs.ideaText.value = '';
  },

  // when the component loads, get the list items
  componentDidMount: function() {
    //api.getIdeas();

        var i;
    for(i = 0; i < ideaArray.length; i++) {

    var element = document.createElement('a');
    var textElement = document.createTextNode(ideaArray[i].title);
    element.appendChild(textElement);
    element.setAttribute("class", "list-group-item");
    element.setAttribute("id", i+1);
    document.getElementById("idealist").appendChild(element);
    }
  },

    // reload the list of items
  reload: function() {
    //api.getIdeas();

    var i;
    for(i = 0; i < ideaArray.length; i++) {

    var element = document.createElement('a');
    var textElement = document.createTextNode(ideaArray[i].title);
    element.appendChild(textElement);
    element.setAttribute("class", "list-group-item");
    element.setAttribute("id", i+1);
    document.getElementById("idealist").appendChild(element);
    }

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

      <div className="list-group" id="idealist">
      <p></p>
      
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
                 <a onClick={this.addIdea} className="btn btn-primary btn-md">Post <i className="fa fa-sign-in"></i></a>
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

/*var postModal = React.createClass({
  render() {
    return (

    );
  }
});*/

module.exports = Ideas;