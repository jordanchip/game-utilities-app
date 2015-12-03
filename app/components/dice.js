var React = require("react");

var textStyle = {

  color: 'RoyalBlue',
  paddingTop: '10px',
  fontSize: '15px',
  fontFamily: 'Comic Sans MS'
};

var diceType = 6;
var diceAmount = 1;

var Dice = React.createClass({

  componentDidMount: function() {

    this.setType(diceType);
    this.setAmount(diceAmount);
  },

  rollDie: function() {

    var roll = 0;
    //roll = Math.floor(((Math.random()*diceType)+1)*diceAmount);

    var output = "You rolled: ";
    var i;
    for (i = 0; i < diceAmount; i++) {
      var tempNum = Math.floor((Math.random()*diceType+1));
      var tempString = tempNum.toString();
      output += tempString;
      if(i < diceAmount-1)
        output+= " + "
      roll += tempNum;
    }

    if(diceAmount != 1)
      output += " = " + roll.toString();

    document.getElementById("output").innerHTML = output;
  },


  setType: function(type) {
    
    diceType = type;
    if(type != 4)
      $("#four").removeClass("btn-primary").addClass("btn-info");
    else
      $("#four").removeClass("btn-info").addClass("btn-primary");
    if(type != 6)
      $("#six").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#six").removeClass("btn-info").addClass("btn-primary");
    if(type != 8)
      $("#eight").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#eight").removeClass("btn-info").addClass("btn-primary");
    if(type != 12)
      $("#twelve").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#twelve").removeClass("btn-info").addClass("btn-primary");
     if(type != 16)
      $("#sixteen").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#sixteen").removeClass("btn-info").addClass("btn-primary");
    if(type != 20)
      $("#twenty").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#twenty").removeClass("btn-info").addClass("btn-primary");
  },

  setAmount: function(amount) {
    diceAmount = amount;
    if(amount != 1)
      $("#1").removeClass("btn-primary").addClass("btn-info");
    else
      $("#1").removeClass("btn-info").addClass("btn-primary");
    if(amount != 2)
      $("#2").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#2").removeClass("btn-info").addClass("btn-primary");
    if(amount != 3)
      $("#3").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#3").removeClass("btn-info").addClass("btn-primary");
    if(amount != 4)
      $("#4").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#4").removeClass("btn-info").addClass("btn-primary");
     if(amount != 5)
      $("#5").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#5").removeClass("btn-info").addClass("btn-primary");
    if(amount != 6)
      $("#6").removeClass("btn-primary").addClass("btn-info");
    else 
      $("#6").removeClass("btn-info").addClass("btn-primary");
  },



  render: function() {
    return (
      <div className="container">
      <p style={textStyle}>What kind of dice?</p>
      <button type="button" className="btn btn-info" id="four" onClick={this.setType.bind(this, 4)}>4 Sided</button>
      &nbsp;
      <button type="button" className="btn btn-primary" id="six" onClick={this.setType.bind(this, 6)}>6 Sided</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="eight" onClick={this.setType.bind(this, 8)}>8 Sided</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="twelve" onClick={this.setType.bind(this, 12)}>12 Sided</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="sixteen" onClick={this.setType.bind(this, 16)}>16 Sided</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="twenty" onClick={this.setType.bind(this, 20)}>20 Sided</button>
      <p style={textStyle}>How many?</p>
       <button type="button" className="btn btn-primary" id="1" onClick={this.setAmount.bind(this, 1)}>One</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="2" onClick={this.setAmount.bind(this, 2)}>Two</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="3" onClick={this.setAmount.bind(this, 3)}>Three</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="4" onClick={this.setAmount.bind(this, 4)}>Four</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="5" onClick={this.setAmount.bind(this, 5)}>Five</button>
      &nbsp;
      <button type="button" className="btn btn-info" id="6"onClick={this.setAmount.bind(this, 6)}>Six</button>
      <p style={textStyle}></p>
      <button type="button" className="btn btn-success" onClick={this.rollDie} >ROLL THE DICE</button>
      <p style={textStyle}></p>
      <p id="output" style={textStyle}></p>
      </div>

    );
  }
});

module.exports = Dice; 
