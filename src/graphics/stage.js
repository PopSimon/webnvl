"use strict";

function Stage(/* HtmlElement */ element) {
    Sprite.call(this, "stage", element);
    this.background = new Sprites("background", element.find("#background"));
    this.foreground = new Sprites("foreground", element.find("#foreground"));
}
Stage.prototype = Object.create(Sprite.prototype, {
});