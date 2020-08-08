console.log("Minutes spent studying: ");
bad_url = "https://www.reddit.com/";
good_url = "https://www.google.com/";
var i = 0;
function timer(tab){
	if (tab.url.localeCompare(bad_url) == 0){
		if (i > 0){
			i--;
			console.log(i);
		}
		else {
			stopDistraction();
		}
	}
	else{
		console.log(i);
		i++;
	}
	
}

function stopDistraction(){
chrome.tabs.query({url : bad_url }, function (tabs) {
	for (var x = 0; x < tabs.length; x++){
		chrome.tabs.remove(parseInt(tabs[x].id));
		console.log("tab has been sent to hell");
	}
	});
chrome.tabs.create({url: good_url});
}

chrome.tabs.onCreated.addListener(function(tab){var ticktock = setInterval(timer(tab), 3000);});
chrome.tabs.onUpdated.addListener(function(tabID, newTabInfo, tab){var ticktock = setInterval(timer(tab), 3000);});

  