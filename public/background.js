chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.setOptions({
    tabId: tab.id,
    path: 'index.html',
    enabled: true
  });

  chrome.sidePanel.open({ tabId: tab.id })
    .catch((error) => console.error(error));
});