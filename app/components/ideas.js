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

var backButtonStyle = {
  visibility: 'hidden'
}

function displayText(index) {

  console.log(index);

  document.getElementById("postButton").style.visibility="hidden";  
  document.getElementById("idealist").style.visibility="hidden";  
  document.getElementById("backButton").style.visibility="visible";  

  var element = document.createElement('p');
  var textElement = document.createTextNode(ideaArray[index-1].text);
  element.appendChild(textElement);

  document.getElementById("textBody").appendChild(element);
}

var ideaArray = [
{"title":"idea one", "text":"this is the first cool idea", "index":"1"}, 
{"title":"idea two", "text":"this is a second idea", "index":"2"},  
{"title":"idea three", "text":"this is the third idea", "index":"3"} 
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
    var index = ideaArray.length;
    element.setAttribute("index", index);
    element.addEventListener("click", function() {
      displayText(element.getAttribute("index"));
    });
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
    var index = i+1;
    element.setAttribute("index", index);
    element.addEventListener("click", function() {
      console.log(index);
      displayText(element.getAttribute("index"));
    });
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
    var index = i+1;
    element.setAttribute("index",index);
    element.addEventListener("click", function() {
      displayText(element.getAttribute("index"));
    });
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

  goBack: function() {

  var textBody = document.getElementById("textBody");
  textBody.removeChild(textBody.childNodes[0]);

  document.getElementById("postButton").style.visibility="visible";  
  document.getElementById("idealist").style.visibility="visible";  
  document.getElementById("backButton").style.visibility="hidden";  
  },

  render: function() {

    return (
      <div>

        <Button
          id="postButton"
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          Post an idea!
        </Button>

        <Button
        id="backButton"
        bsStyle="primary"
        bsSize="large"
        style={backButtonStyle}
        onClick={this.goBack}
        >
        Back
        </Button>

      <div id="textBody">

      </div>

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