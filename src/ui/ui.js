"use strict";

function UIElement(/* jQuery element */ element) {
    this.__element__ = element;
}
UIElement.prototype = Object.create(Object.prototype, {
    constructor: { value: UIElement },
    show: {
        value: function () {
            this.__element__.addClass("visible");
        },
        enumerable: true
    },
    hide: {
        value: function () {
            this.__element__.removeClass("visible");
        },
        enumerable: true
    },
    toggle: {
        value: function () {
            this.__element__.toggleClass("visible");
        },
        enumerable: true
    }
});
