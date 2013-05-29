"use strict";

function Sprites(/* string */ id, /* HtmlElement */ element, /* Stage */ stage) {
    Sprite.prototype.constructor.call(this, id, element);
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
        value: function (/* Sprite */ sprite, /* Transition */ transition, /* number */ delay) {
			delay = delay || this.defaults.addDelay;
			
			setTimeout((function () {
				if (transition) {
					sprite.animations.add(transition);
				}
				OrderedMaps.add(this, sprite.id, sprite);
				this.element.append(sprite.element);
			}).bind(this), delay);
        }
    },
    remove: {
        value: function (/* string */ id, /* Transition */ transition, /* number */ delay) {
			delay = delay || this.defaults.removeDelay;
			
			setTimeout((function () {
                var sprite = this.get(id);
				var removefun = (function () {
					var sprite = OrderedMaps.remove(this, id);
					sprite.element.remove();
				}).bind(this);
				
				if (transition) {
                    transition.events.end.add(removefun);
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
    },
	update: {
		value: function (/* SpritesDesc */ desc) {
			if (desc.add) {
				for (var i = 0; i < desc.add.length(); ++i) {
					var item = desc.add[i];
					this.add(new Sprite(item.sprite), item.transition, item.delay);
				}
			}
			if (desc.remove) {
				for (var i = 0; i < desc.remove.length(); ++i) {
					var item = desc.remove[i];
					this.remove(item.sprite, item.transition, item.delay);
				}
			}
		}
	}
});