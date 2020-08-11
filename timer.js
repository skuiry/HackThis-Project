var i = 0;
var tab;
bad_url = "https://www.reddit.com/";
var time = setInterval(timer, 1000); 
function timer(){
  chrome.tabs.query({url : bad_url}, function (tabs){

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

function stopDistraction(){
chrome.tabs.query({url : bad_url}, function (tabs) {
	for (var x = 0; x < tabs.length; x++){
		chrome.tabs.remove(parseInt(tabs[x].id));
		console.log("tab has been sent to hell");
	}
	});
}
