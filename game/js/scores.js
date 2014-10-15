define(['dataStore', 'pubsub'],
function(dataStore, PubSub) {
    

    var retObj = {
        initialize : function(elId) {
            if(elId) {
                internalObj.scoreEl = document.getElementById(elId);
            }

            dataStore.score = 0;
            if(internalObj.scoreEl) {
                internalObj.scoreEl.innerHTML = dataStore.score;    
            }

            PubSub.subscribe("score.updateScore", function(msg, data) {
                if(internalObj.scoreEl) {
                    internalObj.scoreEl.innerHTML = data;    
                }
            });

        }
    };

    var internalObj = {

    };

    return retObj;

})