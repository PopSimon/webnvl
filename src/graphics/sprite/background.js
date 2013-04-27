"use strict";

function Background(/* string */ id, /* string */ name, /* Url */ path) {
    ImgSprite.call(this, id, name, path);
}
Background.prototype = Object.create(ImgSprite.prototype, {
    cssClass: {
        value: "bgsprite"
    }
});