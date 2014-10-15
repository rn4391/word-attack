define([], function() {
    var utilObj = {
        getObectKeys : function(obj) {
            var arr = [];
            if(!Object.keys) {
                for(var i in obj) {
                    if(obj.hasOwnProperty(i) && arr.indexOf(i) == -1) {
                        arr.push(i);
                    }
                }

            } else {
                arr = Object.keys(obj);
            }

            return arr;
        },
        createObjectCopy : function() {

        },
        createArrayCopy : function(arr) {
            var copy = [];
            for(var i in arr) {
                copy[i] = arr[i];
            }

            return copy;
        },
        getWordAsString : function(wordArr) {
            var word = "";
            for(var i in wordArr) {
                word += wordArr[i].alphabet;
            }

            return word;
        }
    };

    return utilObj;
})