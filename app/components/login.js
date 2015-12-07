var React = require("react");

var auth = require("./auth.js");

var Login = React.createClass({


  // initial state
  getInitialState: function() {
    return {
      // there was an error on logging in
      error: false
    };

  },

  // handle login button submit
  login: function(event) {
    // prevent default browser submit
    event.preventDefault();
    // get data from form
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    if (!username || !password) {
      return;
    }
    // login via API
    auth.login(username, password, function(loggedIn) {
      // login callback
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
            <div className="form-login">
              <h4>Thou mayest login if thou desirest</h4>
                <input type="text" ref="username" autoFocus={true} className="form-control input-sm chat-input" placeholder="username" />
              <br/>
              <input type="password" ref="password" className="form-control input-sm chat-input" placeholder="password" />
              <br/>
              <input className="btn btn-primary btn-md" type="submit" value="login" />
              {this.state.error ? (
                  <div className="alert">Invalid username or password.</div>
               ) : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}); 

module.exports = Login;