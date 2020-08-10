const fs = require('fs');

const settings = require('./config.json');

function applySettings(){
    //first, we'll change the active time
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;

    settings.start_time = startTime;
    settings.end_time = endTime;

    //second is free-work time ratio
    var freeTime = parseFloat(document.getElementById("free").value);
    var workTime = parseFloat(document.getElementById("work").value);
    
    var freeOverWork = freeTime/workTime;
    settings.free_work_ratio = freeOverWork;

    //now, we're checking for website redirect
    var redirectCheck = document.getElementById("redirectCheck").value;
    settings.redirect = redirectCheck;

    var redirectLink = document.getElementById("redirectURL").value;
    settings.redirectURL = redirectLink;

    //finally, we have allow and blocklist - to be implemented

}

function returnConfig(id){
    return settings[id];
}