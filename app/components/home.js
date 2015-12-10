var React = require("react");

var textTitleStyle = {

  color: 'black',
 
  fontSize: '30px',
  fontFamily: 'Comic Sans MS',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center'
};

var homeStyle = {

  backgroundImage: 'url(http://images.fineartamerica.com/images/artworkimages/mediumlarge/1/3-game-pieces-in-various-colours-bernard-jaubert.jpg)', 
  width: '900px',
  height: '900px'
};

var textStyle = {

  color: 'black',
  paddingTop: '10px',
  fontSize: '15px',
  fontFamily: 'Comic Sans MS',
  maxWidth: '700px',
  marginLeft: 'auto',
  marginRight: 'auto'

};

var Home = React.createClass({
  render: function() {
    return (
      <div style={homeStyle} className="container">

      <p style={textTitleStyle}>Welcome!</p>
      <p style={textStyle}>Hi!  Welcome to Gaming Utilities!  Here you can find some generic utilities that
      can be used in a variety of games.  Mainly, there is a dice roller, a scoreboard, and a tournament bracket.
      Also, there is an ideas forum that you can look through if you are bored and are searching for new game
      ideas.  If you register, you can save tournament brackets for later use.  Feel free to explore and enjoy your stay!
      </p>
      
      </div>
    );
  }
});

module.exports = Home;