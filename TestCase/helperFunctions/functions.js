const alibarray = require("alib-array");

const fs = require("fs");

exports.writeToFile = function(rankingArray) {
    let rankingJson = JSON.stringify({ array: rankingArray });
  
    fs.writeFile("./rankings/rankings.json", rankingJson, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  
    return;
  }
  
exports.updateRanking = function(data, fromIndex, toIndex) {
    alibarray().move(data, fromIndex, toIndex);
  
    console.log("DATA", data);
    return data;
  }
  
exports.checkHigherIndexVal = function (num1, num2) {
    if (num1 < num2) {
      return num1;
    } else {
      return num2;
    }
  }
  
 exports.checkLowerIndexVal= function(num1, num2) {
    if (num1 > num2) {
      return num1;
    } else {
      return num2;
    }
  }