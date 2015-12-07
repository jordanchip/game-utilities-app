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
      if (!loggedIn)
        return this.setState({
          error: true
        });
      this.history.pushState(null, '/list');
    }.bind(this));
  },

  render: function() {
    return (
      <div className="login">
        <form role="form">
          <div className="col-md-offset-5 col-md-3">
              <h4>Register to unlock sweet features</h4>
                <input type="text" ref="name" autoFocus={true} className="form-control input-sm chat-input" placeholder="username" />
              <br/>
              <input type="text" ref="username" className="form-control input-sm chat-input" placeholder="password" />
              <br/>
              <input type="text" ref="password" className="form-control input-sm chat-input" placeholder="password again" />
              <br/>     
                <input className="btn btn-primary btn-md" type="submit" value="register"/>
                {this.state.error ? (
                 <div className="alert">Invalid username or password.</div>
                ) : null }
          </div>
        </form>
      </div>
    );
  }
}); 

module.exports = Register;