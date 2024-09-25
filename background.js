// Listener for when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Create the context menu item when the extension is installed
  chrome.contextMenus.create({
      "id": "OxSearch", // Unique identifier for the context menu item
      "title": "Search Oxford English Dictionary", // Title displayed in the context menu
      "contexts": ["selection"] // Context in which the menu item is available (text selection)
  });
});

// Listener for when the context menu item is clicked
chrome.contextMenus.onClicked.addListener((clickData) => {
  // Check if the clicked menu item is "OxSearch" and if there is selected text
  if (clickData.menuItemId === "OxSearch" && clickData.selectionText) {
      const query = encodeURIComponent(clickData.selectionText); // Encode the selected text for use in a URL
      const oedUrl = `https://www.oed.com/search?tl=true&q=${query}`; // Construct the search URL for the Oxford English Dictionary

      // Set static dimensions for the popup
      const popupWidth = 800; // Width of the popup window
      const popupHeight = 600; // Height of the popup window

      // Create a new popup window to search the selected word in OED
      chrome.windows.create({
          "url": oedUrl, // URL to open in the new popup window
          "type": "popup", // Specify the window type as a popup
          "width": popupWidth, // Set the width of the popup
          "height": popupHeight // Set the height of the popup
      });
  }
});