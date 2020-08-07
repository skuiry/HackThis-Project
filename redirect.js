//redirecting tab urls to a different url

bad_url = "https://www.reddit.com/"
good_url = "https://www.google.com/"

var tabRedirect = function(tab){
    if(tab.url.localeCompare(bad_url) == 0){
        chrome.tabs.update(tab.id, {url: good_url});
        console.log("yo");
    }else{
        console.log(tab.url);
    }
}

chrome.tabs.onCreated.addListener(function(tab){tabRedirect(tab)});
chrome.tabs.onUpdated.addListener(function(tabID, newTabInfo, tab){tabRedirect(tab)});
