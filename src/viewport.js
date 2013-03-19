"use strict";

function UIElement(/* jQuery element */ element) {
    this.__element__ = element;
}
UIElement.prototype = Object.create(Object.prototype, {
    constructor: { value: UIElement },
    show: {
        value: function () {
            this.__element__.removeClass("hidden");
        },
        enumerable: true
    },
    hide: {
        value: function () {
            this.__element__.addClass("hidden");
        },
        enumerable: true
    }
});

function TextBox(/* jQuery element */ element) {
    UIElement.call(this, element);
    this.__text__ = this.__element__.find("#text");
}
TextBox.prototype = Object.create(UIElement.prototype, {
    constructor: { value: TextBox },
    text: {
        get: function () {
            return this.__text__.text();
        },
        set: function (/* jQuery element */ text) {
            TypeWriter.clear();
            TypeWriter.out(this.__text__);
            TypeWriter.in(this.__text__, text, 16);
        },
        enumerable: true
    }
});

function Dialogue(/* jQuery element */ element) {
    UIElement.call(this, element);
    this.__optroot__ = this.__element__.find("#options");
    this.__optproto__ = this.__optroot__.children().eq(0);
    this.__options__ = [];
    
    var dialogue = this;
    this.__onselect__ = function (e) {
        var optid = $(this).data("optid");
        var opt = dialogue.__options__[optid];
        dialogue.events.select.shoot(opt);
    };
}
Dialogue.prototype = Object.create(UIElement.prototype, {
    constructor: { value: Dialogue },
    options: {
        get: function () {
            return this.__options__;
        },
        set: function (opts) {
            this.__optroot__.empty();
            this.__options__ = opts;
            for (var i = 0; i < opts.length; ++i) {
                var opt = opts[i];
                var optelem = this.__optproto__.clone();
                optelem.data("optid", i);
                optelem.bind("click", this.__onselect__);
                optelem.text(opt.text);
                this.__optroot__.append(optelem);
            }
        },
        enumerable: true
    },
    events: {
        value: Object.create(Object.prototype, {
            select: {
                value: new EventSource(),
                enumerable: true
            }
        }),
        enumerable: true
    },
    show: {
        value: function () {
            GAMECONTEXT.viewport.textbox.hide();
            parentPrototype(this).show.call(this);
        },
        enumerable: true
    },
    hide: {
        value: function () {
            GAMECONTEXT.viewport.textbox.show();
            parentPrototype(this).hide.call(this);
        },
        enumerable: true
    }
});

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
    this.dialogue = new Dialogue($("#dialogue"));
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
    toggleUI: {
        value: function () {
            this.textBox.toggleClass("hidden");
        },
        enumerable: true
    },
    text: {
        get: function () {
            return this.textbox.text;
        },
        set: function (value) {
            this.textbox.text = value;
        },
        enumerable: true
    }
});
