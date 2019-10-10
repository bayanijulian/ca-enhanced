// Pop up functions used below

function getTicketDiv() {
    let ticketPopupFrame = document.getElementsByName("cai_main")[0];
    let ticketPopupDoc = ticketPopupFrame.contentDocument;
    let ticketDiv = ticketPopupDoc.getElementById("scrollbarDiv0");
    return ticketDiv;
}

function getTicketHeaderRow() {
    let ticketDiv = getTicketDiv();
    let ticketContents = ticketDiv.querySelector("#scrollbarDiv1");
    let ticketHeaderRow = ticketContents.querySelector("#dtltbl0");
    return ticketHeaderRow;
}

function getTicketDetailRow() {
    let ticketDiv = getTicketDiv();
    let ticketContents = ticketDiv.querySelector("#scrollbarDiv1");
    let ticketDetailRow = ticketContents.querySelector("#dtltbl2");
    return ticketDetailRow;
}

function getTicketSummaryRow() {
    let ticketDiv = getTicketDiv();
    let ticketContents = ticketDiv.querySelector("#scrollbarDiv1");
    let ticketSummaryRow = ticketContents.querySelector("#dtltbl4"); 
    // the below will get you description input element
    //let descriptionInput = ticketSummaryRow.querySelector("#df_5_0");
    return ticketSummaryRow;
}


function getSummaryText() {
    let ticketSummaryRow = getTicketSummaryRow();
    let summaryInput = ticketSummaryRow.querySelector("#df_4_0");
    // if not editing, there's no value input, it's in a td tag
    let summaryText = summaryInput.value;
    //let summaryText = summaryInput.innerText;
    return summaryText;
}

function getNetID() {
    let summaryText = getSummaryText();
    let summarySplit = summaryText.split(" ");
    let netID = summarySplit[summarySplit.length - 1];
    netID = netID.replace("(","").replace(")","");
    return netID;
}

function clickEdit() {
    let ticketDiv = getTicketDiv();
    let ticketControls = ticketDiv.querySelector("div").querySelector("tr td").nextElementSibling;
    let editBtn = ticketControls.querySelector("a");
    editBtn.click();
}

function fillNetID(netID) {
    let ticketHeaderRow = getTicketHeaderRow();
    let netidInput = ticketHeaderRow.querySelector("#df_0_0");
    netidInput.value = "\\" + netID;
    netidInput.dispatchEvent(new Event("change"));
}
function fillWorkTypeInfo() {
    let ticketHeaderRow = getTicketHeaderRow();
    let workTypeInput = ticketHeaderRow.querySelector("#df_0_3");
    const informationWorkTypeVal = "400004";
    workTypeInput.value = informationWorkTypeVal;
}

function fillStatusClosed() {
    let ticketHeaderRow = getTicketHeaderRow();
    let statusInput = ticketHeaderRow.querySelector("#df_0_4");
    const resolvedStatusVal = "CL";
    statusInput.value = resolvedStatusVal;
}

function fillKB(kbNum) {
    let ticketDetailRow = getTicketDetailRow();
    let kbInput = ticketDetailRow.querySelector("#df_2_3");
    kbInput.value = kbNum;
}

function closePasswordScramble() {
    clickEdit();
    let ticketPopupFrame = document.getElementsByName("cai_main")[0]; //query("frame[title=Main]")
    ticketPopupFrame.addEventListener("load", function doFill(){
        ticketPopupFrame.removeEventListener("load", doFill);
        console.log("page fully loaded");
        let netID = getNetID();
        fillNetID(netID);
        fillWorkTypeInfo();
        fillStatusClosed();
        const passwordScrambleKBNum = "48269";
        fillKB(passwordScrambleKBNum);
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("got a message");
      console.log(document.title);
      if (request.method== "doAutoCompleteTicket" && request.popupTitle == document.title) {
        console.log("autocompleting");
        doAutoComplete();
        sendResponse();
      } 
  });

function doAutoComplete() {
    let popupFrame = document.getElementsByName("cai_main")[0];
    popupFrame.addEventListener("load", function afterLoad() {
        popupFrame.removeEventListener("load", afterLoad);
    closePasswordScramble();
});
}

/*
,
        {
            "matches":["https://support.uillinois.edu/CAisd/html/popup_frames.html?POPUP_URLIX=0+popupType=1"],
            "js":["auto-complete-ticket.js"],
            "matchAboutBlank":true
        }
*/