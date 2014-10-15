define(['text!wordStore', 'commonUtils', 'constants', 'dataStore', 'wordUtils', 'timer', 'scores', 'viewRender'], 
function(wordStore, commonUtils, constants, dataStore, wordUtils, timer, scores, viewRender) {
    
    var retObj = {
        init : function() {
            dataStore.allWords = JSON.parse(wordStore);

            wordUtils.initialize("mainWordContainer");

            // wordUtils.initialize("mainWordContainer");
            // // wordUtils.initializeEvents();
            // timer.initialize("timerContainer");
            // scores.initialize("scoreContainer");

            // var startingWordsObj = dataStore.allWords[constants.startingWordLength];
            // var startingWordsArr = commonUtils.getObectKeys(startingWordsObj);
            // console.log(startingWordsArr)
            
            // var randomWord = startingWordsArr[parseInt(Math.random() * startingWordsArr.length, 10)];
            // dataStore.currentWord = randomWord.split("");

            // var currentWord = commonUtils.createArrayCopy(dataStore.currentWord);
            // dataStore.shuffledWord = wordUtils.shuffleAlphabets(currentWord);

            // dataStore.gameWord = wordUtils.storeWordForGame(dataStore.shuffledWord);
            // dataStore.selectedWord = [];

            // viewRender.showWord("mainWordContainer");
            // viewRender.showSelectedWord("selectedWordContainer");   

            console.log(dataStore);
        }
    };

    return retObj;

});