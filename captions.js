// entry point checkDictionary(text, true)
// autossh -L 8182:localhost:8182 mutel@riversoft.biz -p 4021
var iDictionaryLink; // remote dictionary link
var iPlayerElementName; // player container class name 
var iTogglePlayButtonName; // pause and play button class name 
var iSubtitlesElementName; // original subtitles element class name
var iPlayerName; // player name
var iDelayerOn; // pause subtitles with translation (true/false)
var iDelayerTime; // pause subtitles with translation time seconds
var iDictionaryId; // id of remote neo-english dictionary
var iSubtitlesElementNamejQuery;
var iEventAttachedBool;
var iCurrentHref;
var iTogglePlayState;
var iCurrentSubs;
var iOriginalForm;
var dictionary;
var blockToggleBack;
var speakArray;
// ========================= CONFIGURATION =========================== //

if (hrefCheck("youtube.com")) {
    iDictionaryId = 415092182;
    // iDictionaryId = 401005908;
    iDictionaryLink = "https://ss.lt-center.info/test/" + iDictionaryId + "/";

    iPlayerName = "youtube";
    iPlayerElementName = '#player-container';
    iSubtitlesElementName = 'caption-window';
    iSubtitlesElementNamejQuery = "." + iSubtitlesElementName;
    iTogglePlayButtonName = '.ytp-play-button';
    iDelayerOn = false;
    iDelayerTime = 10;

    init();
//|| hrefCheck("vev.io")
} else if (hrefCheck("oload.download") || hrefCheck("openload.co") || hrefCheck("streamango.com")) {
    iDictionaryId = 415092182;
    // iDictionaryId = 401005908;
    iDictionaryLink = "https://ss.lt-center.info/test/" + iDictionaryId + "/";
    iPlayerName = "openload";
    iPlayerElementName = '#mediaspace_wrapper';
    iSubtitlesElementName = 'vjs-text-track-display';
    iTogglePlayButtonName = ".vjs-play-control";
    iSubtitlesElementNamejQuery = "." + iSubtitlesElementName;
    iDelayerOn = true;
	blockToggleBack = true;
    iDelayerTime = 10;
    init();
} else {
    throw new Error("Subtitle inteceptor isn't applicable for this website!");
}

// =================================================================== //

// check location 
function hrefCheck(currentLocation) {
    if (window.location.href.includes(currentLocation)) {
        console.log("Applying script for: " + currentLocation);
        iCurrentHref = currentLocation;
        return true;
    } else {
        return false;
    }
}


// add jQuery

function addjQuery() {
    var script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-1.11.0.min.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    console.log("jquery script was appended");
}

// Add subtitle interceptor

function addSubtitleInterceptor() {
    $(document).on('DOMNodeInserted', function(e) {

        if ($(e.target).hasClass(iSubtitlesElementName)) {
            addThreeChecker();
        }

        if (!$(iSubtitlesElementNamejQuery).length && $(".iblock").length) {
            $(".iblock").remove();
            console.log("Remove iBlock");
        }

        if ($(iSubtitlesElementNamejQuery).length && !iEventAttachedBool) {
            console.log("Fix subthree event");
            addThreeChecker();
        }

    });
    console.log("Subtile interceptor added");
}

function addThreeChecker() {
    iEventAttachedBool = true;
    $(iSubtitlesElementNamejQuery).hide();
    $(iSubtitlesElementNamejQuery)[0].addEventListener('DOMSubtreeModified', function() {
        var tempSubs = $(iSubtitlesElementNamejQuery).text();
        var iCurrentSubsBoolean = iCurrentSubs ? iCurrentSubs.trim() : false;

        if (tempSubs.trim() != iCurrentSubsBoolean && tempSubs.trim() !== "") {
            iCurrentSubs = tempSubs;
            //console.log(iCurrentSubs);
            checkDictionary(iCurrentSubs, true);
        }

    });
}

// get dictionary

function checkLocalDictionary() {
    if (localStorage.dictionary) {
        dictionary = getLocalStorageDictionary();
        console.log("USE LOCAL DICTIONARY");
    } else {
        getRemoteDictionary();
    }

}

