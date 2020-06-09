// Import the library
const server = require('server');

// chutes and ladders rolls analysis

var boardList = [0,38,2,3,14,5,6,7,8,31,10,11,12,13,14,15,6,17,18,19,20,42,22,23,24,25,26,27,84,29,30,31,32,33,34,35,44,37,38,39,40,41,42,43,44,45,46,47,26,11,50,67,52,53,54,55,53,57,58,59,60,61,19,63,60,65,66,67,68,69,70,91,72,73,74,75,76,77,78,79,100,81,82,83,84,85,86,24,88,89,90,91,92,73,94,75,96,97,78,99,100];
var numGames = 10000;
var shortestGameCount = 999999;
var shortestGameNum = 0;
var longestGameCount = 0;
var longestGameNum = 0;
var numRollsDist = [];

var outputHTML = ["<h2>Chutes and Ladders Sim</h2>"];

function rollDice(sides){
  return Math.floor(Math.random() * Math.floor(sides)) + 1;
}

for (var g=1; g<=numGames; g++) {
  outputHTML.push("<h3>GAME: " + g + "</h3>");
  var numRolls = 0;
  var boardPos = 0;
  while (boardPos < 100) {
    numRolls ++;
    numRollsDist[numRolls] = numRollsDist[numRolls] || 0;
    var thisRoll = rollDice(6);
    boardPos += thisRoll;
    if (boardPos > 100) {boardPos = 100; }
    boardPos = boardList[boardPos];
    outputHTML.push(thisRoll + "/" + boardPos + " | ");
  }
  numRollsDist[numRolls] ++;
  outputHTML.push(" <b>|| TOTAL ROLLS: " + numRolls + ".</b>"); 
  if (numRolls > longestGameCount) { longestGameCount = numRolls;  longestGameNum = g;}
  if (numRolls < shortestGameCount) { shortestGameCount = numRolls;  shortestGameNum = g;}
}

outputHTML.splice(1,0,"<b>Longest Game Num/Rolls: " + longestGameNum + "/" + longestGameCount + "</b>");
outputHTML.splice(2,0,"<BR><b>Shortest Game Num/Rolls: " + shortestGameNum + "/" + shortestGameCount + "</b>");

outputHTML.push("<BR><BR>Distribution of number of rolls and wins: <BR>" );

var distC = 0
numRollsDist.forEach(function (e){
  distC ++;
  outputHTML.push("<BR>" + distC + " : " + e);
});

// Launch the server and output the resulting HTML
server(ctx => outputHTML.join(' '));
