Module.register("mm2-messages",{
    // Default module config.
    defaults: {
        text: "work damn you"
    },
    start: function(){
        this.sendSocketNotification('PING',{});
    },
    getScripts: function(){
        return ['moment.js'];
    },
    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        if (!this.messages || this.messages.length == 0) return wrapper;

        console.log(this.messages);
        var message = this.messages.pop();
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
            console.log(payload);
            this.messages = payload;
            this.updateDom(0);
        }

    },
    notificationReceived:function(notification,payload){
        if (notification === "LOGIN"){
            this.sendSocketNotification("LOGIN",payload);
        }
    }

});