function applySettings(){
    //first, we'll change the active time
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;

    //second is free-work time ratio
    var freeTime = parseFloat(document.getElementById("free").value);
    var workTime = parseFloat(document.getElementById("work").value);

    var freeOverWork = freeTime/workTime;

    //now, we're checking for website redirect
    var redirectCheck = document.getElementById("redirectCheck").value;

    var redirectLink = document.getElementById("redirectURL").value;

    chrome.storage.sync.set({['start']: startTime, ['end']: endTime, ['ratio']: freeOverWork, ['redirCheck']: redirectCheck, ['redirURL']: redirectLink});
    //finally, we have allow and blocklist - to be implemented
  }

function returnConfig(id){
    return settings[id];
}

function addBlocklist(){
  var add = document.getElementById("addblock").value;
  chrome.storage.sync.get(['list'], function(data){
      update(data.list, add);
      console.log(data.list);
      updateDisplay();
  });
}

function update(array, link){
  array.push(link);
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
    if (typeof result.list == "undefined"){
      chrome.storage.sync.set({list: []});
    }
    console.log(result.list);
  });
  chrome.storage.sync.get(['start'], function(result){
    if (typeof result.start == "undefined"){
      chrome.storage.sync.set({start: 12});
    }
    console.log(result.start);
  });
  chrome.storage.sync.get(['end'], function(result){
    if (typeof result.end == "undefined"){
      chrome.storage.sync.set({end: 0});
    }
    console.log(result.end);
  });
  chrome.storage.sync.get(['ratio'], function(result){
    if (typeof result.ratio == "undefined"){
      chrome.storage.sync.set({ratio: 0.5});
    }
    console.log(result.work);
  });
  chrome.storage.sync.get(['redirCheck'], function(result){
    if (typeof result.redirCheck == "undefined"){
      chrome.storage.sync.set({redirCheck: "0"});
    }
    console.log(result.redirCheck);
  });
  chrome.storage.sync.get(['redirURL'], function(result){
    if (typeof result.redirURL == "undefined"){
      chrome.storage.sync.set({redirURL: "google.com"});
    }
    console.log(result.redirURL);
  });
}

function updateDisplay(){
  chrome.storage.sync.get(['list'], function(result){
    /*for (var x = 0; x < result.list.length; x++){
      i += result.list[x].toString() + ",\n";
    }*/

  //});
  document.getElementById("display").innerHTML = result.list;
  });
}

document.addEventListener("DOMContentLoaded", function(){
  console.log("page loaded");
  storageCheck();
  updateDisplay();
  var link = document.getElementById("add");
  link.addEventListener("click", addBlocklist);
  var link3 = document.getElementById("remove");
  link3.addEventListener("click", removeBlocklist);
});
