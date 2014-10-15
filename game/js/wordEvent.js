define(['pubsub', 'gameLogic', 'viewRender'], function(PubSub, gameLogic, viewRender) {
        
    var retObj = {
        initialize : function() {
            publish.alphabetClick();
            publish.wordSubmitClick();
            publish.viewChangeClicks();
            subscribe.alphabetClick();
            subscribe.alphabetSelectChanged();
            subscribe.selectedWordChange();
            subscribe.selectedWordSubmit();
            subscribe.incorrectWord();
            subscribe.incorrectWordHide();
            subscribe.alreadySubmittedWord();
            subscribe.wordSubmitted();
            subscribe.viewChangeClicks();
        }
    };

    var publish = {
        alphabetClick : function() {
            $(document).on("click", ".alphabet", function() {
                var index = $(this).attr("index");
                PubSub.publish("alphabet.click", index);
            });    
        },
        wordSubmitClick : function() {
            $("#wordSubmit").on("click", function() {
                PubSub.publish("word.selectedWordSubmit");
            });
        },
        viewChangeClicks : function() {
            $("#startButton").on("click", function() {
                PubSub.publish("game.start");
            });
            $("#restartButton").on("click", function() {
                PubSub.publish("game.restart");
            });
            $("#homeButton").on("click", function() {
                PubSub.publish("game.home");
            });
        }
    };

    var subscribe = {
        alphabetClick : function() {
            PubSub.subscribe("alphabet.click", gameLogic.updateSelectState);
            PubSub.subscribe("alphabet.click", gameLogic.updateSelectedWord);
        },
        alphabetSelectChanged : function() {
            PubSub.subscribe("alphabet.selectChanged", viewRender.updateWord);
        },
        selectedWordChange : function() {
            PubSub.subscribe("word.selectedWordChanged", viewRender.updateSelectedWord);
        },
        selectedWordSubmit : function() {
            PubSub.subscribe("word.selectedWordSubmit", gameLogic.submitSelectedWord);
        },
        incorrectWord : function() {
            PubSub.subscribe("word.incorrectWord", viewRender.showIncorrectWordMessage);
        },
        incorrectWordHide : function() {
            PubSub.subscribe("word.incorrectWordHide", viewRender.hideMessage);
        },
        alreadySubmittedWord : function() {
            PubSub.subscribe("word.alreadySubmitted", viewRender.showAlreadySubmittedWordMessage);
        },
        wordSubmitted : function() {
            PubSub.subscribe("word.submitted", gameLogic.clearSelectedWord);
            // PubSub.subscribe("word.submitted", viewRender.clearSelectedWord);
            PubSub.subscribe("word.submitted", viewRender.addToSelectedWordList);
            PubSub.subscribe("word.submitted", viewRender.hideMessage);
        },
        viewChangeClicks : function() {
            PubSub.subscribe("game.start", viewRender.showGameScreen);
            PubSub.subscribe("game.start", gameLogic.resetGame);

            PubSub.subscribe("game.restart", viewRender.showGameScreen);
            PubSub.subscribe("game.restart", gameLogic.resetGame);
            
            PubSub.subscribe("game.home", viewRender.showHomeScreen);

            PubSub.subscribe("game.end", viewRender.showEndScreen)
        }
    }

    return retObj;

});