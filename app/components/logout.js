var React = require("react");

var Logout = React.createClass({



  // initial state
  getInitialState: function() {
    return {
      // there was an error on logging in
      error: false
    };

  },

  render: function() {
    return (
      <p>You are logged out.</p>
    );
  }
}); 

module.exports = Logout;