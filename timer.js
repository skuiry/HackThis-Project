var i = 0;
var time;
var burl;
chrome.storage.sync.get(['list'], function(result){
  burl = result.list;
})

var ratio;
chrome.storage.sync.get(['ratio'], function(result){
  ratio = result.ratio;
})

var startTime,endTime;
chrome.storage.sync.get(['start'], function (result){
  startTime = result.start;
  console.log(startTime);
  chrome.storage.sync.get(['end'], function (result){
  endTime = result.end;
  console.log(endTime);
  var d = new Date();
  var n  = d.getHours();
  console.log(n);
  if (n >= startTime && n < endTime){
    time = setInterval(timer, 1000);
  }
  else{
    clearInterval(time);
  }
  });
});

function checkTime(){
if (!(n >= startTime && n < endTime))
  clearInterval(time);
}

function stopDistraction(){
  var redir = false;
  chrome.storage.sync.get(['redirCheck'], function(result){
    redir = result.redirCheck;
    chrome.storage.sync.get(['redirURL'], function(result){
      var goodURL = result.redirURL;
      chrome.tabs.query({url:burl}, function (tabs) {
        if (tabs != undefined){
          tabs.forEach(function (tab){
              if (!redir){
                chrome.tabs.remove(parseInt(tab.id));
                console.log("tab has been sent to hell");
              }
              else{
                chrome.tabs.update(tab.id,{url: goodURL});
              }
        });
        }
      });
    });
  });
}

function timer(){
  chrome.tabs.query({url : burl}, function (tabs){
    if (tabs != undefined){
    if (tabs.length != 0){
      if (i > 0){
        i -= ratio;
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
  }
});
try{
  updateTime();
  checkTime();
}
catch (error){
  console.log("Settings page isn't opened currently!");
}

chrome.tabs.query({}, function (tabs){
    if (tabs.length == 0 ){
      console.log("Closing program...");
      clearInterval(time);
    }
  });
}

function updateTime(){
  document.getElementById("mins").innerHTML = i/(ratio * 60);
}
