"use strict";

function Animation(/* AnimationDesc */ animdesc) {
    return new CssAnimation(animdesc);
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
    },
    remove: {
        value: function () {
            this.parent.remove(this.name);
        }
    }
});