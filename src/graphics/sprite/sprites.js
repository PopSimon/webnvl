"use strict";

function Sprites(/* string */ id, /* HtmlElement */ element) {
    Sprite.call(this, id, element);
    OrderedMaps.construct(this);
}
Sprites.prototype = Object.create(Sprite.prototype, {
    add: {
        value: function (/* Sprite */ sprite) {
            OrderedMaps.add(this, sprite.id, sprite);
            this.element.append(sprite.element);
        }
    },
    remove: {
        value: function (/* string */ id) {
            var sprite = OrderedMaps.remove(this, id);
            sprite.element.remove();
        }
    },
    get: {
        value: function (/* string */ id) {
            return OrderedMaps.get(this, id);
        }
    }
});