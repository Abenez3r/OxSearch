// Define the menu item for the context menu
var menuItem = {
    "id": "OxSearch", // Unique identifier for the menu item
    "title": "Search Search the Oxford English Dictionary", // Title displayed in the context menu
    "contexts": ["selection"] // Contexts in which the menu item appears (text selection)
};

// Create the context menu item
chrome.contextMenus.create(menuItem);

// Function to encode URI while preserving square brackets
function fixedEncodeURI(str) {
    return encodeURI(str).replace(/%5B/g, '[').replace(/%5D/g, ']'); // Replace encoded brackets with their literal form
}

// Listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener(function (clickData) {
    // Check if the clicked menu item is "OxSearch" and if there is selected text
    if (clickData.menuItemId == "OxSearch" && clickData.selectionText) {
        var Oxfordurl = "https://www.oed.com/?tl=true" + fixedEncodeURI(clickData.selectionText); // Construct the URL for the Oxford English Dictionary
        chrome.windows.create({
            "url": Oxfordurl, // URL to open in the new window
            "type": "popup", // Specify the window type as a popup
            "top": 5, // Vertical position of the popup
            "left": 5, // Horizontal position of the popup
            "width": Math.round(screen.availWidth / 2), // Set width of the popup to half of the available screen width
            "height": Math.round(screen.availHeight / 2) // Set height of the popup to half of the available screen height
        });
    }
});