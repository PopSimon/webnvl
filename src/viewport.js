"use strict";

function Avatar(element) {
    this.__element__ = element;
}
Avatar.prototype = Object.create(Object.prototype, {
    constructor: { value: Avatar },
    toRelativePath: {
        value: function (file) {
            return "img/char/" + file;
        }
    },
    src: {
        get: function () {
            if (this.__element__.hasClass("noavatar")) {
                return null;
            } else {
                return this.__element__.attr("src");
            }
        },
        set: function (file) {
            if (!file || file.isEmpty) {
                this.__element__.addClass("noavatar");
            } else {
                this.__element__.removeClass("noavatar");
                this.__element__.attr("src", this.toRelativePath(file));
            }
        },
        enumerable: true
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
    this.textbox = new TextBox($("#textbox"));
    this.dialog = new Dialog($("#dialogue"));
    this.__ui__ = this.textbox;
    this.stage = new Stage($("#stage"));
    this.avatar = new Avatar($("#avatar"));
    this._ambientField = null; //$("#ambient");
    this.oWidth = this.element.attr("width");
    this.oHeight = this.element.attr("height");
    
    this.events = {
        next: new NextEventTransmitter(),
        skip: new SkipEventTransmitter(),
        choose: new DialogeChooseEventTransmitter,
        toggleui: new ToggleUIEventTransmitter()
    };
    
    var viewport = this;
    window.addEventListener("keydown", function (e) {
        switch (e.keyCode) {
            case 8: // backspace
                viewport.ui.events.backspace.down.shoot(e);
            break;
            case 9: // tab
                viewport.ui.events.tab.down.shoot(e);
            break;
            case 13: // enter
                viewport.ui.events.enter.down.shoot(e);
            break;
            case 27: // space
                viewport.ui.events.escape.down.shoot(e);
            break;
            case 32: // space
                viewport.ui.events.space.down.shoot(e);
            break;
            case 39: // arrow right
                viewport.ui.events.arrow.right.down.shoot(e);
            break;
            case 40: // arrow down
                viewport.ui.events.arrow.down.down.shoot(e);
            break;
            case 38: // arrow up
                viewport.ui.events.arrow.up.down.shoot(e);
            break;
            case 37: // arrow left
                viewport.ui.events.arrow.left.down.shoot(e);
            break;
            default:
        }
    }, false);
    
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
    text: {
        get: function () {
            return this.textbox.text;
        },
        set: function (value) {
            this.textbox.text = value;
        },
        enumerable: true
    },
    ui: {
        get: function () {
            return this.__ui__;
        },
        set: function (ui) {
            this.__ui__.hide();
            this.__ui__ = ui;
            this.__ui__.show();
        },
        enumerable: true
    }
});
