// Authors: Tyler Oliver, John Ner, Colin Cottrell, Joshua Guillot

var assert = require('assert');

const functions = require("../helperFunctions/functions");

describe('ArrayLengthCheck', function() {
    it('Checks the length of the array', function() {    

    var beverages = { tea: ['chai', 'matcha', 'oolong'] };
    assert.equal(beverages.tea.length, 3);

});});

describe('Write To File Test', function() {

    let initialRankArr = [2,1,3,4,5,6,7,8,9,10];
    
    functions.writeToFile(initialRankArr);
        
     const input = {
            num1 : 2,
            num2 : 1,
            win : ''
        } 
        //Num 2 wins against num 1, rank 2 should output rank 1    
    
        var indexOfnum1 = initialRankArr.indexOf(input.num1);
        var indexOfnum2 = initialRankArr.indexOf(input.num2);
    
        it('Unit Test to make sure the ranking.json is updated properly', function() {   
            
        let actualOutput = functions.updateRanking(initialRankArr,indexOfnum1,indexOfnum2);     
    
        const expectedOutput = [1,2,3,4,5,6,7,8,9,10];  
     
        assert.deepStrictEqual( expectedOutput, actualOutput);
    
    });
    });

describe('CheckHigherVal', function() {

    let initialRankArr = [1,2,3,4,5,6,7,8,9,10];
        
    functions.writeToFile(initialRankArr);
        
     const input = {
            num1 : 4,
            num2 : 5,
            loss : ''
        }         
    
        var indexOfnum1 = initialRankArr.indexOf(input.num1);
        var indexOfnum2 = initialRankArr.indexOf(input.num2);
    
        it('Unit Test to make sure an index of a value is Higher', function() {   
            
        let actualOutput = functions.checkHigherIndexVal(indexOfnum1,indexOfnum2);
        
        const expectedOutput = indexOfnum1;  
     
        assert.deepStrictEqual( expectedOutput, actualOutput);
    
    });
});

    describe('CheckLowerVal', function() {

        let initialRankArr = [1,2,3,4,5,6,7,8,9,10];
        
        functions.writeToFile(initialRankArr);
            
         const input = {
                num1 : 5,
                num2 : 4,
                loss : ''
            }        
        
            var indexOfnum1 = initialRankArr.indexOf(input.num1);
            var indexOfnum2 = initialRankArr.indexOf(input.num2);
        
            it('Unit Test to make sure an index of a value is lower', function() {   
                
            let actualOutput = functions.checkLowerIndexVal(indexOfnum1,indexOfnum2);
          
            const expectedOutput = indexOfnum1;  
         
            assert.deepStrictEqual( expectedOutput, actualOutput);
        
        });
 });
      
 describe('Update Rankings', function() {

    let initialRankArr = [1,2,3,4,5,6,7,8,9,10];
    
    functions.writeToFile(initialRankArr);
        
     const input = {
            num1 : 1,
            num2 : 2,
            loss : ''
        } 
        //Num 2 wins against num 1, rank 2 should output rank 1    
    
        var indexOfnum1 = initialRankArr.indexOf(input.num1);
        var indexOfnum2 = initialRankArr.indexOf(input.num2);
    
        it('Acceptance Test to make sure the player who won takes the place of the player they beat.', function() {   
            
        let actualOutput = functions.updateRanking(initialRankArr,indexOfnum1,indexOfnum2);
     
    
        const expectedOutput = [2,1,3,4,5,6,7,8,9,10];  
     
        assert.deepStrictEqual( expectedOutput, actualOutput);
    
    });
    });



