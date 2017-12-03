chrome.runtime.onInstalled.addListener(function() {
	var context = "selection";
	var title = "Evaluate Emotion";
	var id = chrome.contextMenus.create({"title": title, "contexts":[context], "id": "context" + context});  
});

chrome.contextMenus.onClicked.addListener(onClickHandler);

function prepareAndSendMessage(emotions, Text){
	$.extend({
		GetSynonyms: function(Text){
			console.log("GetSynonyms");
			var synList = [];
			$.ajax({
			    url: 'https://wordsapiv1.p.mashape.com/words/'+Text+'/synonyms',
			    type: 'get',
			    headers: {
			        'X-Mashape-Key': "RBGdikllvBmshXcwx3hyEE5gIwXjp1KJuxZjsnzcGMfpfOq2Vp",   //If your header name has spaces or any other char not appropriate
			        'X-Mashape-Host': "wordsapiv1.p.mashape.com"  //for object property name, use quoted notation shown in second
			    },
			    success: function (data) {
			    	console.info("data:")
			        console.info(data);
					for (var i = 0; i < data.synonyms.length; i++) {
							synList.push(data.synonyms[i]);
					}
					console.info("synlist:");
					console.info(synList)
			    },
			    async: false
			});
			if(typeof synList === 'undefined' || synList.length <= 0)
				console.info("No synonyms found");
			return synList;
		}
	});
	$.extend({
		GetMaxWordEmotion: function(Text){
			console.log("GetMaxWordEmotion");
			$.ajaxSetup({
		    async: false
		    });

		    var maxEmotion = ["test",0];

		    $.ajax({
			    url: 'https://apiv2.indico.io/emotion',
			    type: 'post',
			    data: JSON.stringify({
			    	'api_key': "2d3c91cb08abe04e37203439107e5ad6",
			    	'threshold': 0.1,
			    	'data' : Text
			    }),
			    // headers: {
			    //     'api_key': "2d3c91cb08abe04e37203439107e5ad6",
			    //     'threshold': 0.1
			    // },
			    success: function (data) {
			    	//console.info(data);
					jsono = JSON.parse(data);
			    	console.info(jsono);
			    	for (var emot in jsono.results) {
			    		//console.info("spinmax");
			    		//console.info(emot);
						if(jsono.results[emot] > maxEmotion[1]){
							maxEmotion[1] = jsono.results[emot];
							maxEmotion[0] = emot;
						}
					}

			    },
			    async: false
			});
			//console.log(maxEmotion[0]);
			return maxEmotion[0];
		}
	});

	var alertString = "We've detected these emotions in your selected text:\n";
	for(x in emotions){
		// console.log(x + " " + emotions[x] * 100);
		alertString += x + ": " + Math.round(emotions[x] * 100) + "%\n";
	}
	var emotion = "joy";

	console.log("Text:"+Text);
	wordArr = Text.replace(/\W/g,'').split(" ");
	console.log("AfterParse:")
	console.log(wordArr);
	for (var i = 0; i < wordArr.length; i++) {
		//console.log("Spin");
		console.log("Search Thesaurus for better words");
		console.log("word: "+ wordArr[i])
		synArr = $.GetSynonyms(wordArr[i]);
		console.log(synArr);

		for (var k = 0; k < synArr.length; k++) {
			//console.log("spin2");
			maxE = $.GetMaxWordEmotion(synArr[k])
			console.log("maxE:"+maxE);
			if(maxE == emotion){
				console.log("Suggested: |" + synArr[k] + "| instead of |" + wordArr[i] + "|");
			}
		}
		
	}
	console.log(alertString);


}

function onClickHandler(info, tab) {
	$.ajaxSetup({
    async: false
    });
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
		console.log("click"+sText)
		var emotionDict = {};
		jsonObject = JSON.parse(res, (key, value) => {
			if(typeof value === "number"){
				emotionDict[key] = value;
			}
		});
		prepareAndSendMessage(emotionDict, sText);
	});
};

function Emotionshow(selectedValue){
	alert(selectedValue.text);
}
