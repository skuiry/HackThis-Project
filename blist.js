const fs = require("fs");
const blocklistJSON = require("./blocklist.json");

var blocklist = blocklistJSON.blocklist;

function addBlock(url){
  blocklist.push(url);
  blocklistJSON.blocklist = blocklist;
}

function removeBlock(url){
  var index = blocklist.indexOf(url);
  if(index != -1){
    blocklist.splice(index, 1);
  }
}

function containsBlock(url){
  var index = blocklist.indexOf(url);
  return (index == -1);
}

function write(){
  fs.writeFile("blocklist.json", JSON.stringify(blocklistJSON), err => {
    if (err) throw err;
    console.log("Successfully wrote to blocklist.");
  });
}