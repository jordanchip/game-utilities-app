var React = require("react");
var Link = ReactRouter.Link;
var Route = ReactRouter.Route;

var homeNavStyle = {

  fontSize: '20px',
};

var logoStyle = {
  color: 'white',
  backgroundImage: 'url(' + 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Blue_sky_south_of_France.jpg' + ')',
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all', // 'ms' is the only lowercase vendor prefix
  height: '180px'

};

var logoutScreenStyle = {

  visibility: 'hidden'
};

var titleStyle = {

  color: 'white',
  padding: '60px',
  fontSize: '40px',
  fontFamily: 'Arial Black'
};

var Logo = React.createClass({
    render: function() {
        return <div className="text-center" style={logoStyle}>
          <p style={titleStyle}>Make Your Dreams Come True</p>
        </div>;
    }
});

var App = React.createClass({
   
  getInitialState: function() {
    //document.getElementById("logoutScreen").style.visibility = 'hidden';
    return {showLogout: false};
  },

  componentDidMount: function() {
    if (localStorage.token &&
        localStorage.name) {
      this.showLogout(true);
    }
    //document.getElementById("logoutScreen").style.visibility = 'hidden';
  },


  showLogout: function() {
    this.setState({showLogout:true});
  },

  logout: function() {
    if (localStorage.token) {
      delete localStorage.token;
      if (localStorage.name) {
        delete localStorage.name;
      }
      //this.setState({loggedIn:false});
   }
    else {
      alert('You are not logged in');
    }
    //this.showLogout(false);
  },

  render: function() {
   return (
      <div>
      <Logo />
        <nav className="navbar navbar-default" role="navigation">
          <div className="container">
              <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                  <li style={homeNavStyle}><Link to="/home">Home</Link></li>
                </ul>
               <ul className="nav navbar-nav">
                  <li><Link to="/ideas">Ideas</Link></li>
                </ul>
                <ul className="nav navbar-nav">
                  <li onClick={this.loadDice}><Link to="/dice">Dice</Link></li>
                </ul>
                <ul className="nav navbar-nav">
                  <li><Link to="/scoreboard">Scoreboard</Link></li>
                </ul>
                <ul className="nav navbar-nav">
                  <li><Link to="/tournament">Tournament</Link></li>
                </ul>
                <ul className="nav navbar-nav">
                  <li><Link to="/login">Login</Link></li>
                </ul>
                <ul className="nav navbar-nav">
                  <li><Link to="/register">Register</Link></li>
                </ul>
                <ul className="nav navbar-nav">
                  <li onClick={this.logout}><Link to="/logout">Logout</Link></li>
                </ul>
              </div>
            </div>
        </nav>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = App;