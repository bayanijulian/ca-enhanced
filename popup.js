'use strict';

let autoUpdateSwitch = document.getElementById('autoUpdateSwitch');

// this is called once each time the extension is active, requests the status to set the css of the button appropriately
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {method: "getAutoUpdateState"}, function(response) {
    let autoUpdate = false;
    if (response != undefined && response.autoUpdateState != undefined) {
      autoUpdate = response.autoUpdateState;
    }
    toggleAutoUpdate(autoUpdate);
  });  
});

// sends a message to auto-update.js when autoUpdateSwitch is toggled
autoUpdateSwitch.onchange = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "toggleAutoUpdate"}, function(response) {
      let autoUpdate = response.autoUpdateState;
      toggleAutoUpdate(autoUpdate);
    });
  });
};


/**
 * Changes the styling of the autoUpdateSwitch to match if it's on or off
 * @param {boolean} autoUpdate state of auto update button
 */
function toggleAutoUpdate(autoUpdate) {
  autoUpdateSwitch.checked = autoUpdate;
  console.log("auto update toggled");
}