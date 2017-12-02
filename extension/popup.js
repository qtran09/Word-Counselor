chrome.runtime.onInstalled.addListener(function()) {
	var context = "selection";
	var title = "Evaluate Emotion";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});  
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function prepareAndSendMessage(emotions){
	var alertString = "We've detected these emotions in your selected text:\n";
	for(x in emotions){
		// console.log(x + " " + emotions[x] * 100);
		alertString += x + ": " + Math.round(emotions[x] * 100) + "%\n";
	}
	window.alert(alertString);
}

function onClickHandler(info, tab) {
	var sText = info.selectionText;
	//Perform something with test
	$.post(
		'https://apiv2.indico.io/emotion',
		JSON.stringify({
			'api_key': "2d3c91cb08abe04e37203439107e5ad6",
			'data': sText,
			'threshold': 0.1
		})
	).then(function(res) {
		var emotionDict = {};
		jsonObject = JSON.parse(res, (key, value) => {
			if(typeof value === "number"){
				emotionDict[key] = value;
			}
		});
		prepareAndSendMessage(emotionDict);
	});
};

function Emotionshow(selectedValue){
	//var x = document.getElementById("mySelect").value;
	document.getElementById("Emotion").innerHTML = selectedValue;
	console.log(selectedValue);
	return selectedValue;
}

