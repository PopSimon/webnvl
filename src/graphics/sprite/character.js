"use strict";

function Character(/* string */ id, /* string */ name, /* Url */ path) {
    ImgSprite.call(this, id, name, path);
}
Character.prototype = Object.create(ImgSprite.prototype, {
    cssClass: {
        value: "charsprite"
    }
});