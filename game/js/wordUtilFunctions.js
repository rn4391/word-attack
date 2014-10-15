define(['dataStore', 'text!wordTemplate', 'wordEvents'], function(dataStore, wordTemplate, wordEvents) {
   
    var utilFunctions = {
        initialize : function(elId) {
            if(elId) {
                internalObj.wordEl = document.getElementById(elId);
            }

            wordEvents.initialize();
        },
        shuffleAlphabets : function(alphabetArr) {
            var len = alphabetArr.length,
                shuffledArr = [];

            while(len--) {
                var randomIndex = parseInt(Math.random() * (len - 1), 10);
                shuffledArr.push(alphabetArr[randomIndex]);
                alphabetArr.splice(randomIndex, 1);
            }

            return shuffledArr;
        },
        storeWordForGame : function(arr) {
            var newArr = [];

            for(var i in arr) {
                var obj = {
                    "alphabet" : arr[i],
                    "selected" : false,
                    "bonus" : null
                };

                newArr.push(obj);
            }

            return newArr;
        }
    };

    var internalObj = {
        
    };

    return utilFunctions;

});