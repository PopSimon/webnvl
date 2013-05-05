"use strict";

function CssAnimation(/* AnimationDesc */ animdesc) {
    this.name = animdesc.name;
    this.duration = animdesc.duration || null;
    this.iterationCount = animdesc.iterationCount || null;
    this.delay = animdesc.delay || null;
    this.direction = animdesc.direction || null;
    this.fillMode = animdesc.fillMode || null;
    this.playState = animdesc.playState || null;
    this.parent = null;
	this.events = {
		start: new EventSource(),
		end: new EventSource()
	};
}
CssAnimation.prototype = Object.create(Animation.prototype, {
    pause : {
        value: function () {
        }
    },
    stop: {
        value: function () {
            this.parent.remove(this);
        }
    },
    toString: {
        value: function () {
            return this.name + " "
                + (this.duration ? " " + this.duration : "")
                + (this.timingFunction ? " " + this.timingFunction : "")
                + (this.delay ? " " + this.delay : "")
                + (this.iterationCount ? " " + this.iterationCount : "")
                + (this.direction ? " " + this.direction : "")
                + (this.fillMode ? " " + this.fillMode : "")
                + (this.playState ? " " + this.playState : "");
        }
    }
});