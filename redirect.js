//redirecting tab urls to a different url

bad_url = "https://www.reddit.com/"
good_url = "https://www.google.com/"

var urlStrip = function(url){
    url.replace('https://', '');
    url = url.split('/')[0];
}

var tabRedirect = function(tab){
    var url = tab.url;
    urlStrip(url);
    if(url.localeCompare(bad_url) == 0){
        chrome.tabs.update(tab.id, {url: good_url});
        console.log("yo");
    }else{
        console.log(url);
    }
}
function addtwoandtwo(){
  console.log(2+2);
}
chrome.tabs.onCreated.addListener(function(tab){tabRedirect(tab)});
chrome.tabs.onUpdated.addListener(function(tabID, newTabInfo, tab){tabRedirect(tab)});
