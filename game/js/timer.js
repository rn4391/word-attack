define(['dataStore', 'commonUtils', 'constants', 'pubsub'],
function(dataStore, commonUtils, constants, PubSub) {
   
    var retObj = {
        initialize : function(elId) {
            if(elId) {
                internalObj.timerEl = document.getElementById(elId);
            }

            var maxTime = constants.gameStartTime;
            dataStore.timeLeft = maxTime;

            dataStore.gameTimer = setInterval(function() {
                if(!dataStore.timeLeft) {
                    internalObj.cancelTimer();
                    PubSub.publish("game.end");
                    return;
                }
                dataStore.timeLeft--;
                if(internalObj.timerEl) {
                    internalObj.timerEl.innerHTML = dataStore.timeLeft;
                }
            }, 1000);

            if(internalObj.timerEl) {
                internalObj.timerEl.innerHTML = dataStore.timeLeft;
            }
            
        }
    };


    var internalObj = {
        cancelTimer : function() {
            clearInterval(dataStore.gameTimer);
        }
    }

    return retObj;

});