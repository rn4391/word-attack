define(['dataStore', 'pubsub', 'commonUtils', 'wordUtils', 'timer', 'scores', 'viewRender', 'constants'], 
    function(dataStore, PubSub, commonUtils, wordUtils, timer, scores, viewRender, constants) {
   
    var logicObj = {
        updateSelectState : function(msg, data) {
            var clickedWord = dataStore.gameWord[data];
            clickedWord.selected = !clickedWord.selected;

            PubSub.publish("alphabet.selectChanged");
        },
        updateSelectedWord : function(msg, data) {
            var clickedWord = dataStore.gameWord[data];
            var wordPosition = dataStore.selectedWord.indexOf(clickedWord);
            var selectedWordLength = dataStore.selectedWord.length;

            if(wordPosition == -1) {
                dataStore.selectedWord.push(clickedWord);
            } else {
                for(var i=wordPosition+1; i < selectedWordLength; i++) {
                    var alphabet = dataStore.selectedWord[i];
                    var alphabetPositionInGameWord = dataStore.gameWord.indexOf(alphabet);
                    if(alphabetPositionInGameWord != -1) {
                        dataStore.gameWord[alphabetPositionInGameWord].selected = !dataStore.gameWord[alphabetPositionInGameWord].selected;    
                    }
                    
                }
                PubSub.publish("alphabet.selectChanged");

                dataStore.selectedWord = dataStore.selectedWord.slice(0, wordPosition);
            }

            PubSub.publish("word.selectedWordChanged");   
        },
        submitSelectedWord : function() {
            var word = internalObj.getCurrentWordAsString();
            if(internalObj.wordAlreadySubmitted(word)) {
                PubSub.publish("word.alreadySubmitted");
                return;
            }

            if(internalObj.checkSelectedWord(word)) {
                var score = internalObj.calculateScore();
                dataStore.score += score;

                PubSub.publish("score.updateScore", dataStore.score);
                
                dataStore.submittedWords.push(word);
                PubSub.publish("word.submitted", word);
            } else {
                PubSub.publish("word.incorrectWord");
                logicObj.clearSelectedWord();

                setTimeout(function() {
                    PubSub.publish("word.incorrectWordHide");
                }, 2000);
            }
        },
        clearSelectedWord : function() {
            for(var i in dataStore.selectedWord) {
                var alphabet = dataStore.selectedWord[i];
                var alphabetPositionInGameWord = dataStore.gameWord.indexOf(alphabet);

                if(alphabetPositionInGameWord != -1) {
                    dataStore.gameWord[alphabetPositionInGameWord].selected = !dataStore.gameWord[alphabetPositionInGameWord].selected;
                }
            }
            PubSub.publish("alphabet.selectChanged");

            dataStore.selectedWord = [];
            PubSub.publish("word.selectedWordChanged");
        },
        resetGame : function() {
            var wordUtils = require('wordUtils');
            
            // wordUtils.initializeEvents();
            timer.initialize("timerContainer");
            scores.initialize("scoreContainer");

            var startingWordsObj = dataStore.allWords[constants.startingWordLength];
            var startingWordsArr = commonUtils.getObectKeys(startingWordsObj);
            console.log(startingWordsArr)
            
            var randomWord = startingWordsArr[parseInt(Math.random() * startingWordsArr.length, 10)];
            dataStore.currentWord = randomWord.split("");

            var currentWord = commonUtils.createArrayCopy(dataStore.currentWord);
            dataStore.shuffledWord = wordUtils.shuffleAlphabets(currentWord);

            dataStore.gameWord = wordUtils.storeWordForGame(dataStore.shuffledWord);
            dataStore.selectedWord = [];

            viewRender.showWord("mainWordContainer");
            viewRender.showSelectedWord("selectedWordContainer");   

        }
    };

    var internalObj = {
        checkSelectedWord : function(word) {
            if(!word) return;

            if(dataStore.allWords[dataStore.selectedWord.length][word]) {
                return true;
            }

            return false;
        },
        wordAlreadySubmitted : function(word) {
            if(!word) return;

            if(!dataStore.submittedWords) {
                dataStore.submittedWords = [];
            }

            if(dataStore.submittedWords.indexOf(word.toLowerCase()) != -1) {
                return true;
            }

            return false;
        },
        calculateScore : function() {
            return 50;
        },
        getCurrentWordAsString : function() {
            if(!dataStore.selectedWord || !dataStore.selectedWord.length) return "";

            var word = commonUtils.getWordAsString(dataStore.selectedWord);
            return word.toLowerCase();
        }
    }

    return logicObj;

});