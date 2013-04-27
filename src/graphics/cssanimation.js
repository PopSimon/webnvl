"use strict";

function CssAnimation(/* string */ id, /* string */ name, /* string */ duration, /* string */ iterationCount) {
    this.id = id;
    this.name = name;
    this.duration = duration || this.defaults.duration;
    this.iterationCount = iterationCount || this.defaults.iterationCount;
    this.parent = null;
}
CssAnimation.prototype = Object.create(Animation.prototype, {
    defaults: {
        value: {
            duration: "2s",
            iterationCount: "1"
        },
        enumerable: true
    },
    pause : {
        value: function () {
        }
    },
    stop: {
        value: function () {
            this.parent.remove(this);
        }
    }
});