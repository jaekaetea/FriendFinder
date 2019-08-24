var friends = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function(req, res) {
        var user = req.body;

        for (var i = 0; i < user.scores.length; i++) {
            user.scores[i] = parseInt(user.scores[i]);
        }
        
        var bfIndex = 0;
        var difference = 100;

        for (var i = 0; i < friends.length; i++) {
            var diff = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var d = Math.abs(user.scores[j] - friends[i].scores[j]);
                diff += d;
            }
            //console.log(diff + friends[i].name);
            if (diff < difference) {
                bfIndex = i;
                difference = diff;
            }
        }

        friends.push(user);
        res.json(friends[bfIndex]);
    });
};