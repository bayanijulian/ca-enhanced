'use strict';

let uiuc_orange = [232.0/255.0, 74.0/255.0, 39.0/255.0, 1.0];
let uiuc_blue = [19.0/255.0, 41.0/255.0, 75.0/255.0, 1.0];

//adds rules for declarative content on install
chrome.runtime.onInstalled.addListener(function() {
  // listens for when the current tab is on CA SDM to display the GUI
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'support.uillinois.edu'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });

 
});
//adds message isteners on startup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("got a message");
    if (request.method== "notifyCountIncrease") {
      console.log("notifyCountIncrease message received");
      notifyCountIncrease(request.countLabel, request.countValue);
      sendResponse();
    } 
});

chrome.runtime.onStartup.addListener(function(){
   console.log("extension start up");
   
});


function notifyCountIncrease(label, value) {
  let displayMessage = label + " has " + value + " tickets.";
  if (value == 1) {
    displayMessage = label + " has one ticket.";
  }

  chrome.notifications.create(label, {
    type: 'basic',
    iconUrl:'images/ca_enhanced128.png',
    title: label,
    message: displayMessage
  });
}