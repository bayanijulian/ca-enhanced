let autoUpdate = false;

function update() {
    if (!autoUpdate) return;
    let d = new Date();
    console.log("updating " + d.getSeconds());
    let productFrame = document.getElementsByTagName("frame").product;
    let productDoc = productFrame.contentDocument;

    let innerFrames = productFrame.contentDocument.getElementsByTagName("iframe");
    let inFrame1 = innerFrames.tab_400057.contentDocument;

    let mainFrame = inFrame1.getElementById("role_main");
    let mainDoc = mainFrame.contentDocument;
    let scoreboardFrame = mainDoc.getElementById("scoreboard");
    let scoreboardDoc = scoreboardFrame.contentDocument;
    scoreboardDoc.getElementById("imgBtn0").click();
}

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

let updateIntervalMilliseconds = 1000 * 5;
setInterval(update, updateIntervalMilliseconds);