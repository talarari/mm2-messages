Module.register("mm2-messages",{
    // Default module config.
    defaults: {
        text: "work damn you"
    },
    start: function(){
        //this.sendSocketNotification('TALTALTAL', {bla:'bla'});
    },
    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        wrapper.innerHTML = this.config.text;
        return wrapper;
    },
    socketNotificationReceived: function(notification, payload) {
        Log.log('TALLLLLLLLLLLLL');

    }
});