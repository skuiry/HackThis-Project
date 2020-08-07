//redirecting tab urls to a different url

bad_url = "https://www.reddit.com"
good_url = "https://www.google.com"

chrome.tabs.onCreated.addListener(function (tab){
    if(tab.url == bad_url){
        chrome.tabs.update(tab.id, {url: good_url});
    }
});
//chrome.tabs.onUpdated.addListener();