"use strict";

function EventSource() {
    this.listeners = [];
}
EventSource.prototype = {
    add: function (listener) {
        this.listeners.push(listener);
    },
    remove: function (listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    },
    shoot: function (e) {
        for (var i = 0; i < this.listeners.length; ++i) {
            this.listeners[i](e);
        }
    }
}

var KeyEventSource = {
    spacedown: new EventSource(),
    backspacedown: new EventSource(),
    ctrldown: new EventSource()
};

window.addEventListener("keydown", function (e) {
    switch (e.keyCode) {
        case 32: // space
            KeyEventSource.spacedown.shoot(e);
        break;
        case 8: // backspace
            KeyEventSource.backspacedown.shoot(e);
        default:
        break;
    }
}, false);

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
