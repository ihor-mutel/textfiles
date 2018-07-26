// entry point checkDictionary(text, true)
// YouTube iPlayerElementName = '#player-container'
// YouTube togglePlayButtonName =  '.ytp-play-button'
// OpenLoad iPlayerElementName = '#mediaspace_wrapper'

var dictionaryLink = "https://rawgit.com/web1991t/textfiles/master/DICTIONARY_chat_415092182.json"
var iPlayerElementName;
var togglePlayButtonName;
var togglePlayState;
var iCurrentSubs;
var dictionary;
var iSubtitlesElementName;
var jQueryiSubtitlesElementName;
	
if(hrefCheck("youtube.com")){
	iPlayerElementName = '#player-container';
	iSubtitlesElementName  = 'caption-window' 
	jQueryiSubtitlesElementName = "." + iSubtitlesElementName
	init();
		
} else if (hrefCheck("oload.download") || hrefCheck("openload.co")){
	iPlayerElementName = '#mediaspace_wrapper';
	iSubtitlesElementName  = 'vjs-text-track-display' 
	jQueryiSubtitlesElementName = "." + iSubtitlesElementName
	
	init();
}

// else if (hrefCheck("hdeuropix.com")){
	// iPlayerElementName = '#mediaspace_wrapper';
	// iSubtitlesElementName  = 'vjs-text-track-display' 
	// jQueryiSubtitlesElementName = "." + iSubtitlesElementName
	
	// init();
// }
	
// check location 
function hrefCheck(currentLocation){
	if(window.location.href.includes(currentLocation)){
		console.log("Applying script for: " + currentLocation)
		return true;
	}
	else{
		return false;
	}
}	

	
// add jQuery

function addjQuery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script)
    console.log("jquery added");
}

// Add subtitle interceptor

function addSubtitleInterceptor(){
	$(document).on('DOMNodeInserted', function(e) {
		//console.log(e.target);
		if ( $(e.target).hasClass(iSubtitlesElementName) ) {
			$(jQueryiSubtitlesElementName).hide();
						
			
			$(jQueryiSubtitlesElementName)[0].addEventListener('DOMSubtreeModified', function () {
				var tempSubs = $(jQueryiSubtitlesElementName).text();
				var iCurrentSubsBoolean = iCurrentSubs ? iCurrentSubs.trim() : false
				
				if(tempSubs.trim() != iCurrentSubsBoolean && tempSubs.trim() != ""){
					iCurrentSubs = tempSubs;
					//console.log(iCurrentSubs);
					checkDictionary(iCurrentSubs, true)
				}

			});
			
		}
		
		if(!$(jQueryiSubtitlesElementName).length && $(".iBlock").length) {
			    $(".iBlock")[0].style.display = "none";
				console.log("Remove iBlock")
		}
		
	});
	console.log("Subtile interceptor added")
};

// get dictionary

function getRemoteDictionary() {
	try{
		$.getJSON(dictionaryLink, function(data) {
			if (!localStorage.dictionary) {
				console.log("USE REMOTE DICTIONARY")
				dictionary = data;
				setStorageDictionary(dictionary);
			}
			console.log("Dictionary was downloaded");
			console.log(data.length);
		});
	} catch(err){
		console.log(err);
	}
	
    if (localStorage.dictionary) {
        dictionary = getLocalStorageDictionary();
        console.log("USE LOCAL DICTIONARY");
    } 

}

// local storage operations

function setStorageDictionary(dictionary) {
    //console.log("save to local storage")
    localStorage.setItem('dictionary', JSON.stringify(dictionary));
}

function getLocalStorageDictionary() {
    //console.log("get from local storage")
    var retrievedObject = localStorage.getItem('dictionary');
    return JSON.parse(retrievedObject);
}



// show subtitles

function showSubtitles(word) {

    var iblock = document.getElementsByClassName('iblock');

    while (iblock[0]) {
        iblock[0].parentNode.removeChild(iblock[0]);
    }

    var iSub = document.createElement('div');
    //var iPlayer = document.getElementById('player-container')

    iSub.id = 'iblock';
    iSub.className = 'iblock';
    iSub.innerText = word;
    iSub.style.position = "absolute";
    iSub.style.zIndex = "2147483647";
    iSub.style.color = "white";
    iSub.style.display = "block";
    iSub.style.fontFamily = "Roboto, Arial, sans-serif";
    iSub.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    iSub.style.textAlign = "center";
    // iSub.style.left = (iPlayerContainer.css('width').replace("px","") / 4.7) + "px";


    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        //console.log(window.innerWidth)
        iSub.style.width = screen.width + "px";
        iSub.style.left = 0;
        iSub.style.top = (screen.height / 1.38) + "px";
        //console.log("You entered fullscreen");
        iSub.style.fontSize = "24px";
        // iSub.style.fontSize = ($(iPlayerElementName).css('height').replace("px", "") / 25) + "px";
    } else {
        iSub.style.left = 0;
        iSub.style.width = $(iPlayerElementName).css('width');
        iSub.style.top = ($(iPlayerElementName).css('height').replace("px", "") / 1.38) + "px";
        // iSub.style.fontSize = ($(iPlayerElementName).css('height').replace("px", "") / 25) + "px";
        iSub.style.fontSize = "1.5em";
    }



    $(iPlayerElementName)[0].appendChild(iSub);
    addClickListener();
    addMouseenterListener();
}

