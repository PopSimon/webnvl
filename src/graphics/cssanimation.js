"use strict";

function CssAnimation(/* AnimationDesc */ animdesc) {
    this.id = animdesc.id;
    this.name = animdesc.name;
    this.duration = animdesc.duration || this.defaults.duration;
    this.iterationCount = animdesc.iterationCount || this.defaults.iterationCount;
    this.parent = null;
	this.events = {
		start: new EventSource(),
		end: new EventSource()
	};
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