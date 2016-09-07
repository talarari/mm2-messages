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
    },
    getMessages:function(userSlackName){
        const self = this;
        if (!userSlackName){
            self.sendSocketNotification('MESSAGES',null);
            return;
        }

        const userMessagesRef = firebase.database().ref(`/users/${userSlackName}/messages`);
        userMessagesRef.once('value').then(function(messagesSnapshot){
            if (!messagesSnapshot.exists()) return;

            userMessagesRef.remove().then(()=>{
                const messagesByKey =messagesSnapshot.val();
                const messages = Object.keys(messagesByKey).map(x=> messagesByKey[x]);
                self.sendSocketNotification('MESSAGES',messages);
            });

        })
    },
    // Subclass socketNotificationReceived received.
    socketNotificationReceived: function(notification, payload) {
        console.log('got notification ' + notification);
        if (notification === "LOGIN"){
            this.getMessages(payload.slackName);
        }
        if (notification === "LOGOUT"){
            this.getMessages(null);
        }
    }
});