// configure toggle button

function togglePlayButton() {
    if (togglePlayState === false) {
        togglePlayState = true;
        $(togglePlayButtonName).click()
    } else {
        togglePlayState = true;
        $(togglePlayButtonName).click()
    }
}

function addMouseenterListener() {
    if (togglePlayButtonName) {
        togglePlayState = false;

        $('#iblock').mouseenter(function() {
            togglePlayButton();
        });
        $('#iblock').mouseout(function() {
            togglePlayButton();
        });
    }
}

// check selection

function addClickListener() {
    $("#iblock").click(function(event) {
        var text = getSelectionText().trim().replace(/ /g, '+');
        if (text != '') {
            //console.log(encodeURIComponent(text));
            $.ajax('https://json2jsonp.com/?url=https://api.lingualeo.com/gettranslates?word=' + encodeURIComponent(text), {
                contentType: 'application/json',
                dataType: 'jsonp',
                success: function(data) {
                    //console.log(data);
                    toggleDictionary(data, text);
                }
            })
        }
    });

}

// convert translation object into string

function cleanTranslations(data) {
    var translation = ""
    for (var i = 0; i < data.translate.length; i++) {

        translation += "," + data.translate[i].value.trim();

    }
    var translations = translation.split(",")

    var uniqueTranslations = [];
    $.each(translations, function(i, el) {
        if ($.inArray(el.trim(), uniqueTranslations) === -1) uniqueTranslations.push(el.trim());
    });

    uniqueTranslations.clean("")

    uniqueTranslations.sort(function(a, b) {
        return b.length - a.length;
    });

    uniqueTranslations.sort(function(a, b) {
        return a.length - b.length;
    });
    uniqueTranslations = uniqueTranslations.slice(0, 3);
    return uniqueTranslations
}

// add or delete word from dictionary

function toggleDictionary(data, word) {
    if (checkWord(word)) {
        var element = checkWord(word);
        // debugger;
        var index = dictionary.indexOf(element);
        dictionary.splice(index, 1);
        //console.log("Remove from dictionary index: " + index);
        checkDictionary(iCurrentSubs, false);
        setStorageDictionary(dictionary);
        return
    }
    var translation = {
        word: word,
        translation: cleanTranslations(data)
    }
    //console.log("add into dictionary")
    //console.log(translation);
    dictionary.push(translation);
    checkDictionary(iCurrentSubs, false);
    setStorageDictionary(dictionary);
}

// get selected text

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text.replaceAll(/[^A-Za-z\s\'\-]/, "");
    }
    return text;
}

// check if word in dictionary

function checkDictionary(word, firstCall) {
    if (firstCall) {
        // debugger;
        //console.log("=======CHANGE iCURRENT SUBS=======")
        //console.log(word)
        iCurrentSubs = word
    }

    var wordsArray = word.replaceAll("\n", " ").replaceAll(/[^A-Za-z\s\'\-]/, "").split(" ")
    for (var i = 0; i < wordsArray.length; i++) {
        var entry = checkWord(wordsArray[i]);
        // debugger;
        if (entry) {
            var translation = entry.translation
            var translationMessage = "\n" + wordsArray[i].toUpperCase() + ": " + translation;
            if (!word.includes(translationMessage)) {
                console.log(word)
                console.log("Replace with: " + translation)
                var upperCaseWord = word.replaceAll(wordsArray[i], wordsArray[i].toUpperCase());
                word = upperCaseWord + translationMessage;
            }

        }
    }
    showSubtitles(word)
    //return word
};

function checkWord(word) {
    // debugger;
    for (var i = 0; i < dictionary.length; i++) {
        if (dictionary[i].word.trim().toLowerCase() == word.trim().toLowerCase()) {
            return (dictionary[i])
        }
    }
}


String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

Array.prototype.clean = function(deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

function init(){
	if (!window.jQuery) {
			addjQuery();
	}
	
	try {
		if(!dictionary){
		getRemoteDictionary();
		}
	} catch (err) {
		console.log(err);

		
		setTimeout(function(){ getRemoteDictionary();
		}, 1000);
	}

	try{
		addSubtitleInterceptor();
	}catch(err){
		setTimeout(function(){ addSubtitleInterceptor();
		}, 1000);
	}
}


