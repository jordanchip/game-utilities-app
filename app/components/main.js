var React = require("react");
var ReactDOM = require('react-dom');
var ReactRouter = require("react-router");

var History = ReactRouter.History;

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./app.js");
var Home = require("./home.js");
var Ideas = require("./ideas.js");
var Login = require("./login.js");
var Register = require("./register.js");
var Scoreboard = require("./scoreboard.js");
var Tournament = require("./tournament.js");
var Dice = require("./dice.js");

// Run the routes
var routes = (
      <Router>
        <Route name="app" path="/" component={App}>
          <Route name="ideas" path="/ideas" component={Ideas} />
          <Route name="dice" path="/dice" component={Dice} />
          <Route name="scoreboard" path="/scoreboard" component={Scoreboard} />
          <Route name="tournament" path="/tournament" component={Tournament} />
          <Route name="login" path="/login" component={Login} />
          <Route name="register" path="/register" component={Register} />
          <Route name="home" path="/home" component={Home}/>
        </Route>
      </Router>
);



ReactDOM.render(routes, document.getElementById('content'));