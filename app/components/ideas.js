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

var ideaArray = [
{"title":"Hearts", "text":"Uses a 52 card pack.  The player with the highest score loses. At the end of each hand, players count the number of hearts they have taken as well as the queen of spades ", "index":"1"}, 
{"title":"Checkers", "text":"This involves a game board where you have lots of checked spots hence the name checkers lol and you take the pieces and you jump over pieces and you take their pieces and you laugh at the other persons face", "index":"2"},  
{"title":"Chess", "text":"This is a smart person's game and if you play it then you are smart and you will go to college and get lots of money.  You take somebody elses pieces and you throw them out the window yes out the window and then you win the game by taking pieces and moving them smartly", "index":"3"} 
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
    //event.preventDefault();
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

    this.props.close;
    //api.post(title, text, this.props.reload);
    //this.refs.ideaTitle.value = '';
    //this.refs.ideaText.value = '';
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
    //api.getIdeas();

    var i;
    for(i = 0; i < ideaArray.length; i++) {

      this.addInitialIdea(ideaArray[i].title, ideaArray[i].text, ideaArray[i].index);

    }
  },

    // reload the list of items
  reload: function() {
    //api.getIdeas();

    var i;
    for(i = 0; i < ideaArray.length; i++) {

      this.addInitialIdea(ideaArray[i].title, ideaArray[i].text, ideaArray[i].index);
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
  textBody.removeChild(textBody.childNodes[0]);

  document.getElementById("postButton").style.visibility="visible";  
  document.getElementById("idealist").style.visibility="visible";  
  document.getElementById("backButton").style.visibility="hidden";  
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

/*var postModal = React.createClass({
  render() {
    return (

    );
  }
});*/

module.exports = Ideas;