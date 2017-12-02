var evaluateEmotion = function(word){
	var query = word.selectionText;
	console.log("query");
}

chrome.contextMenus.create({
	title: "Evaluate emotion",
	contexts:["selection"],
	onclick: evaluateEmotion
});