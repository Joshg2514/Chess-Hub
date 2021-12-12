// Authors: Tyler Oliver, John Ner, Colin Cottrell, Joshua Guillot

const functions = require("./functions.js");
const fs = require("fs");

exports.loadFile = function(req, res, num1, num2) {
    console.log(req.body);
    fs.readFile("./rankings/rankings.json", "utf8", (err, array) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        // parse JSON string to JSON object
        const databases = JSON.parse(array);
  
        //{"array": [1,2,3,4,5,6]}
        // print all databases
  
        console.log("array", databases.array);
  
        var indexOfnum1 = databases.array.indexOf(num1);
        var indexOfnum2 = databases.array.indexOf(num2);
  
        if ((indexOfnum1 || indexOfnum2) == -1) {
          res.send(
            "Number inserted is not in the Ranking List: \n" + databases.array
          );
        } else {
          console.log("index of num 1", indexOfnum1);
  
          //updates ranking based on the winner
  
          let higherNum = functions.checkHigherIndexVal(indexOfnum1, indexOfnum2);
          let lowerNum = functions.checkLowerIndexVal(indexOfnum1, indexOfnum2);
  
          console.log("lowerNum", lowerNum, "higher num ", higherNum);
  
          if (
            higherNum == indexOfnum1 &&
            (req.body.hasOwnProperty("win") || req.body.hasOwnProperty("draw"))
          ) {
            //This assumes the playerA is higher
            //rated than his opponent and they won, nothing changes with the ranking.
  
            res.send("Current Leaderboard \n" + databases.array);
          } else if (
            higherNum == indexOfnum1 &&
            req.body.hasOwnProperty("loss")
          ) {
            let updatedRanking = functions.updateRanking(
              databases.array,
              lowerNum,
              higherNum
            );
            functions.writeToFile(updatedRanking);
            res.send("Current Leaderboard \n" + updatedRanking);
            
          } else if (higherNum == indexOfnum2 && req.body.hasOwnProperty("win")) {
            let updatedRanking = functions.updateRanking(
              databases.array,
              lowerNum,
              higherNum
            );
            functions.writeToFile(updatedRanking);
  
            res.send("Current Leaderboard \n" + updatedRanking);
          } else if (
            higherNum == indexOfnum2 &&
            (req.body.hasOwnProperty("loss") || req.body.hasOwnProperty("draw"))
          ) {
            res.send("Current Leaderboard \n" + databases.array);
          } else {
            console.log("error");
          }
        }
      }
    });
    return true;
}