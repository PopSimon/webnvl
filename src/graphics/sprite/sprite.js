"use strict";

function Sprite(/* SpriteDesc */ sprdesc) {
    switch (sprdesc.type) {
        case "image":
            return new ImgSprite(sprdesc);
        break;
        default:
            throw Error("unknown sprite type: \"" + sprdesc.type + "\"");
    }
}
Sprite.prototype = Object.create(Object.prototype, {
    constructor: {
        value: function (/* SpriteDesc */ sprdesc, /* HTMLElement */ element) {
            this.id = sprdesc.id;
            this.element = element;
            this.animations = new CssAnimations(this);
        }
    }
});