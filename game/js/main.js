requirejs.config({
    paths : {
        //libs
        'jquery' : 'libs/jquery.min',
        'underscore' : 'libs/underscore-min',
        'text' : 'libs/text',
        'pubsub' : 'libs/pubsub',

        //data files
        'wordStore' : '../data/wordObj.js',
        'dataStore' : 'dataStore',
        'constants' : 'constants',

        //utilities
        'commonUtils' : 'commonUtilFunctions',
        'wordUtils' : 'wordUtilFunctions',

        //logic files
        'game' : 'game',
        'timer' : 'timer',
        'gameLogic' : 'logic',

        //event pub/subs
        'wordEvents' : 'wordEvent',

        //templates
        'wordTemplate' : '../templates/wordTemplate.html',
        'submittedWordTemplate' : '../templates/submittedWordTemplate.html'
    },

    shim : {
        'jquery' :{
            exports : "$"
        },
        'underscore' : {
            exports : "_"
        },
        'wordStore' : {

        },
        'pubsub' : {
            exports : "PubSub"
        }
    }
});


require(['jquery', 'underscore'], function() {
    require(['game'], function(game) { game.init() });
})
