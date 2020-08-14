function applySettings(){
    //first, we'll change the active time
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;

    //second is free-work time ratio
    var freeTime = parseFloat(document.getElementById("free").value);
    var workTime = parseFloat(document.getElementById("work").value);

    var freeOverWork = workTime/freeTime;

    //now, we're checking for website redirect
    var redirectCheck = document.getElementById("redirectCheck").checked;

    var redirectLink = document.getElementById("redirectURL").value;
    redirectLink = "https://www." + redirectLink + "/";

    chrome.storage.sync.set({['start']: startTime, ['end']: endTime, ['ratio']: freeOverWork, ['redirCheck']: redirectCheck, ['redirURL']: redirectLink});
    chrome.storage.sync.get(['redirCheck'], function (result){
      console.log(typeof result.redirCheck);
    });
    console.log("Settings saved!");
    //finally, we have allow and blocklist - to be implemented
  }

function addBlocklist(){
  var add = document.getElementById("addblock").value;
  chrome.storage.sync.get(['list'], function(data){
      update(data.list, add);
      console.log(data.list);
      updateDisplay();
  });
  console.log(document.getElementById("redirectCheck").checked);
}

function update(array, link){
  var newLink = "*://*." + link + "/*";
  array.push(newLink);
  chrome.storage.sync.set({
    list:array
  }, function (){
    console.log("updated the blocklist!");
  });
}

function removeBlocklist(){
  var removeLink = document.getElementById("rmblock").value;
  chrome.storage.sync.get(['list'], function(result){
    //parse thru result.list to find removelink and mathc it
    var index = result.list.indexOf(removeLink);
    if (index != -1){
      result.list.splice(index,1);
      console.log(removeLink + " has been removed!");
      chrome.storage.sync.set({list:result.list});
      updateDisplay();
    }
    else{
      alert("That URL is not present in the blocklist!");
    }
  });

}

function storageCheck(){
  chrome.storage.sync.get(['list'], function(result){
    if (result.list == undefined){
      chrome.storage.sync.set({list: []});
    }
    console.log(result.list);
  });
  chrome.storage.sync.get(['start'], function(result){
    if (result.start == undefined){
      chrome.storage.sync.set({start: 12});
    }
    console.log(result.start);
  });
  chrome.storage.sync.get(['end'], function(result){
    if (result.end == undefined){
      chrome.storage.sync.set({end: 0});
    }
    console.log(result.end);
  });
  chrome.storage.sync.get(['ratio'], function(result){
    if (result.ratio == undefined){
      chrome.storage.sync.set({ratio: 5});
    }
    console.log(result.work);
  });
  chrome.storage.sync.get(['redirCheck'], function(result){
    if (result.redirCheck == undefined){
      chrome.storage.sync.set({redirCheck: false});
    }
    console.log(result.redirCheck);
  });
  chrome.storage.sync.get(['redirURL'], function(result){
    if (result.redirURL == undefined){
      chrome.storage.sync.set({redirURL: "https://www.google.com/"});
    }
    console.log(result.redirURL);
  });
}

function updateDisplay(){
  chrome.storage.sync.get(['list'], function(result){
  document.getElementById("display").innerHTML = result.list;
  });
  chrome.storage.sync.get(['redirURL'], function(result){
    document.getElementById("url").innerHTML = result.redirURL;
  });
}

function clearBlocklist(){
  chrome.storage.sync.set({['list']: []}, function(result){
    console.log("Cleared the blocklist!");
  });
  updateDisplay();
}
document.addEventListener("DOMContentLoaded", function(){
  console.log("page loaded");

  storageCheck();
  updateDisplay();
  var link = document.getElementById("add");
  link.addEventListener("click", addBlocklist);
  var link2 = document.getElementById("remove");
  link2.addEventListener("click", removeBlocklist);
  var link3 = document.getElementById("removeAll");
  link3.addEventListener("click", clearBlocklist)
  var link4 = document.getElementById("apply");
  link4.addEventListener("click", applySettings);
});
