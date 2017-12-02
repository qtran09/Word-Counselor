chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Evaluate Emotion";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
	var sText = info.selectionText;
	//Perform something with text
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://gateway.watsonplatform.net/tone-analyzer/api", true, "eef8b00a-96e3-4460-af7a-7e4a6873e8e7", "3RtHK2OiEx4W"

	//Send the proper header information along with the request
	xhr.setRequestHeader("Content-type", "application/json");

	xhr.onreadystatechange = function() {//Call a function when the state changes.
	    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
	        // Request finished. Do processing here.
	        
	    }
	}
	xhr.send(); 


 //  var xhr = new XMLHttpRequest();
	// xhr.onreadystatechange = handleStateChange;
	// xhr.open("GET", "https://gateway.watsonplatform.net/tone-analyzer/api", true, "eef8b00a-96e3-4460-af7a-7e4a6873e8e7", "3RtHK2OiEx4W");
	// xhr.send();

	// xhr.onreadystatechange = function() {
 //  		if (xhr.readyState == 4) {
	//     // JSON.parse does not evaluate the attacker's scripts.
	//     var resp = JSON.parse(xhr.responseText);

 //  		}
	// };
}