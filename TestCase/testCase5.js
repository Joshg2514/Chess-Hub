/**
 * This file tests the use case 5 for updating match score.
 * 1. Insert 10 players to the leaderboard.
 * 2. For that to pass, it needs to return a list of players that we inserted in the order when we entered the player.
 * 3. Next Test is to enter a match result and update the leaderboard according to the result.
 * For example, if the current leaderboard looks like this:
 * 1
 * 2
 * 3
 * 4
 * 5
 * 6
 * 7
 * If we enter a match result between 7 and 2, and the result is a win for 7, then the leaderboard should look like this after updating:
 * 1
 * 7
 * 2
 * 3
 * 4
 * 5
 * 6 
 * Or maybe we can expect an array of [1,7,2,3,4,5,6] and the test passes if this matches our expected output.
 * 
 * We also need to add a check to make sure the one updating the match score is one of the players or an admin. 
 * 
 */