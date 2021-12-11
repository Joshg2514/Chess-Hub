const express = require("express");
const bodyParser = require("body-parser");

fs = require('fs');
//arrayMove = require('array-move');
const alibarray = require('alib-array');
  
// New app using express module
const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
  
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
  
app.post("/", function(req, res) {
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2); 

  //req.body.hasOwnProperty(win);
  //req.body.hasOwnProperty(draw);
  //req.body.hasOwnProperty(lose);

  console.log(req.body);
  fs.readFile('./rankings/rankings.json', 'utf8', (err, array) => {

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
    
       console.log("index of num 1",indexOfnum1);
    
        //updates ranking based on the winner

        let higherNum = checkHigherIndexVal(indexOfnum1, indexOfnum2);
        let lowerNum = checkLowerIndexVal(indexOfnum1, indexOfnum2);

        console.log("lowerNum", lowerNum, "higher num ", higherNum);

        if((higherNum == indexOfnum1) && (req.body.hasOwnProperty("win") || req.body.hasOwnProperty("draw"))){ 
            //This assumes the playerA is higher 
            //rated than his opponent and they won, nothing changes with the ranking.
            
            res.send("Current Leaderboard" + databases.array);  
        }
        else if((higherNum == indexOfnum1) && (req.body.hasOwnProperty("loss"))){
          
            let updatedRanking = updateRanking(databases.array, lowerNum, higherNum);
            writeToFile(updatedRanking);
        
            res.send("Current Leaderboard" + updatedRanking);   
            
        }
        
        else if((higherNum == indexOfnum2) && req.body.hasOwnProperty("win") ){

            let updatedRanking = updateRanking(databases.array, lowerNum, higherNum);
            writeToFile(updatedRanking);
        
            res.send("Current Leaderboard" + updatedRanking);   
        }

         
        else if((higherNum == indexOfnum2) && (req.body.hasOwnProperty("loss") || req.body.hasOwnProperty("draw"))){      
              
            res.send("Current Leaderboard" + databases.array);   
        }

        else{
            console.log("error");
        }
    }  

});
   
});
  
app.listen(3000, function(){
  console.log("server is running on port 3000");
})

function writeToFile(rankingArray){  

    let rankingJson = JSON.stringify({ array : rankingArray });

    fs.writeFile('./rankings/rankings.json', rankingJson, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    return;
}

function updateRanking(data, fromIndex, toIndex){
  
   alibarray().move(data, fromIndex, toIndex);
   
   console.log("DATA",data);
   return data;
}

function checkHigherIndexVal(num1, num2){

    if(num1 < num2){
        return num1
    }

    else {
        return num2
    }

}

function checkLowerIndexVal(num1, num2){
    if(num1 > num2){
        return num1
    }
    else {
        return num2
    }

}







