const fs = require("fs");

const blacklisted = require("./blacklist");

let badURL = {
    url: "https://www.twitter.com/"
};

blacklisted.push(badURL);

fs.writeFile("blacklist.json", JSON.stringify(blacklisted), err => {
  if (err) throw err;
  console.log("Successfully wrote to blacklist.");
});
