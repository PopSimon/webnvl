"use strict";

function CssAnimations(/* HtmlElement */ item) {
    OrderedMaps.construct(this);

    this.item = item;
    this.__names__ = [];
    this.__durations__ = [];
    this.__iterationCounts__ = [];
	
	var anims = this;
	
	var animstart = function (/* */ AnimationEvent e) {
		var animation = anims.get(e.animationName);
		animation.events.start.shoot();
	};
	
	var animend = function (/* */ AnimationEvent e) {
		var animation = anims.get(e.animationName);
		animation.events.end.shoot();
	}
	
	item.element.bind('animationstart', animstart, false);
	item.element.bind('animationend', animend, false);
}

CssAnimations.prototype = {
    add: function (/* CssAnimation */ animation) {
        OrderedMaps.add(this, animation.id, animation);
        animation.parent = this;
        
        this.__names__.push(animation.name);
        this.__durations__.push(animation.duration);
        this.__iterationCounts__.push(animation.iterationCount);
    },
    start: function () {
        if (!!this.__list__ && this.__list__.length != 0) {
            var animation = this.__list__[0];
            this.__names__ = animation.name;
            this.__durations__ = animation.duration;
            this.__iterationCounts__ = animation.iterationCount;
            
            for (var i = 1; i < this.__list__.length; ++i) {
                animation = this.__list__[i];
                this.__names__ += ", " + animation.name;
                this.__durations__ += ", " + animation.duration;
                this.__iterationCounts__ += ", " + animation.iterationCount;
            }
        } else {
            this.__names__ = "";
            this.__durations__ = "";
            this.__iterationCounts__ = "";
        }
    
        console.log(this.__names__);
        console.log(this.__durations__);
        console.log(this.__iterationCounts__);
        
        var element = this.item.element;
        var names = this.__names__;
        element.css("animation-name", names);
        element.css("-webkit-animation-name", names);
        element.css("-moz-animation-name", names);
        element.css("-ms-animation-name", names);
        element.css("-o-animation-name", names);
        
        var durations = this.__durations__;
        element.css("animation-duration", durations);
        element.css("-webkit-animation-duration", durations);
        element.css("-moz-animation-duration", durations);
        element.css("-ms-animation-duration", durations);
        element.css("-o-animation-duration", durations);
        
        var iterationCounts = this.__iterationCounts__;
        element.css("animation-iteration-count", iterationCounts);
        element.css("-webkit-animation-iteration-count", iterationCounts);
        element.css("-moz-animation-iteration-count", iterationCounts);
        element.css("-ms-animation-iteration-count", iterationCounts);
        element.css("-o-animation-iteration-count", iterationCounts);
		
		
    },
    remove: function (/* CssAnimation */ animation) {
        var index = OrderedMaps.indexOf(this, animation.id);
        
        if (index >= 0) {
            this.__names__.splice(index, 1);
            this.__durations__.splice(index, 1);
            this.__iterationCounts__.splice(index, 1);
        }
        
        OrderedMaps.remove(this, animation.id);
    }
};