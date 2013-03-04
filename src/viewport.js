"use strict";

function Avatar(character, mood) {
    this.character = character;
    this.mood = mood;
}
Avatar.prototype = Object.create(Object.prototype, {
    constructor: {
        value: Avatar,
        writable: false,
        enumerable: true,
        configurable: false
    },
    isEmpty: {
        get: function () {
            return !this.character || !this.mood;
        },
        enumerable: true,
        configurable: false
    }
});


function SpriteGroup(/* jQuery element */ element) {
    this.__element__ = element;
}
SpriteGroup.prototype = Object.create(Object.prototype, {
    constructor: { value: SpriteGroup },
    clear: {
        value: function () {
            this.__element__.empty();
        },
        enumerable: true
    },
    add: {
        value: function (/* jQuery element(s) */ elements) {
            this.__element__.append(elements);
        },
        enumerable: true
    },
    remove: {
        value: function (/* String */ selector) {
            this.__element__.children().remove(selector);
        },
        enumerable: true
    }
});

function Stage(/* jQuery element */ element) {
    this.background = new SpriteGroup(element.find("#background"));
    this.characters = new SpriteGroup(element.find("#characters"));
    this.effects = new SpriteGroup(element.find("#effects"));
}
Stage.prototype = Object.create(Object.prototype, {
    constructor: { value: Stage }
});

function ViewPort() {
    this.element = $("#viewport");
    this.__choices__ = $("#choices");
    this.textBox = $("#textbox");
    this.__text__ = $("#text");
    this.stage = new Stage($("#stage"));
    this._avatarField = $("#avatar");
    this._ambientField = null; //$("#ambient");
    this.oWidth = this.element.attr("width");
    this.oHeight = this.element.attr("height");
    this.reset();
}
ViewPort.prototype = Object.create(Object.prototype, {
    reset: { 
        value: function () {
            this.isWider = window.innerWidth / window.innerHeight > this.oWidth / this.oHeight;
            if (this.isWider) {
                this.element.css("height", this.toPixelLength(window.innerHeight));
                this.element.css("width", this.toPixelLength(
                    window.innerHeight / this.oHeight * this.oWidth));
            } else {
                this.element.css("width", this.toPixelLength(window.innerWidth));
                this.element.css("height", this.toPixelLength(
                    window.innerWidth / this.oWidth * this.oHeight));
            }
            
            console.log("---------------");
            console.log("width:" + window.innerWidth + " vs " + this.element.css("width"));
            console.log("height:" + window.innerHeight + " vs " + this.element.css("height"));
        },
        writable: false,
        enumerable: true,
        configurable: false
    },
    toPixelLength: {
        value: function (intval) {
            return intval.toString() + "px";
        },
        writable: false,
        enumerable: false,
        configurable: false
    },
    avatar: {
        get: function () {
            if (this._avatarField.hasClass("noavatar")) {
                return null;
            } else {
                return new Avatar(
                    this._avatarField.data("character"),
                    this._avatarField.data("mood")
                );
            }
        },
        set: function (avatar) {
            if (!avatar || avatar.isEmpty) {
                this._avatarField.addClass("noavatar");
            } else {
                this._avatarField.removeClass("noavatar");
                this._avatarField.attr("data-character", avatar.character);
                this._avatarField.attr("data-mood", avatar.mood);
            }
        },
        enumerable: true,
        configurable: false
    },
    text: {
        get: function () {
            return this.__text__.contents();
        },
        set: function (/* jQuery element */ element) {
            TypeWriter.clear();
            TypeWriter.out(this.__text__);
            TypeWriter.in(this.__text__, element.clone(), 16);
        },
        enumerable: true,
        configurable: false
    },
    ambient: {
        get: function () {
            return this._ambientField;
        },
        set: function (/* jQuery audio element */ element) {
            if (this._ambientField) {
                this._ambientField.get(0).pause();
            }
            
            this._ambientField = element;
            this._ambientField.get(0).play();
        },
        enumerable: true,
        configurable: false
    },
    hideTextBox: {
        value: function () {
            this.textBox.addClass("hidden");
        },
        enumerable: true,
    },
    showTextBox: {
        value: function () {
            this.textBox.removeClass("hidden");
        },
        enumerable: true,
    },
    choices: {
        set: function (/* jQuery element */ element) {
            this.__choices__.empty().append(element);
        },
        enumerable: true
    },
    hideChoices: {
        value: function () {
            this.__choices__.addClass("hidden");
        },
        enumerable: true,
    },
    showChoices: {
        value: function () {
            this.__choices__.removeClass("hidden");
        },
        enumerable: true,
    },
    toggleUI: {
        value: function () {
            this.textBox.toggleClass("hidden");
        },
        enumerable: true
    },
    handle: {
        value: function (/* Node */ node) {
            node.handler.handle(node, this);
        },
        enumerable: true
    }
});
