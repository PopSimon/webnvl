"use strict";

function Stage(/* HtmlElement */ element) {
    Sprite.prototype.constructor.call(this, "stage", element);
    this.background = new Sprites("background", element.find("#background"));
    this.foreground = new Sprites("foreground", element.find("#foreground"));
}
Stage.prototype = Object.create(Sprite.prototype, {
	update: {
		value: function (/* StageDesc */ desc) {
			if(desc.foreground) {
				this.foreground.update(desc.foreground);
			}
			if(desc.background) {
				this.background.update(desc.background);
			}
			if(desc.animations) {
				this.animations.update(desc.animations);
			}
		}
	}
});