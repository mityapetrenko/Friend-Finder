
var path=require("path");
var friends = require('../data/friends.js');


// Displays friends
module.exports=function(app){
app.get("/api/friends", function(req, res) {
    return res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newSurvey = req.body;

    console.log(newSurvey);

    console.log(newSurvey.scores);
        for(var j=0; j<newSurvey.scores.length; j++){
          newSurvey.scores[j]=parseInt(newSurvey.scores[j]);

          console.log("int scores are: "+ newSurvey.scores[j]);
      }
      var minimalDifference=25;
      var bestFriend="";
      var bestFriendName="";
      var bestFriendPhoto="";
      for( var i=0; i<friends.length; i++){
       var score=friends[i].scores;
       console.log("friends scores are "+ score);
       var totalDifference=0;
       for(var j = 0; j < score.length; j++) {
          var diff=Math.abs(newSurvey.scores[j]-friends[i].scores[j]);
          totalDifference+=diff;
          console.log("the difference is " + diff);
          console.log("total diff "+ totalDifference);
      }
    
      if(totalDifference < minimalDifference){
          totalDifference=minimalDifference;
          bestFriend=i;
          bestFriendName=friends[i].name;
          bestFriendPhoto=friends[i].photo;
          console.log("your best friend "+ bestFriend);
      }
    }  
  
  friends.push(newSurvey);

  res.json(friends[bestFriend]);
  console.log(" friends" +friends);
});
}
