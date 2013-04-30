"use strict";

function Sprites(/* string */ id, /* HtmlElement */ element, /* Stage */ stage) {
    Sprite.call(this, id, element);
    OrderedMaps.construct(this);
	this.stage = stage;
}
Sprites.prototype = Object.create(Sprite.prototype, {
	defaults: {
		value: {
			addDelay: 0,
			removeDelay: 0
		}
	},
    add: {
        value: function (/* SpriteDesc */ spritedesc, /* AnimationDesc */ transitiondesc, /* number */ delay) {
			delay = delay || this.defaults.addDelay;
			
			setTimeout((function () {
				var sprite = new Sprite(spritedesc);
				if (transitiondesc) {
					var transition = new Animation(transitiondesc);
					sprite.animations.add(transition);
				}
				OrderedMaps.add(this, sprite.id, sprite);
				this.element.append(sprite.element);
			}).bind(this), delay);
        }
    },
    remove: {
        value: function (/* string */ id, /* AnimationDesc */ transitiondesc, /* number */ delay) {
			delay = delay || this.defaults.removeDelay;
			
			setTimeout((function () {
				var sprite = new Sprite(spritedesc);
				
				var removefun = (function () {
					var sprite = OrderedMaps.remove(this, id);
					sprite.element.remove();
				}).bind(this);
				
				if (transitiondesc) {
					var transition = new Animation(transitiondesc);
					transition.events.end(removefun);
					sprite.animations.add(transition);
				} else {
					removefun();
				}
				
			}).bind(this), delay);
        }
    },
    get: {
        value: function (/* string */ id) {
            return OrderedMaps.get(this, id);
        }
    }
});