// Authors: Tyler Oliver, John Ner, Colin Cottrell, Joshua Guillot

var assert = require('assert');


const functions = require("../helperFunctions/functions");

describe('maybeFirst', function() {
    it('returns the first element of an array', function() {    

    var beverages = { tea: ['chai', 'matcha', 'oolong'] };
    assert.equal(beverages.tea.length, 3);

});});

describe('Update Rankings', function() {

let initialRankArr = [1,2,3,4,5,6,7,8,9,10];

functions.writeToFile(initialRankArr);
    
 const input = {
        num1 : 1,
        num2 : 2,
        loss : ''
    } 
    //Num 2 wins against num 1, rank 2 should output rank 1    

    it('Test to make sure the rankings are updated properly depending on the input and who won', function() {    

    //initial ranking: [2,1,3,4,5,6,7,8,9,10]

    const expectedOutput = '[2,1,3,4,5,6,7,8,9,10]';  
 
    assert.equal( expectedOutput, output);

});
});




