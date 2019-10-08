// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let btnAutoUpdate = document.getElementById('btnAutoUpdate');


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {method: "getAutoUpdateState"}, function(response) {
    let autoUpdate = response.autoUpdateState;
    toggleAutoUpdate(autoUpdate);
  });  
});

btnAutoUpdate.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {method: "toggleAutoUpdate"}, function(response) {
      let autoUpdate = response.autoUpdateState;
      toggleAutoUpdate(autoUpdate);
    });
  });
};



function toggleAutoUpdate(autoUpdate) {
  if (autoUpdate) {
    btnAutoUpdate.setAttribute("class", "btn btn-success");
    btnAutoUpdate.innerText = "Auto Update On";
  } else {
    btnAutoUpdate.setAttribute("class", "btn btn-danger");
    btnAutoUpdate.innerText= "Auto Update Off";
  }
  console.log("auto update toggled");
}