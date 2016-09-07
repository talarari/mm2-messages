Module.register("mm2-messages",{
    // Default module config.
    defaults: {
        text: "work damn you"
    },
    start: function(){
        var self = this;
        self.sendSocketNotification('PING',{});
        // self.sendSocketNotification('LOGIN',{slackName:'amirp'});
        // setTimeout(()=>{
        //     self.sendSocketNotification('LOGOUT');
        // },15000);

        // setTimeout(()=>{
        //     self.sendSocketNotification('LOGIN',{slackName:'tal'});
        // },20000);


    },
    getScripts: function(){
        return ['moment.js'];
    },
    // Override dom generator.
    getDom: function() {
        const self = this;
        var wrapper = document.createElement("div");
        if (!this.messages || this.messages.length == 0) {
            clearInterval(self.refreshIntervalId);
            self.refreshIntervalId = null;
            return wrapper;
        }

        console.log(this.messages);
        if (!self.refreshIntervalId){
            self.refreshIntervalId = setInterval(()=>{
                self.updateDom(0)
            },20000);
        }



        var message = this.messages.pop();
        console.log('current message',message);
        var displayTime = moment(message.send).fromNow();
        wrapper.innerHTML =
            `<div >
                <span class="medium bright">${message.from} says :${message.text}</span></br>
                <span class="light small dimmed">${displayTime}</span>
            </div>`;

        return wrapper;
    },
    socketNotificationReceived: function(notification, payload) {
        console.log('here with '+ notification )
        if (notification === "MESSAGES"){
            this.messages = payload;
            this.updateDom(0);
        }

    },
    notificationReceived:function(notification,payload){
        if (notification === "LOGIN"){
            this.sendSocketNotification("LOGIN",payload);
        }
        if (notification === "LOGOUT"){
            this.sendSocketNotification("LOGOUT");
        }
    }

});