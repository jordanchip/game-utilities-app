var app = require('./express.js');
var User = require('./user.js');
//var Item = require('./item.js');
var Idea = require('./idea.js');
var Tournament = require('./tournament.js');
var Scoreboard = require('./scoreboard');
var mongoose = require('mongoose');

// setup body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
}));

//
// API
//

// register a user
app.post('/api/users/register', function (req, res) {
    // find or create the user with the given username
    User.findOrCreate({username: req.body.username}, function(err, user, created) {
        if (created) {
            // if this username is not taken, then create a user record
            user.name = req.body.name;
            user.set_password(req.body.password);
            user.save(function(err) {
		if (err) {
		    res.sendStatus("403");
		    return;
		}
                // create a token
		var token = User.generateToken(user.username);
                // return value is JSON containing the user's name and token
                res.json({name: user.name, token: token});
            });
        } else {
            // return an error if the username is taken
            res.sendStatus("403");
        }
    });
});

// login a user
app.post('/api/users/login', function (req, res) {
    // find the user with the given username
    User.findOne({username: req.body.username}, function(err,user) {
	if (err) {
	    res.sendStatus(403);
	    return;
	}
        // validate the user exists and the password is correct
        if (user && user.checkPassword(req.body.password)) {
            // create a token
            var token = User.generateToken(user.username);
            // return value is JSON containing user's name and token
            res.json({name: user.name, token: token});
        } else {
            res.sendStatus(403);
        }
    });
});

// get all items for the user
app.get('/api/items', function (req,res) {
    // validate the supplied token
    user = User.verifyToken(req.headers.authorization, function(user) {
        if (user) {
            // if the token is valid, find all the user's items and return them
	    Item.find({user:user.id}, function(err, items) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
		// return value is the list of items as JSON
		res.json({items: items});
	    });
        } else {
            res.sendStatus(403);
        }
    });
});



// get an item
app.get('/api/items/:item_id', function (req,res) {
    // validate the supplied token
    user = User.verifyToken(req.headers.authorization, function(user) {
        if (user) {
            // if the token is valid, then find the requested item
            Item.findById(req.params.item_id, function(err, item) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
                // get the item if it belongs to the user, otherwise return an error
                if (item.user != user) {
                    res.sendStatus(403);
		    return;
                }
                // return value is the item as JSON
                res.json({item:item});
            });
        } else {
            res.sendStatus(403);
        }
    });
});

// update an item
app.put('/api/items/:item_id', function (req,res) {
    // validate the supplied token
    user = User.verifyToken(req.headers.authorization, function(user) {
        if (user) {
            // if the token is valid, then find the requested item
            Item.findById(req.params.item_id, function(err,item) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
                // update the item if it belongs to the user, otherwise return an error
                if (item.user != user.id) {
                    res.sendStatus(403);
		    return;
                }
                item.title = req.body.item.title;
                item.completed = req.body.item.completed;
                item.save(function(err) {
		    if (err) {
			res.sendStatus(403);
			return;
		    }
                    // return value is the item as JSON
                    res.json({item:item});
                });
	    });
        } else {
            res.sendStatus(403);
        }
    });
});



// add an item
app.post('/api/ideas', function (req,res) {

    Idea.create({title:req.body.idea.title,text:req.body.idea.text,index:req.body.index}, function(err,item) {
    if (err) {
        res.sendStatus(403);
        return;
    }
    });
    
});

// get all items for the user
app.get('/api/ideas', function (req,res) {
        Idea.find( function(err, ideas) {
        if (err) {
           res.sendStatus(403);
           return;
        }
        // return value is the list of items as JSON
        res.json({ideas: ideas});
        });

});

// delete an idea
app.delete('/api/ideas/:idea_id', function (req,res) {

            // if the token is valid, then find the requested item
            console.log("here");
            Idea.findByIdAndRemove(req.params.idea_id, function(err,idea) {
        if (err) {
            res.sendStatus(403);
            return;
        }
            res.sendStatus(200);

    });
});

app.post('/api/tournaments/', function (req,res) {

    var body = req.body;
    console.log("BODY: " );
    console.log(body);


    user = User.verifyToken(req.headers.authorization, function(user) {
        if (user) {
            // if the token is valid, create the item for the user

            Tournament.update(
                {user: mongoose.Types.ObjectId(user.id)},
                {data: req.body},
                { upsert: true },
                function(err,item) {
                    if (err) {
                        res.sendStatus(403);
                        return;
                    }
                res.json({item:item});
            });
        } else {
            res.sendStatus(403);
        }
    });
});

app.get('/api/tournaments/', function (req, res) {
    user = User.verifyToken(req.headers.authorization, function(user) {
        if (user) {
            // if the token is valid, create the item for the user
        Tournament.find({user: mongoose.Types.ObjectId(user.id)}, function(err,item) {
        if (err) {
            res.sendStatus(403);
            return;
        }
        res.json({item:item});
        });
        } else {
            res.sendStatus(403);
        }
    });
});

app.post('/api/scoreboard/', function (req,res) {

    var body = req.body;
    console.log("BODY:-- " );
    console.log(body.data);
    Scoreboard.create({playerName:req.body.data.playerName,score:'0'}, function(err,item) {
        if (err) {
            res.sendStatus(403);
            return;
        }
    });
});

app.get('/api/scoreboard', function (req,res) {
    Scoreboard.find(function(err, data) {
        if (err) {
           res.sendStatus(403);
           return;
        }
        // return value is the list of items as JSON
        console.log(data);
        //res.json({playerName:data.playerName, score:data.score});
        res.json({data:data});
        //console.log(res);
    });
});

// update a score
app.put('/api/scoreboard/:name', function (req,res) {
   
    Scoreboard.find({playerName:req.body.item.name}, function(err,item) {
        if (err) {
            res.sendStatus(403);
            return;
        }            
        item.playerName = req.body.item.name;
        item.score = req.body.item.points;
    });
});


// delete an idea
app.delete('/api/scoreboard', function (req,res) {
    console.log('deleteit');
        Scoreboard.remove({}, function(err,idea) {
        if (err) {
            res.sendStatus(403);
            return;
        }
            res.sendStatus(200);

    });
});
