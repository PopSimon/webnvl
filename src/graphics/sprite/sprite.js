"use strict";

function Sprite(/* string */ id, /* HtmlElement */ element) {
    this.id = id;
    this.element = element;
    this.animations = new CssAnimations(element);
}
Sprite.prototype = Object.create(Object.prototype, {
    
});