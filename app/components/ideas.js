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

var ideaArray = [];
var ideaIndex = 0;

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

function displayText(index) {

  ideaIndex = index;

  console.log(index);
  console.log(ideaArray);

  document.getElementById("postButton").style.visibility="hidden";  
  document.getElementById("idealist").style.visibility="hidden";  
  document.getElementById("backButton").style.visibility="visible";  
  document.getElementById("deleteButton").style.visibility="visible";  

  var header = document.createElement('h1');
  var headerText = document.createTextNode(ideaArray[index-1].title);
  header.appendChild(headerText);
  header.style.color="RoyalBlue";
  header.style.paddingTop="0px";
  header.style.fontSize="25px";
  header.style.fontFamily="Comic Sans MS";
  header.style.paddingLeft="139px";
  header.style.maxWidth="800px";
  header.style.textDecoration="underline";


  var element = document.createElement('p');
  var textElement = document.createTextNode(ideaArray[index-1].text);
  element.appendChild(textElement);
  element.style.color="RoyalBlue";
  element.style.paddingTop="0px";
  element.style.fontSize="15px";
  element.style.fontFamily="Comic Sans MS";
  element.style.paddingLeft="139px";
  element.style.maxWidth="800px";

  document.getElementById("textBody").appendChild(header);
  document.getElementById("textBody").appendChild(element);
}


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

 // callback for getting the list of items, sets the list state
  listSet: function(status, data) {
    if (status) {
      // set the state for the list of items
        console.log("here");
        ideaArray = data.ideas;
        console.log(ideaArray);

        var idealist = document.getElementById("idealist");
        var para = document.createElement("p");
        idealist.appendChild(para);
        var i;
      for(i = 0; i < ideaArray.length; i++) {

      this.addInitialIdea(ideaArray[i].title, ideaArray[i].text, i+1);
      }
    }
  },

  addIdea: function(event) {

    var title = this.refs.ideaTitle.value;
    var text = this.refs.ideaText.value;
    if (!title || !text) {
      return;
    }
    // call API to add item, and reload once added
    var index = ideaArray.length;
    api.addIdea(title, text, index, this.props.reload);

    var idealist = document.getElementById("idealist");
    while(idealist.firstChild) {
      idealist.removeChild(idealist.firstChild);
    }

    api.getIdeas(this.listSet);

  },

  // when the component loads, get the list items

  addInitialIdea: function(title, text, index) {

    var element = document.createElement('a');
    var textElement = document.createTextNode(title);
    element.appendChild(textElement);
    element.setAttribute("class", "list-group-item");
    element.setAttribute("index", index);
    element.addEventListener("click", function() {
      console.log(index);
      displayText(element.getAttribute("index"));
    });
    document.getElementById("idealist").appendChild(element);
  },

  componentDidMount: function() {

    api.getIdeas(this.listSet);

  },

    // reload the list of items
  reload: function() {

    api.getIdeas(this.listSet);

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
  textBody.removeChild(textBody.childNodes[0]);

  document.getElementById("postButton").style.visibility="visible";  
  document.getElementById("idealist").style.visibility="visible";  
  document.getElementById("backButton").style.visibility="hidden";  
  document.getElementById("deleteButton").style.visibility="hidden";  
  },

  removeIdea: function() {

    api.deleteIdea(ideaArray[ideaIndex-1], null);
    ideaArray.splice(ideaIndex-1, 1);
    console.log(ideaArray);


    var idealist = document.getElementById("idealist");
    while(idealist.firstChild) {
      idealist.removeChild(idealist.firstChild);
    }

    api.getIdeas(this.listSet);
    this.goBack();
  },

  onClick: function(){
      this.addIdea();
      this.close();
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

        <Button
        id="deleteButton"
        bsStyle="primary"
        bsSize="large"
        style={backButtonStyle}
        onClick={this.removeIdea}
        >
        Delete
        </Button>

      <div id="textBody">

      </div>

      <div className="list-group" id="idealist">
      
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
                 <a onClick={this.onClick} className="btn btn-primary btn-md">Post <i className="fa fa-sign-in"></i></a>
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