function getRemoteDictionary() {
    try {
        $.getJSON(iDictionaryLink + "dictionary", function(data) {

            dictionary = data;
            setStorageDictionary(dictionary);
            console.log("Dictionary was synchronized: " + new Date());
            // console.log("USE REMOTE DICTIONARY");
            console.log(data.length);
        });
    } catch (err) {
        console.log("Dictionary syncronization error: " + new Date());
        if (!window.jQuery) {
            addjQuery();
        }
        setTimeout(function() {
            getRemoteDictionary();
        }, 1000);
        console.log(err);
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

function showSubtitles(word, translationsFound) {

    if (!$(iPlayerElementName)[0]) {
        return;
    }

    var iblock = document.getElementsByClassName('iblock');

    while (iblock[0]) {
        iblock[0].parentNode.removeChild(iblock[0]);
    }

    var iSub = document.createElement('div');
    //var iPlayer = document.getElementById('player-container')


    // if (iPlayerName == "youtube" && checkAutoSubtitles("auto-generated")) {
    // iSub.style.textAlign = "left";
    // iSub.style.paddingLeft = ($(iPlayerElementName).css('width').replace("px", "") / 8) + "px";
    // } else {
    // iSub.style.textAlign = "center";
    // }
    iSub.id = 'iblock';
    iSub.className = 'iblock';
    iSub.style.position = "absolute";

    iSub.style.color = "white";
    iSub.style.display = "table";
    iSub.style.tableLayout = "fixed";
    iSub.style.fontFamily = "Roboto, Arial, sans-serif";
    iSub.style.backgroundColor = "rgba(0, 0, 0, 0.7)";


    if (checkAutoSubtitles()) {
        iSub.style.textAlign = "left";
        iSub.style.paddingLeft = "15%";
		$(".iblock").css("box-sizing","border-box")
    } else {
        iSub.style.textAlign = "center";
    }

    if ((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
        iSub.style.width = screen.width + "px";
        iSub.style.left = 0;
        iSub.style.bottom = (screen.height / 7) + "px";
        iSub.style.fontSize = "24px";
        iSub.style.zIndex = "2147483647";

    } else {
        iSub.style.zIndex = 10;
        iSub.style.left = 0;
        iSub.style.width = $(iPlayerElementName).css('width');
        iSub.style.bottom = ($(iPlayerElementName).css('height').replace("px", "") / 7) + "px";
        iSub.style.fontSize = ($(iPlayerElementName).css('height').replace("px", "") / 25) + "px";

    }

	var rewindBack = document.createElement('div');
	rewindBack.click(function(){
		alert("The paragraph was clicked.");
	});
	var rewindForw = document.createElement('div');
	var content = document.createElement('div');
	
	rewindBack.className = 'rewindBack column';
	rewindBack.onclick = function(){rewind("backwards")};
	rewindForw.className = 'rewindForw column';
	rewindForw.onclick = function(){rewind("forward")};
	content.className = 'subContent column';

	content.innerText = word;
	
	
	iSub.appendChild(rewindBack);
	iSub.appendChild(content);
	iSub.appendChild(rewindForw);
    $(iPlayerElementName)[0].appendChild(iSub);


	$(".iblock").css({
		"border-collapse": "collapse"
	})	
	
	$(".rewindBack,.rewindForw").css({
		"width":"7%",
		"display":"table-cell"
	})

	$(".rewindBack,.rewindForw").hover(function(){
    $(this).css("background-color", "grey");
    }, function(){
    $(this).css("background-color", "transparent");
	});
	
    addClickListener();
    addMouseenterListener();

    delayPause(iDelayerTime, translationsFound);

}


function rewind(direction){
	var eventObj = document.createEventObject ? document.createEventObject() : document.createEvent("Events");
	var keyCode;  
		if(eventObj.initEvent){
		  eventObj.initEvent("keydown", true, true);
		}
		
		if(direction == "backwards"){
			keyCode = 37
			console.log("keyCode: " + keyCode);
		}else if (direction == "forward") {
			keyCode = 39
			console.log("keyCode: " + keyCode);
		} else {
			console.log("keyCode weren't found");
			return;
		}
	  
		eventObj.keyCode = keyCode;
		eventObj.which = keyCode;
		eventObj.returnValue = true;
		
	if($("#olvideo").length){	
	$("#olvideo")[0].focus()
	}
	$(iTogglePlayButtonName)[0].dispatchEvent(eventObj)
}

// check if subtitles auto generated

function checkAutoSubtitles() {
	
	if(iPlayerName != "youtube") {
		return false;
	}
	
    var autoGeneratedElements;

    if ($(iSubtitlesElementNamejQuery)[0] && 
		$(iSubtitlesElementNamejQuery)[0].firstChild &&
		$(iSubtitlesElementNamejQuery)[0].firstChild.firstChild) {
			
        autoGeneratedElements = $(iSubtitlesElementNamejQuery)[0].firstChild.firstChild.getElementsByTagName("span").length
    } else {
        autoGeneratedElements = 0;
    }

    if (autoGeneratedElements) {
        return true;
    } else {
        return false;
    }

}


// configure toggle button

function addMouseenterListener() {

    if (iTogglePlayButtonName) {
        iTogglePlayState = true;
        $(iPlayerElementName)[0].onmousemove = function() {

            if (!$('.iblock').length) {
                return;
            }

            var cX = event.clientX;
            var cY = event.clientY;
            var subPosition = $('.iblock')[0].getBoundingClientRect();
            // stop
            if (cY > subPosition.top && cY < subPosition.bottom && iTogglePlayState && !checkState()) {

                iTogglePlayState = false;
                $(iTogglePlayButtonName)[0].click();
            }
			
			//test ()
			if (cY > subPosition.top && cY < subPosition.bottom && !checkState()){
				iTogglePlayState = false;
                $(iTogglePlayButtonName)[0].click();
			} 
			
			
            // start
            if ((cY < subPosition.top || cY > subPosition.bottom) && !iTogglePlayState && checkState() && !blockToggleBack) {

                iTogglePlayState = true;

                $(iTogglePlayButtonName)[0].click();
            }

        };
    }
}

// pause when cue with translations appears

function delayPause(seconds, translationsFound) {
    if (iDelayerOn && translationsFound) {
		if (!checkState()) {
            $(iTogglePlayButtonName)[0].click();
			
			if(speakArray) {
			// defSpeak(speakArray[0])
			 synSpeak(speakArray[0])
			remoteDictionaryTransaction(speakArray,"history")
			//speak(speakArray.join(","));
			//speakFromUrl(speakArray.join(","));

			}
			
            setTimeout(function() {
                if (checkState()) {
                    $(iTogglePlayButtonName)[0].click();
                }
            }, seconds * 1000);
        }
    }
}


function checkState() {
    if (iPlayerName == "youtube") {
        return $(iTogglePlayButtonName)[0].getAttribute('aria-label') === "Play";
    } else if (iPlayerName == "openload") {
        return $(iTogglePlayButtonName)[0].title === "Play";
    }

}

// check selection

function addClickListener() {
    $("#iblock").click(function(event) {
        var currentText = getSelectionText().trim().replaceAll(/[^A-Za-z\s\'\-]/, "");
        var currentRequestText = currentText.replace(/ /g, '+')
        if (currentText !== '' && checkWord(currentText)) {
            removeFromDictionary(currentText);
            iTogglePlayState = false;
            return;
        }
        if (currentText !== '') {
            // $.ajax('https://json2jsonp.com/?url=https://api.lingualeo.com/gettranslates?word=' + encodeURIComponent(currentText), {
            // contentType: 'application/json',
            // dataType: 'jsonp',
            // success: function(data) {
            // //console.log(data)
            // addIntoDictionary(data, currentText);
            // iTogglePlayState = false;
            // }
            // });
            $.getJSON("https://cors.io/?https://api.lingualeo.com/gettranslates?word=" + currentRequestText, function(data) {
                console.log(data)
                addIntoDictionary(data, currentText.trim());
            });
        }
    });

}


function remoteDictionaryTransaction(word, action) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": iDictionaryLink + action,
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache",
            "postman-token": "f0efef44-f477-752a-0110-7558282b15e5"
        },
        "processData": false,
        "data": "[\"" + word + "\"]"
    }

    console.log(word)
    console.log(action)
    console.log(settings)

    $.ajax(settings).done(function(response) {
        console.log(response);
    }).fail(function(response) {
        //alert("ERROR");
        console.log("ERROR");
        pushToErrorBuffer(word, action)
        console.log(response);
    });
}

function pushToErrorBuffer(word, action) {
    var tempError = []
    tempError.push(localStorage.getItem(action + 'Error'))
    tempError.push(word)
    localStorage.setItem(action + 'Error', JSON.stringify(tempError));
}




// convert translation object into string

function cleanTranslations(data) {
    var translation = "";
    var sliceIndex;
	if(data.translate){
		for (var i = 0; i < data.translate.length; i++) {

			//translation += "," + data.translate[i].value.replaceAll(/[A-Za-z]/, "").trim();
			translation += "," + data.translate[i].value.replaceAll(/[^А-Яа-я\,\s]/, "").trim();

		}
	} else {
		translation = data.translation.toString().replaceAll(/[^А-Яа-я\,\s]/, "").trim();;
	}
	
    var translations = translation.split(",");

    var uniqueTranslations = [];
    $.each(translations, function(i, el) {
        if ($.inArray(el.trim(), uniqueTranslations) === -1) uniqueTranslations.push(el.trim());
    });

    uniqueTranslations.clean("");

    // uniqueTranslations.sort(function(a, b) {
        // return b.length - a.length;
    // });

    uniqueTranslations.sort(function(a, b) {
        return a.length - b.length;
    });

    for (var b = 0; b < uniqueTranslations.length; b++) {
        var stringLength = uniqueTranslations.slice(0, b).toString().length;

        if (stringLength > 60) {
            break;
        }

        sliceIndex = b+1;
    }

    uniqueTranslations = uniqueTranslations.slice(0, sliceIndex);
    return uniqueTranslations;
}

// add or delete word from dictionary

function removeFromDictionary(word) {
    var element = checkWord(word);
    var index = dictionary.indexOf(element);
    dictionary.splice(index, 1);
    remoteDictionaryTransaction(word, "delete")
    //console.log("Remove from dictionary index: " + index);
    checkDictionary(iCurrentSubs, false);
    setStorageDictionary(dictionary);
}

function addIntoDictionary(data, word) {

    var translation = {
        word: word,
        translation: cleanTranslations(data)
    };
    //console.log("add into dictionary")
    //console.log(translation);
    dictionary.push(translation);
    remoteDictionaryTransaction(word, "add")
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

function checkDictionary(sentence, firstCall) {
    if (!sentence) {
        return;
    }
    if (firstCall) {
        //console.log(sentence)
        iCurrentSubs = sentence;
    }
    var translationsFound = false;
    var wordsSingles = sentence.replaceAll("\n", " ").replaceAll(/\s\s+/g, " ").replaceAll(/[^A-Za-z\s\'\-]/, "").split(" ");
    var wordsPairs = [];
    var wordsTriple = [];
    var wordsArray = [];
	speakArray = []

    if (checkAutoSubtitles()) {
        wordsArray = wordsSingles;
    } else {
        for (var i = 0; i < wordsSingles.length; i++) {
            if (wordsSingles[i] && wordsSingles[i + 1]) {
                wordsPairs.push(wordsSingles[i].trim() + " " + wordsSingles[i + 1].trim());
            }
        }
        for (var i = 0; i < wordsSingles.length; i++) {
            if (wordsSingles[i] && wordsSingles[i + 1] && wordsSingles[i + 2]) {
                wordsTriple.push(wordsSingles[i].trim() + " " + wordsSingles[i + 1].trim() + " " + wordsSingles[i + 2].trim());
            }
        }

        wordsArray = wordsPairs.concat(wordsSingles);
        wordsArray = wordsTriple.concat(wordsArray);
    }


    for (var i = 0; i < wordsArray.length; i++) {
        var currentWord = wordsArray[i].trim();
        var entry = checkWord(currentWord);
        if (entry) {
            translationsFound = true;
            // var translation = entry.translation;
            var translation = cleanTranslations(entry).toString();
            var translationMessage = "\n" + currentWord.toUpperCase() + ": " + translation.toString().toLowerCase();
            if (!sentence.includes(translationMessage)) {
				speakArray.push(currentWord)
                // console.log(sentence)
                // console.log("Replace with: " + translation)
				
				var shortForm = currentWord.replaceAll(/(ing$|s$|ed$|d$)/,"")
				if(iOriginalForm == shortForm ){
					currentWord = shortForm;
				}
				
                var upperCaseWord = sentence.replaceAll(currentWord, currentWord.toUpperCase());
                sentence = upperCaseWord + translationMessage;
            }
        }
    }
    showSubtitles(sentence, translationsFound);
    //return sentence
}

// function checkWord(currentWord) {
// // debugger;
// for (var i = 0; i < dictionary.length; i++) {
// if (dictionary[i].word.trim().toLowerCase() == currentWord.trim().toLowerCase()) {
// return (dictionary[i]);
// }
// }
// }
function checkWord(currentWord) {
    // debugger;

	
    if (checkAutoSubtitles()) {
        for (var i = 0; i < dictionary.length; i++) {
            if (dictionary[i].word.trim().toLowerCase() == currentWord.trim().toLowerCase()) {
                return (dictionary[i]);
            }
        }
    } else {
        for (var i = 0; i < dictionary.length; i++) {
            var wordDictionary = dictionary[i].word.trim().toLowerCase();
            currentWord = currentWord.trim().toLowerCase();
            var wordDictionaryForms = [];
			iOriginalForm = wordDictionary

            wordDictionaryForms.push(wordDictionary);
            wordDictionaryForms.push(wordDictionary + "s");
            wordDictionaryForms.push(wordDictionary + "ed");
            wordDictionaryForms.push(wordDictionary + "d");
            wordDictionaryForms.push(wordDictionary + "ing");

            if (wordDictionaryForms.includes(currentWord)) {
                return (dictionary[i]);
            }
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

function onWindowSizeChange() {
    $(window).resize(function() {
        checkDictionary(iCurrentSubs, false);
    });
}

function syncRemoteDictionaryJob() {
    getRemoteDictionary();
    setTimeout(function() {
        syncRemoteDictionaryJob();
    }, 2000000);
}

function delayPauseTroggle() {

    $(document).keydown(function(e) {
        if (e.which == 120) {
            if (iDelayerOn) {
                iDelayerOn = false;
                sentence = "Studying mode is off"
				showSubtitles(sentence, false);
				
            } else {
                iDelayerOn = true;
                sentence = "Studying mode is on"
				showSubtitles(sentence, false);
            }
        }
    });
}



function init() {
    if (!window.jQuery) {
        addjQuery();
        console.log("Wait for jQuery")
        setTimeout(function() {
            init();
        }, 1500);
        return;
    }
    console.log("jquery succefully downloaded")

    try {
        if (!dictionary) {
            checkLocalDictionary();
        }
    } catch (err) {
        console.log(err);

        checkLocalDictionary();

    }

    try {
        addSubtitleInterceptor();
    } catch (err) {
        setTimeout(function() {
            addSubtitleInterceptor();
        }, 1000);
    }


    // on window size change

    try {
        onWindowSizeChange();
    } catch (err) {
        setTimeout(function() {
            onWindowSizeChange();
        }, 1000);
    }

    if (!iDelayerOn) {
        iDelayerOn = false;
        //iDelayerTime = 4;
	}
	
    syncRemoteDictionaryJob();
    delayPauseTroggle();
}

function speak(inputTxt){
	
	var synth = window.speechSynthesis;
	
    if (synth.speaking) {
        console.error('speechSynthesis.speaking');
        return;
    }
    if (inputTxt !== '') {
    var utterThis = new SpeechSynthesisUtterance(inputTxt);
    utterThis.onend = function (event) {
        console.log('SpeechSynthesisUtterance.onend');
    }
    utterThis.onerror = function (event) {
        console.error('SpeechSynthesisUtterance.onerror');
    }

        utterThis.voice = synth.getVoices()[3];

    }
    utterThis.pitch = "1"
    utterThis.rate = "0.7";
    utterThis.volume = "0.3"
    
    synth.speak(utterThis);
 }
 
 function defSpeak(text){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://ss.lt-center.info/test/definitions/" + text,
	  "method": "GET",
	  "headers": {
		"cache-control": "no-cache",
		"postman-token": "80c5bd5a-4f41-8b1d-0a0f-238465c25e70"
	  }
	}

	$.ajax(settings).done(function (response) {
	  speak(response);
	});
	
}

 function synSpeak(text){
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://ss.lt-center.info/test/synonyms/" + text,
	  "method": "GET",
	  "headers": {
		"cache-control": "no-cache",
		"postman-token": "80c5bd5a-4f41-8b1d-0a0f-238465c25e70"
	  }
	}

	$.ajax(settings).done(function (response) {
	  speakFromUrl(response);
	});
	
}


			function speakFromUrl(request){
				$.getJSON("https://cors.io/?https://api.lingualeo.com/gettranslates?word=" + request, function(data) {
					console.log(data)
					var audio = new Audio(data.sound_url)
					audio.volume = 0.2;
					audio.playbackRate = 0.9
					audio.play()
					//addIntoDictionary(data, currentText.trim());
				});
			}