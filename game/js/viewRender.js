define(['dataStore', 'text!wordTemplate', 'text!submittedWordTemplate', 'underscore'], function(dataStore, wordTemplate, submittedWordTemplate) {
   
    var retObj = {
        errorMessageContainerEl : document.getElementById("errorMessageContainer"),
        submittedWordListEl : document.getElementById("submittedWordsContainer"),
        endScreen : document.getElementById("endScreen"),
        gameScreen : document.getElementById("gameScreen"),
        homeScreen : document.getElementById("homeScreen"),
        finalScoreContainer : document.getElementById("finalScoreContainer"),
        updateWord : function(msg, data) {
            if(!retObj.wordEl) return;

            retObj.showWord();
        },
        updateSelectedWord : function(msg, data) {
            if(!retObj.selectedWordEl) return;

            retObj.showSelectedWord();
        },
        showWord : function(el) {
            if(!el && !retObj.wordEl) return;
            
            if(!retObj.wordEl) {
                retObj.wordEl = document.getElementById(el);    
            }
            
            if(!retObj.wordEl) return;

            var wordHTML = "";
            for(var i in dataStore.gameWord) {
                wordHTML += _.template($(wordTemplate).html(), {obj : dataStore.gameWord[i], index : i});
            }

            retObj.wordEl.innerHTML = wordHTML;
        },
        showSelectedWord : function(el) {
            if(!el && !retObj.selectedWordEl) return;
            
            if(!retObj.selectedWordEl) {
                retObj.selectedWordEl = document.getElementById(el);    
            }
            if(!retObj.selectedWordEl) return;

            var wordHTML = "";
            for(var i in dataStore.selectedWord) {
                wordHTML += _.template($(wordTemplate).html(), {obj : dataStore.selectedWord[i], index : i});
            }

            retObj.selectedWordEl.innerHTML = wordHTML;
        },
        showIncorrectWordMessage : function() {
            retObj.errorMessageContainerEl.innerHTML = "What the fuck did you just say?";
        },
        showAlreadySubmittedWordMessage : function() {
            retObj.errorMessageContainerEl.innerHTML = "Hey!! You already told us that";
        },
        hideMessage : function() {
            retObj.errorMessageContainerEl.innerHTML = "";
        },
        addToSelectedWordList : function(msg, data) {
            if(!data) return;

            retObj.submittedWordListEl.innerHTML += _.template($(submittedWordTemplate).html(), {"word" : data});
            setTimeout(function() {
                $(".submitted-word.new").addClass("fadeIn");
                $(".submitted-word.new").removeClass("new");
            }, 0);
        },
        showEndScreen : function() {
            retObj.finalScoreContainer.innerHTML = dataStore.score;
            retObj.endScreen.style.opacity = 1;
            retObj.endScreen.style.display = "block";
            retObj.gameScreen.style.opacity = 0;
            retObj.homeScreen.style.opacity = 0;
            retObj.gameScreen.style.display = "none";
            retObj.homeScreen.style.display = "none";
        },
        showGameScreen : function() {
            retObj.gameScreen.style.opacity = 1;
            retObj.gameScreen.style.display = "block";
            retObj.endScreen.style.opacity = 0;
            retObj.homeScreen.style.opacity = 0;
            retObj.endScreen.style.display = "none";
            retObj.homeScreen.style.display = "none";
        },

        showHomeScreen : function() {
            retObj.homeScreen.style.opacity = 1;
            retObj.homeScreen.style.display = "block";
            retObj.endScreen.style.opacity = 0;
            retObj.gameScreen.style.opacity = 0;
            retObj.endScreen.style.display = "none";
            retObj.gameScreen.style.display = "none";
        }
    };

    return retObj;

});