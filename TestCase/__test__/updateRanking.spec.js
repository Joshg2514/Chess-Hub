const express = require("express");

const app = express();

// app.get("/", (req, res) => {
//     res.send("Hello, World!");
// });

// app.listen(1000, () => {
//     console.log("Listen on the port 4000...");
// });

async function post(){

    var request = require('request');
function updateClient(postData){
    var clientServerOptions = {
        uri: 'http://localhost:3000',
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
               
        return response.body;
    });
}

const input = {
    num1 : 1,
    num2 : 2,
    win : ''
}      
let output = updateClient(input);

console.log(output)

return output;
}


describe("Update Ranking", () => {        

    test("it should update the ranking based on the inputs", () => {      

        const expectedOutput = [1,2,3,4,5,6,7,8,9,10];  

        let output = post();
     

        expect(output).toEqual(expectedOutput);
    
      });
    
  });


