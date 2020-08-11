
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

    //finally, we have allow and blocklist - to be implemented
  }

function returnConfig(id){
    return settings[id];
}

function addBlocklist(){
  var addLink = document.getElementById("addblock");
  chrome.storage.sync.set(blocklist)

}

function removeBlocklist(){
  var removeLink = document.getElementById("rmblock");

}
