var React = require("react");

var Login = React.createClass({
  render: function() {
    return (
      <div className="login">
        <form role="form">
          <div className="col-md-offset-5 col-md-3">
            <div className="form-login">
              <h4>Thou mayest login if thou desirest</h4>
                <input type="text" id="userName" className="form-control input-sm chat-input" placeholder="username" />
              <br/>
              <input type="text" id="userPassword" className="form-control input-sm chat-input" placeholder="password" />
              <br/>
              <div className="wrapper">
                <span className="group-btn">     
                 <a href="#" className="btn btn-primary btn-md">login <i className="fa fa-sign-in"></i></a>
                </span>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}); 

module.exports = Login;