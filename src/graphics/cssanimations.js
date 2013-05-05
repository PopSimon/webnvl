"use strict";

function CssAnimations(/* Sprite */ item) {
    OrderedMaps.construct(this);

    this.item = item;
	var anims = this;
	
	var animstart = function (/* AnimationEvent */ e) {
		var animation = anims.get(e.animationName);
        if (animation) {
            animation.events.start.shoot();
        }
	};
	
	var animend = function (/* AnimationEvent */ e) {
		var animation = anims.get(e.animationName);
        if (animation) {
            animation.events.end.shoot();
        }
	}
	
    console.log(item.element[0]);
    item.element[0].addEventListener('animationstart', animstart, false);
    item.element[0].addEventListener('webkitAnimationStart', animstart, false);
    item.element[0].addEventListener('MSAnimationStart', animstart, false);
    item.element[0].addEventListener('oanimationstart', animstart, false);
    item.element[0].addEventListener('animationend', animend, false);
    item.element[0].addEventListener('webkitAnimationEnd', animend, false);
    item.element[0].addEventListener('MSAnimationEnd', animend, false);
    item.element[0].addEventListener('oanimationend', animend, false);
}

CssAnimations.prototype = {
    add: function (/* CssAnimation */ animation) {
        OrderedMaps.add(this, animation.name, animation);
        animation.parent = this;
        
        animation.events.end.add(function () {
            animation.remove();
        });
        
        this.update();
        return animation;
    },
    update: function () {
        var animstr = "";
        if (!!this.__list__ && this.__list__.length != 0) {
            var animation = this.__list__[0];
            animstr += animation;
            for (var i = 1; i < this.__list__.length; ++i) {
                animation = this.__list__[i];
                animstr += ", " + animation;
            }
        }
    
        console.log(animstr);
        
        var element = this.item.element;
        element.css("animation", animstr);
        element.css("-webkit-animation", animstr);
        element.css("-moz-animation", animstr);
        element.css("-ms-animation", animstr);
        element.css("-o-animation", animstr);
    },
    remove: function (/* string */ name) {
        OrderedMaps.remove(this, name);
        this.update();
    },
    get: function (/* string */ name) {
        return OrderedMaps.get(this, name);
    }
};