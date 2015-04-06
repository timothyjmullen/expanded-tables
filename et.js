// Variable to track extension status
var onoff = false;
 
function expandTables() {
    if (onoff) {
        // Change icon to default
        chrome.browserAction.setIcon({path:"et.png"});
        // Execute JavaScript that removes the added stylesheet
        chrome.tabs.executeScript({
            code: 'var sheet = document.getElementById("etstyle");' +
                  'document.body.removeChild(sheet);'
        });
    } else { 
        // Change icon to active
        chrome.browserAction.setIcon({path:"etact.png"});
        // Execute JavaScript that creates a style sheet and inserts it into the active page
        chrome.tabs.executeScript({
            code: 'var sheet = document.createElement("style");' +
                  'sheet.setAttribute("id", "etstyle");' +
                  'sheet.innerHTML = "table, td {border: 4px ridge #FFCC99 !important; margin:15px !important;padding:15px !important;border-collapse: collapse !important;width:auto !important;}";' +
                  'if(!document.getElementById("etstyle")) {document.body.appendChild(sheet);}'
        });
    }
    // Toggle status
    onoff = !onoff;
}
 
// Run function if browserAction icon is clicked
chrome.browserAction.onClicked.addListener(expandTables);
// Run function if key command is pressed
chrome.commands.onCommand.addListener(expandTables);
