"use strict";

var WebkitConsts = {
	animation: "-webkit-animation",
    animationEnd: "webkitAnimationEnd"
};

var UserAgentConsts = WebkitConsts;

function AnimationHandler(context) {
    this.context = context;
    this.listeners = [];
}
AnimationHandler.prototype = Object.create(Object.prototype, {
    constructor: { value: AnimationHandler },
    // eg: target1(animationrule1) target2(animationrule2)
    ANIMEXP: { value: /([^\(\)\s]+)\(([^\(\)]+)\)/g },
    stopAll: {
        value: function (/* String selector */ targets) {
            var targets = this.context.find(targets);
            targets.css(UserAgentConsts.animation, "");
            for (var i=0; i < targets.length; ++i) {
                var target = targets[i];
                for (var j=0; j < this.listeners.length; ++j) {
                    var listener = this.listeners[i];
                    if (listener[0] === target) {
                        target.removeEventListener(UserAgentConsts.animationEnd, listener[1]);
                    }
                    this.listeners.splice(i, 1);
                    break;
                }
            }
        }
    },
    start: {
        value: function (/* String selector */ targets, /* CSS animation property value */ animrule) {
            if (targets && animrule) {
                var onAnimationEnd = (function (e) {
                    this.stopAll(targets);
                }).bind(this);
                
                targets = this.context.find(targets);
                targets.css(UserAgentConsts.animation, animrule);
                for (var i=0; i < targets.length; ++i) {
                    var target = targets[i];
                    targets[i].addEventListener(UserAgentConsts.animationEnd, onAnimationEnd, false);
                    this.listeners.push([target, onAnimationEnd]);
                }
            }
        }
    },
    handle: {
        value: function (/* jQuery element */ element) {
            var animstr = element.data("animation");
            if (animstr) {
                var result;
                while ((result = this.ANIMEXP.exec(animstr)) !== null) {
                    var target = result[1];
                    var animrule = result[2];
                    this.start(target, animrule);
                }
            }
            
            var targets = element.data("stop-animations");
            if (targets) {
                this.stopAll(targets);
            }
        },
        enumerable: true
    }
});

window.onload = function () {
    var ah = new AnimationHandler($("body"));
    
	setTimeout(function () {
		ah.handle($("#source1"));
	});
    
    setTimeout(function () {
		ah.handle($("#source2"));
	}, 4000);
    setTimeout(function () {
		ah.handle($("#source3"));
	}, 6000);
}