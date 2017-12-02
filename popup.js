chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Evaluate Emotion";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
  var sText = info.selectionText;
  //Perform something with test
};