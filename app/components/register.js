var React = require("react");

var Register = React.createClass({
  render: function() {
    return (
      <div className="login">
        <form role="form">
          <div className="col-md-offset-5 col-md-3">
            <div className="form-login">
              <h4>Register to unlock sweet features</h4>
                <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
              <br/>
              <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
              <br/>
              <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password again" />
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                 <a href="#" className="btn btn-primary btn-md">register <i className="fa fa-sign-in"></i></a>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}); 

module.exports = Register;