"use strict";

function ImgSprite(/* string */ id, /* string */ name, /* Url */ path) {
    this.name = name;
    this.path = path;
    Sprite.call(this, id, this.DOM(id, name, path, this.cssClass));
}
ImgSprite.prototype = Object.create(Sprite.prototype, {
    DOM: {
        value: function (/* string */ id, /* string */ name, /* Url */ path, /* string */ cssClass) {
            var img = new Image();
            img.src = path;
            img = $(img);
            img.addClass(cssClass);
            img.attr("data-id", id);
            img.attr("data-name", name);
            return img;
        },
        enumerable: true
    }
});