function TextScan(){
    var strings = document.getElementById("maintext").value;
    var text = strings.split(" ");
    return text;
}

function getSelectionText(){
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control"){
        text = document.selection.createRange().text;
    }
    wordArr = text.replace(/[^a-zA-Z ]/g,'').split(" ").filter(function(n){ 
        return n != "" 
    });
    return wordArr;
}


function jQueryMain(){
    $.extend({
        GetSynonyms: function(Text){
            console.log("GetSynonyms");
            var synList = [];
            $.ajax({
                url: 'https://wordsapiv1.p.mashape.com/words/'+Text+'/synonyms',
                type: 'get',
                headers: {
                    //If your header name has spaces or any other char not appropriate
                    'X-Mashape-Key': "RBGdikllvBmshXcwx3hyEE5gIwXjp1KJuxZjsnzcGMfpfOq2Vp",   
                    //for object property name, use quoted notation shown in second
                    'X-Mashape-Host': "wordsapiv1.p.mashape.com"  
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
                async: false,
                error: function (xhr, ajaxOptions, thrownError){
                    console.info("Error:"+Text);
                    console.info(thrownError);
                }

            });
            if(typeof synList === 'undefined' || synList.length <= 0)
                console.info("No synonyms found");
            return synList;
        }
    });
    $.extend({
        GetEmotionDict: function(Text){
            console.log("GetEmotionDict");
            $.ajaxSetup({
                async: false
            });

            var jsondict = {};

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
                jsondict = jsono;
            },
            async: false
            });
            //console.log(maxEmotion[0]);
            return jsondict;
            }
        });

    console.log("Search Thesaurus for better words");
    var Texta = getSelectionText();
    if(Texta.length > 1){
        console.log(Texta);
        document.getElementById("RecommendationText").innerHTML = "Please select only one word";
        return;
    }
    Text = Texta[0];
    var Emotion = "joy";
    console.log("word: "+ Text);
    synArr = $.GetSynonyms(Text);
    console.log(synArr);

    emotDict = {};
    for (var k = 0; k < synArr.length; k++) {
        emotval = $.GetEmotionDict(synArr[k])[Emotion];
        emotDict[synArr[k]] = emotval;
    }
    var sortedArr = Object.keys(emotDict).map(function(key) {
        return [key, emotDict[key]];
    });  
    sortedArr.sort(function(first, second) {
        return second[1] - first[1];
    });    

    var recText = "";
    for(var i=0; i<sortedArr.length; i++){
        recText += (sortedArr[i][0] + " ");
    }
    console.log(recText);
    document.getElementById("RecommendationText").innerHTML = recText;
}