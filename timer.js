var i = 0;
var tab;

var burl = "https://www.reddit.com/";

var time = setInterval(timer, 1000);

function stopDistraction(){
  var redir = false;
  chrome.storage.sync.get(['redirCheck'], function(result){
    redir = result.redirCheck;
    chrome.storage.sync.get(['redirURL'], function(result){
      var goodURL = result.redirURL;
      chrome.tabs.query({}, function (tabs) {
        if (tabs != undefined){
          tabs.forEach(function (tab){
            if (tab.url.localeCompare(burl) == 0){
              if (!redir){
                chrome.tabs.remove(parseInt(tab.id));
                console.log("tab has been sent to hell");
              }
              else{
                chrome.tabs.update(tab.id,{url: goodURL});
              }
          }});
        }
      });
    });
  });
}

function timer(){
  chrome.tabs.query({url : burl}, function (tabs){

    if (tabs.length != 0){
      if (i > 0){
        i--;
        console.log(i);
      }
      else{
        stopDistraction();
      }
    }
    else{
      i++;
      console.log(i);
    }
  });
chrome.tabs.query({}, function (tabs){
    if (tabs.length == 0){
      console.log("hi");
      clearInterval(time);
    }
  });
}

function getTimeLeft(){
  return i;
}
