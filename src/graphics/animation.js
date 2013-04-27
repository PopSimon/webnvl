"use strict";

function Animation(/* string */ id) {
    this.id = id;
}
Animation.prototype = Object.create(Object.prototype, {
    start: {
        value: function () {
        }
    },
    pause : {
        value: function () {
        }
    },
    stop: {
        value: function () {
        }
    }
});