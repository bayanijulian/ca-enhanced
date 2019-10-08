let autoUpdate = false;

// list of ticket count type data
// label describes the count type
// id is the element id in the scorecard document containing just the ticket count
// value is the last known updated count value
let counts = {
  myTickets: {label: "My Tickets", id: "s1ct", value: -1},
  priority: {label: "Priority", id: "s3ct", value: -1},
  clientUpdated: {label: "Client Updated", id: "s4ct", value: -1},
  unassigned: {label: "Unassigned", id: "s5ct", value: -1}
};

/**
 * CA SDM uses lots of frames and the correct one is chosen. The main document
 * contains the scoreboard and request/incident list/main view.
 */
function getMainDocument() {
  let productFrame = document.getElementsByTagName("frame").product;

  let innerFrames = productFrame.contentDocument.getElementsByTagName("iframe");
  let inFrame1 = innerFrames.tab_400057.contentDocument;

  let mainFrame = inFrame1.getElementById("role_main");
  let mainDoc = mainFrame.contentDocument;

  return mainDoc;
}
/**
 * Gets the scoreboard document to access the ticket counts.
 */
function getScorecardDocument() {
  let mainDoc = getMainDocument();
  let scoreboardFrame = mainDoc.getElementById("scoreboard");
  let scoreboardDoc = scoreboardFrame.contentDocument;
  return scoreboardDoc;
}

/**
 * Clicks on the update button and then calls check counts only if auto update is true
 */
function update() {
    if (!autoUpdate) return;
    let d = new Date();
    console.log("updating " + d.getSeconds());
    let scoreboardDoc = getScorecardDocument();
    scoreboardDoc.getElementById("imgBtn0").click();
    for (countType in counts) {
      checkCount(counts[countType]);
    }
}
/**
 * Updates the count values
 * @param countData countType from gloabl var of counts
 */
function checkCount(countData) {
  let scoreboardDoc = getScorecardDocument();
  let countElement = scoreboardDoc.getElementById(countData.id);
  let currValue = parseInt(countElement.innerText);
  let prevValue = countData.value;
  countData.value = currValue;

  if (prevValue == -1) {
    console.log("Initialized " + countData.label);
    console.log(countData.label + " count is " + currValue);
    return;
  }
  console.log(countData.label + " count is " + currValue);
  if (currValue > prevValue) {
    console.log(countData.label + " has more tickets! Old: " + prevValue + " New: " + currValue);
    triggerNotifyCountIncrease(countData.label, currValue);
  }
}

function triggerNotifyCountIncrease(label, value) {
  chrome.runtime.sendMessage({
    method: "notifyCountIncrease",
    countLabel: label,
    countValue: value
    }, function(response) {
    console.log("notifyCountIncrease message sent");
  });
}

// listens for toggling auto update or requesting status of auto update
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
  if (request.method== "toggleAutoUpdate") {
    autoUpdate = !autoUpdate;
    if (autoUpdate) {
      console.log("Auto Update Enabled");
    } else {
      console.log("Auto Update Disabled");
    }
    sendResponse({autoUpdateState: autoUpdate});
  } else if (request.method == "getAutoUpdateState") {
    sendResponse({autoUpdateState: autoUpdate});
  }
});

// begins the infinite auto update
let updateIntervalMilliseconds = 1000 * 30;
setInterval(update, updateIntervalMilliseconds);