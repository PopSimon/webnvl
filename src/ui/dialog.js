"use strict";

function DialogOption(dialog, option, element) {
    this.dialog = dialog;
    this.__option__ = option;
    this.__element__ = element;
    this.__hiddenui__ = null;
    
    var dopt = this;
    this.events = {
        select: new EventSource()
    };
    
    this.events.select.add(function () {
        dialog.events.choices.select.shoot(dopt.__option__);
    });
    
    this.__element__.bind("click", function () {
        dopt.events.select.shoot();
    });
    
    this.__element__.bind("mouseover", function () {
        dopt.dialog.focus = dopt;
    });
    
    this.__onEnter__ = function () {
        dopt.events.select.shoot();
    }
}
DialogOption.prototype = {
    setFocus: function () {
        this.__element__[0].focus();
        this.dialog.events.enter.down.add(this.__onEnter__);
    },
    removeFocus: function () {
        this.dialog.events.enter.down.remove(this.__onEnter__);
    }
}

function Dialog(/* jQuery element */ element) {
    UIElement.call(this, element);
    this.__optroot__ = this.__element__.find("#options");
    this.__optproto__ = this.__optroot__.children().eq(0);
    this.__options__ = [];
    this.__focus__ = null;
    
    this.events = new DialogEvents();
}
Dialog.prototype = Object.create(UIElement.prototype, {
    constructor: { value: Dialog },
    options: {
        get: function () {
            return this.__options__;
        },
        set: function (opts) {
            this.__optroot__.empty();
            this.__options__.length = 0;
            for (var i = 0; i < opts.length; ++i) {
                var opt = opts[i];
                var optelem = this.__optproto__.clone();
                optelem.text(opt.text);
                optelem.attr("tabindex", i);
                this.__options__.push(new DialogOption(this, opt, optelem));
                this.__optroot__.append(optelem);
            }
            
            this.focus = this.__options__[0];
        },
        enumerable: true
    },
    focus: {
        get: function () {
            return this.__focus__;
        },
        set: function (dopt) {
            if (this.__focus__) {
                this.__focus__.removeFocus();
            }
            this.__focus__ = dopt;
            this.__focus__.setFocus();
        },
        enumerable: true
    },
    open: {
        value: function () {
            this.__hiddenui__ = GAMECONTEXT.viewport.ui;
            GAMECONTEXT.viewport.ui = this;
        },
        enumerable: true
    },
    close: {
        value: function () {
            GAMECONTEXT.viewport.ui = this.__hiddenui__;
        },
        enumerable: true
    }
});


function DialogEvents() {
    KeyEvents.call(this);
    this.choices = {
        previous: new EventSource(),
        next: new EventSource(),
        select: new EventSource()
    };
    
    var events = this;
    this.arrow.up.down.add(function () {
        console.log("!Previous");
        events.choices.previous.shoot();
    });
    this.arrow.down.down.add(function () {
        console.log("!Next");
        events.choices.next.shoot();
    });
    this.tab.down.add(function () {
        console.log("!Next");
        events.choices.next.shoot();
    });
}
