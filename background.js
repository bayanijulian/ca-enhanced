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

let ticketList = [];

//adds message isteners on startup
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("got a message");
    if (request.method== "notifyCountIncrease") {
      console.log("notifyCountIncrease message received");
      notifyCountIncrease(request.countLabel, request.countValue);
      sendResponse();
    } else if (request.method == "autoCompleteTicket") {
      console.log("autoCompleteTicket message received");
      ticketList.push(request.ticketNumber);
      sendResponse();
    }
});

function ticketIsInTitle(popupTitle) {
  for (let i = 0; i < ticketList.length; i++) {
    if (popupTitle.search(ticketList[i]) != -1) {
      return ticketList[i];
    }
  }
  return popupTitle;
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
  console.log("tab updated");
  chrome.tabs.query({windowType:'popup'}, function(tabs) {
    for(let i=0; i < tabs.length; i++) {
      let popup = tabs[i];
      console.log(popup.title);
      let matchesTicket = ticketIsInTitle(popup.title);;
      if (matchesTicket == popup.title) continue;
      let ticketIdx = ticketList.indexOf(matchesTicket);
      ticketList.splice(ticketIdx, 1);
      // chrome.tabs.executeScript(
      //   popup.id,
      //   // works now, make sure ticket num is removed from queue list
      //   {file: 'auto-complete-ticket.js', matchAboutBlank:true});
      // console.log("executes the script!");
      // console.log(ticketList);
      chrome.tabs.sendMessage(tabs[i].id, {
        method: "doAutoCompleteTicket",
        popupTitle: popup.title,
        }, function(response) {
        console.log("doAutoComplete message sent");
        console.log(ticketList + " from response");
      });
      console.log(ticketList +" from outer func");
    }
  });
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