"use strict";

function parentPrototype(object) {
    var proto = Object.getPrototypeOf(object);
    if (proto === Object.prototype) {
        return proto;
    } else {
        return Object.getPrototypeOf(proto);
    }
}

function removeItem(/* Array */ list, object) {
    var index = list.indexOf(object);
    if (index >= 0) {
        list.splice(index, 1);
    }
}

// requestAnimationFrame helper
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelRequestAnimationFrame = window[vendors[x]+
          'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}())
