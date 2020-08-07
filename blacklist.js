
var fs = require('fs');
  const filePath = "C:\Users\abhig\HackThis-Project\Blacklist.txt";
  let websites = [];
  var prompt = window.prompt("How many websites would you blacklist?:" );

  for(int i = 0; i < prompt; i++){
    websites.push(window.prompt("Enter website #" + i));
  }

  for ( int i = 0; i < websites.length; i++){
      fs.writeFile(filePath, websites[i], function (err) {
          if (err)  {
            throw err;
          }
          console.log('Replaced!');
      });
  }
