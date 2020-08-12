var blocklist = [];
var i = 0;
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
  var add = document.getElementById("addblock").value;
  if (i == 0){
    blocklist.push(add);
    chrome.storage.local.set({
      list: blocklist
    }, function(){
      console.log(add + " got added to the blocklist!");
      //console.log(data.list);
    })
    i++;
  }
  else{
    chrome.storage.local.get({
      list:[]
    }, function(data){
      console.log(data.list);
      update(data.list, add);
    }
  );
  }
  /*var add = document.getElementById("addblock").value;
  console.log(add);
  chrome.storage.sync.get({
    list:blocklist
  }, function(data){
  blocklist.push(add);
  chrome.storage.sync.set({
    list:blocklist
  }, function(){
    console.log("something got added who gives a dum");
  });
});
  /* chrome.storage.sync.set({
    blist: blocklist
  },function(){
    console.log(add + " has been added to the blocklist!");
    list.forEach(console.log);

  });*/
  //blocklist.forEach(console.log);
}

function getBlocklist(){
  chrome.storage.local.get({
    list:blocklist
  }, function(){
    blocklist.forEach(console.log);
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
  var removeLink = document.getElementById("rmblock");
}

document.addEventListener("DOMContentLoaded", function(){
  console.log("page loaded");
  var link = document.getElementById("add");
  link.addEventListener("click", function(){
    addBlocklist();
  })
  var link2 = document.getElementById("get");
  link2.addEventListener("click", function(){
    getBlocklist();
  })
});
