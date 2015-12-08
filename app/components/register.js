var React = require("react");

var auth = require("./auth.js");

var Register = React.createClass({

  // initial state
  getInitialState: function() {
    return {
      // there was an error registering
      error: false
    };
  },

  componentDidMount: function() {
    document.getElementById("isvalid").innerHTML = "";
  },

  // handle regiser button submit
  register: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var name = this.refs.name.value;
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    if (!name || !username || !password) {
      return;
    }
    // register via the API
    auth.register(name, username, password, function(loggedIn) {
      // register callback
      if (!loggedIn) {
         document.getElementById("isvalid").innerHTML = "Invalid username or password.";
        return this.setState({
          error: true
        });
      }
      else
         document.getElementById("isvalid").innerHTML = "You have been registered!";
    }.bind(this));
  },

  render: function() {
    return (
      <div className="login">
        <form role="form">
          <div className="col-md-offset-5 col-md-3">
              <h4>Register to unlock sweet features</h4>
                <input type="text" ref="name" autoFocus={true} className="form-control input-sm chat-input" placeholder="Name" />
              <br/>
              <input type="text" ref="username" className="form-control input-sm chat-input" placeholder="Username" />
              <br/>
              <input type="text" ref="password" className="form-control input-sm chat-input" placeholder="Password" />
              <br/>     
                <input className="btn btn-primary btn-md" type="submit" onClick={this.register} value="register"/>
               
                 <div id="isvalid" className="alert">Invalid username or password.</div>
                
                
          </div>
        </form>
      </div>
    );
  }
}); 

module.exports = Register;