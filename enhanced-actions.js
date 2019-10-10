'use strict';

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

function getTicketListDocument() {
    let mainDoc = getMainDocument();
    let ticketListFrame = mainDoc.getElementById("cai_main"); 
    let ticketListDoc = ticketListFrame.contentDocument;
    return ticketListDoc;
}

function isPasswordScrambleTicket(ticket) {
    let summarySearch = "Password Scrambled - PLEASE FOLLOW KB";
    let matches = false;
    ticket.querySelectorAll("td").forEach(function(col){
        let colText = col.innerText;
        if (col.innerText == undefined) return;
        let found = colText.search(summarySearch);
        if (found != -1) {
            matches = true;
        }
    });
    return matches;
}

function createBtn(ticket) {    
    let btn = document.createElement("a");
    btn.innerText = "Quick Close";
    btn.addEventListener("click", function(){
        clickTicket(ticket);
    });
    let actionCol = ticket.querySelector("td");
    actionCol.append(btn);
}
/**
 * Adds a column to the table for enhanced actions
 */
function addEnhancedActions() {
    let ticketListDoc = getTicketListDocument();
    let ticketTable = ticketListDoc.querySelector("#dataGrid");
    //header row
    let headerRow = ticketTable.querySelector("thead tr");
    let firstColTxt = headerRow.querySelector("th").innerText;
    if (firstColTxt == "Actions") return; //skip if actions have been loaded already

    let th = document.createElement("th");
    th.setAttribute("scope", "col");
    th.setAttribute("colspan", "1");
    th.setAttribute("class", "ui-state-default ui-th-column ui-th-ltr");
    th.innerHTML = "<p class=table_column_header_text>Actions</p>";
    headerRow.prepend(th);
    // weird spacer row in CA
    let spacerRow = ticketTable.querySelector("tbody tr");
    let spacerTD = document.createElement("td");
    spacerTD.setAttribute("style", "height: 0px;");
    spacerRow.prepend(spacerTD);
    // ticket rows
    

    ticketTable.querySelectorAll("tbody tr[id]").forEach(function(ticket){
        let actionTD = document.createElement("td");
        ticket.prepend(actionTD);
        if (isPasswordScrambleTicket(ticket)) {
            createBtn(ticket);
        }
    });
}

function getTicketInTable(idx) {
    let ticketListDoc = getTicketListDocument();
    let ticketTable = ticketListDoc.querySelector("#dataGrid");
    return ticketTable.querySelectorAll("tbody tr[id]")[idx-1];
}
function getTicketCol(ticket, idx) {
    return ticket.querySelectorAll("td")[idx - 1];
}

function clickTicket(ticket) {
    let requestNumber = ticket.querySelectorAll("td")[1].innerText;
    console.log("request " + requestNumber + " clicked");
    chrome.runtime.sendMessage({
        method:"autoCompleteTicket", 
        ticketNumber:requestNumber
        }, 
        function (){
            console.log("autocomplete message sent");
    });

    let requestLink = ticket.querySelector("a[id]");
    requestLink.focus();
    requestLink.click();
}

addEnhancedActions();

// pop up url is https://support.uillinois.edu/CAisd/html/popup_frames.html
// https://developer.chrome.com/extensions/content_scripts#declaratively
// look at in the above link match_about_blank for pop ups
// no good above

