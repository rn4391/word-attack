var fs = require('fs');

fs.readFile('../words/word', {encoding: "utf8"}, function(err, data){
    if(err) {
        console.log(err);
        return;
    }

    var count = 0,
        remaining = data,
        wordObj = {};
    while(remaining.indexOf("\n")) {
        count++;
        word = remaining.substring(0, remaining.indexOf("\n")).toLowerCase();

        if(word && word.length > 1 && word.length < 9) {
            if(!wordObj[word.length]) {
                wordObj[word.length] = {};
            }

            wordObj[word.length][word] = {};
        }
        if(remaining.indexOf("\n") != -1) {
            remaining = remaining.substring(remaining.indexOf("\n") + 1);    
        } else {
            break;
        }
        
    }

    saveToFile(wordObj);
});


var saveToFile = function(wordObj) {
    fs.writeFile("../game/data/wordObj.js", JSON.stringify(wordObj), function(err) {
        if(err) {
            console.log("Error Saving");
            return;
        }

        console.log("Saved Successfully");
    })
}

