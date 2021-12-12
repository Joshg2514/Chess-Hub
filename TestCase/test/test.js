// Authors: Tyler Oliver, John Ner, Colin Cottrell, Joshua Guillot
const app = express();
var assert = require('assert');

const updateRanking = require("./helperFunctions/updateRankings.js");

describe('maybeFirst', function() {
    it('returns the first element of an array', function() {    

    var beverages = { tea: ['chai', 'matcha', 'oolong'] };
    assert.equal(beverages.tea.length, 3);

});});

describe('TEST', async function() {
    
 const input = {
        num1 : 1,
        num2 : 2,
        win : ''
    }      
    
let output = await updateClient(input);
    it('TEST2', function() {    

    const expectedOutput = '[1,2,3,4,5,6,7,8,9,10]';  
 
    assert.equal( expectedOutput, output);

});
});




