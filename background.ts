chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: 'index.html',
    enabled: true
  });

  chrome.sidePanel.open({ tabId: tab.id ,windowId:tab.windowId})
    .catch((error) => console.error(error));
});
