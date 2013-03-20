"use strict";

function EventSource() {
    this.listeners = [];
    this.blocked = false;
}
EventSource.prototype = {
    add: function (listener) {
        this.listeners.push(listener);
    },
    remove: function (listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    },
    block: function () {
        this.blocked = true;
    },
    unblock: function () {
        this.blocked = false;
    },
    shoot: function (e) {
        if (!this.blocked) {
            for (var i = 0; i < this.listeners.length; ++i) {
                this.listeners[i](e);
            }
        }
    }
}

function KeyEventSource() {
    this.down = new EventSource();
}

function KeyEvents() {
    this.space = new KeyEventSource();
    this.backspace = new KeyEventSource();
    this.ctrl = new KeyEventSource();
    this.arrow = {
        up: new KeyEventSource(),
        down: new KeyEventSource(),
        left: new KeyEventSource(),
        right: new KeyEventSource()
    };
    this.tab = new KeyEventSource();
    this.escape = new KeyEventSource();
    this.enter = new KeyEventSource();
}



function NextEventTransmitter() {
    EventSource.call(this);
    this.keylisteners = [];
}
NextEventTransmitter.prototype = Object.create(EventSource.prototype ,{
    add: {
        value: function (callback) {
            var keylistener = function (e) {
                e.preventDefault();
                callback(e);
            };
            
            this.listeners.push(callback);
            this.keylisteners.push(keylistener);
            
            KeyEventSource.spacedown.add(keylistener);
        },
        enumerable: true
    },
    remove: {
        value: function (callback) {
            var index = this.listeners.indexOf(callback);
            var keylistener = this.keylisteners[index];
            
            KeyEventSource.spacedown.remove(keylistener);
            
            this.listeners.splice(index, 1);
            this.keylisteners.splice(index, 1);
        },
        enumerable: true
    }
});

function SkipEventTransmitter() {
    EventSource.call(this);
    this.keylisteners = [];
}
SkipEventTransmitter.prototype = Object.create(EventSource.prototype ,{
    add: {
        value: function (callback) {
            var keylistener = function (e) {
                e.preventDefault();
                callback(e);
            };
            
            this.listeners.push(callback);
            this.keylisteners.push(keylistener);
            
            KeyEventSource.ctrldown.add(keylistener);
        },
        enumerable: true
    },
    remove: {
        value: function (callback) {
            var index = this.listeners.indexOf(callback);
            var keylistener = this.keylisteners[index];
            
            KeyEventSource.ctrldown.remove(keylistener);
            
            this.listeners.splice(index, 1);
            this.keylisteners.splice(index, 1);
        },
        enumerable: true
    }
});

function ToggleUIEventTransmitter() {
    EventSource.call(this);
    this.keylisteners = [];
}
ToggleUIEventTransmitter.prototype = Object.create(EventSource.prototype ,{
    add: {
        value: function (callback) {
            var keylistener = function (e) {
                e.preventDefault();
                callback(e);
            };
            
            this.listeners.push(callback);
            this.keylisteners.push(keylistener);
            
            KeyEventSource.backspacedown.add(keylistener);
        },
        enumerable: true
    },
    remove: {
        value: function (callback) {
            var index = this.listeners.indexOf(callback);
            var keylistener = this.keylisteners[index];
            
            KeyEventSource.backspacedown.remove(keylistener);
            
            this.listeners.splice(index, 1);
            this.keylisteners.splice(index, 1);
        },
        enumerable: true
    }
});


function DialogeChooseEventTransmitter() {
    EventSource.call(this);
    this.keylisteners = [];
}
DialogeChooseEventTransmitter.prototype = Object.create(EventSource.prototype ,{
    add: {
        value: function (callback) {
            var keylistener = function (e) {
                e.preventDefault();
                callback(e);
            };
            
            this.listeners.push(callback);
            this.keylisteners.push(keylistener);
            
            KeyEventSource.ctrldown.add(keylistener);
        },
        enumerable: true
    },
    remove: {
        value: function (callback) {
            var index = this.listeners.indexOf(callback);
            var keylistener = this.keylisteners[index];
            
            KeyEventSource.ctrldown.remove(keylistener);
            
            this.listeners.splice(index, 1);
            this.keylisteners.splice(index, 1);
        },
        enumerable: true
    }
});
