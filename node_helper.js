'use strict';
const NodeHelper = require('node_helper');
const firebase = require("firebase");


module.exports = NodeHelper.create({
    init:function(){
        var config = {
            apiKey: "AIzaSyC_LceL758JO5BCOP8olveLzBtEhZAK01c",
            authDomain: "magic-mirror-66db6.firebaseapp.com",
            databaseURL: "https://magic-mirror-66db6.firebaseio.com",
            storageBucket: "magic-mirror-66db6.appspot.com"
        };
        firebase.initializeApp(config);

    },
    start: function(){
        var self =this;
        self.sendSocketNotification('PONG',{});

        firebase.database().ref('/users/asaf/messages').once('value').then(function(messagesSnapshot){
            if (!messagesSnapshot.exists()) return;
            const messagesByKey =messagesSnapshot.val();
            console.log(JSON.stringify(messagesByKey));
            const messages = Object.keys(messagesByKey).map(x=> messagesByKey[x]);
            self.sendSocketNotification('MESSAGES',messages);
        })

    }
    //// Subclass socketNotificationReceived received.
    //socketNotificationReceived: function(notification, payload) {
    //}
});