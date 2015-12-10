var React = require("react");

var textTitleStyle = {

  color: 'RoyalBlue',
 
  fontSize: '30px',
  fontFamily: 'Comic Sans MS',
  marginLeft: 'auto',
  marginRight: 'auto',
  textAlign: 'center'
};

var textStyle = {

  color: 'RoyalBlue',
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
      <div className="container">

      <p style={textTitleStyle}>Welcome!</p>
      <p style={textStyle}>Hi!  This site was created as a college project.  The idea is to have some handy 
      in browser tools for games. 

      </p>
      
      </div>
    );
  }
});

module.exports = Home;