"use strict";

function ImgSprite(/* SpriteDesc */ sprdesc) {
    this.path = sprdesc.path;
    Sprite.prototype.constructor.call(this, sprdesc, this.DOM(sprdesc.id, sprdesc.path, this.cssClass));
}
ImgSprite.prototype = Object.create(Sprite.prototype, {
    DOM: {
        value: function (/* SpriteDesc */ sprdesc) {
            var img = new Image();
            img.src = this.path;
            img = $(img);
            sprdesc.cssClass ? img.addClass(sprdesc.cssClass) : "";
            img.attr("data-id", sprdesc.id);
            return img;
        },
        enumerable: true
    }
});