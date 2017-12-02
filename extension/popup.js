chrome.runtime.onInstalled.addListener(function() {
	var context = "selection";
	var title = "Evaluate Emotion";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});  
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function prepareAndSendMessage(emotions, Text){
	var alertString = "We've detected these emotions in your selected text:\n";
	for(x in emotions){
		// console.log(x + " " + emotions[x] * 100);
		alertString += x + ": " + Math.round(emotions[x] * 100) + "%\n";
	}
	var recommend = prompt("Anger, Joy, Fear, Sadness, Surprise", "Your requested emotion");
	var txt;
	var emotion;

	wordArr = [];
	wordArr = Text.replace(/\W/g, '').split(" ");
	for(word in wordArr){
		if(GetMaxWordEmotion(word) != emotion){
			console.log("Search Thesaurus for better words");
		}
	}
	console.log(alertString);


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
		prepareAndSendMessage(emotionDict, sText);
	});
};


function GetMaxWordEmotion(Text){
	$.post(
		'https://apiv2.indico.io/emotion',
		JSON.stringify({
			'api_key': "2d3c91cb08abe04e37203439107e5ad6",
			'data': Text,
			'threshold': 0.1
		})
	).then(function(res) {
		var emotionDict = {};
		jsonObject = JSON.parse(res, (key, value) => {
			if(typeof value === "number"){
				emotionDict[key] = value;
			}
		});
		var maxEmotion = [0,emotions[0]];
		for(x in emotions){
		// console.log(x + " " + emotions[x] * 100);
			if(emotions[x] > maxEmotion)
				maxEmotion[0] = x
				maxEmotion[1] = emotions[x];
		}
		return maxEmotion;
	});

}
