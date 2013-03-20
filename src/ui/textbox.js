"use strict";

function TextBox(/* jQuery element */ element) {
    UIElement.call(this, element);
    this.__text__ = this.__element__.find("#text");
    
    this.events = new TextBoxEvents();
    
    var tb = this;
    this.events.toggle.add(function () {
        tb.toggle();
    });
}
TextBox.prototype = Object.create(UIElement.prototype, {
    constructor: { value: TextBox },
    text: {
        get: function () {
            return this.__text__.text();
        },
        set: function (/* jQuery element */ text) {
            TypeWriter.clear();
            TypeWriter.out(this.__text__);
            TypeWriter.in(this.__text__, text, 16);
        },
        enumerable: true
    }
});

function TextBoxEvents() {
    KeyEvents.call(this);
    this.next = new EventSource();
    this.skip = new EventSource();
    this.toggle = new EventSource();
    
    var events = this;
    this.space.down.add(function () {
        console.log("!Next");
        events.next.shoot();
    });
    this.ctrl.down.add(function () {
        console.log("!Skip");
        events.skip.shoot();
    });
    this.backspace.down.add(function () {
        console.log("!Toggle");
        events.toggle.shoot();
    });
}
