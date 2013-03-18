"use strict";

/*
 *
 *
 */
 
function RoutePart(node) {
    this.__node__ = node;
}
RoutePart.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: RoutePart }
    /*next: {
        get: function () {
            GAMECONTEXT.scenario.getRoutePart(this.__node__.next);
        }
    }*/
});

/*
 * 
 * 
 */
 
function RoutePartFactory(chapter, node) {
    switch (node.type) {
        case "seq":
            return new Sequence(chapter, node);
        case "br":
            return new Branching(chapter, node);
        case "sel":
            return new Selection(chapter, node);
        default: throw Error("Unknown type: " + node);
    }
}

function ScreenFactory(routepart, node) {
    switch (node.type) {
        case "text":
            return new Text(routepart, node);
        default: throw Error("Unknown type: " + node);
    }
}

function Handler(node) {
    return new HandlerMapping[node.type](node);
}


function BranchingHandler(node) {
    RoutePart.call(this, node);
    this.options = {};
    
    for (var i = 0; i < this.__node__.opts.length; ++i) {
        var opt = this.__node__.opts[i];
        this.options[opt.id] = opt;
    }
}
BranchingHandler.prototype = Object.create(RoutePart.prototype, {
    validOptions: {
        get: function () {
            var valid = [];
            for (var i = 0; i < this.__node__.opts.length; ++i) {
                var opt = this.__node__.opts[i];
                if (opt.cond) {
                    var cond = new Function("variables", opt.cond);
                    if (cond(GAMECONTEXT.variables)) {
                        valid.push(opt);
                    }
                } else {
                    valid.push(opt);
                }
            }
            return valid;
        },
        enumerable: true
    },
    handleOption: {
        value: function (opt) {
            if (opt.ef) {
                var effect = new Function("variables", opt.ef);
                effect(GAMECONTEXT.variables);
            }
            
            GAMECONTEXT.scenario.jumpToRoutePart(opt.next || this.__node__.next);
        },
        enumerable: true
    }
});

function FirstMatchingHandler(node) {
    BranchingHandler.call(this, node);
}
FirstMatchingHandler.prototype = Object.create(BranchingHandler.prototype, {
    constructor: { value: FirstMatchingHandler },
    handle: {
        value: function () {
            this.handleOption(this.validOptions[0]);
        },
        enumerable: true
    }
});


function SelectionHandler(node) {
    BranchingHandler.call(this, node);
    this.onSelect = null;
}
SelectionHandler.prototype = Object.create(BranchingHandler.prototype, {
    constructor: { value: FirstMatchingHandler },
    handle: {
        value: function () {
            var opts = this.validOptions;
            var handler = this;
            
            var selection = new Selection(opts, 
            
            this.onSelect = function (opt) {
                GAMECONTEXT.viewport.dialogue.hide();
                GAMECONTEXT.viewport.events.choose.remove(handler.onSelect);
                handler.handleOption(opt);
            };
            
            GAMECONTEXT.viewport.dialogue.options = opts;
            GAMECONTEXT.viewport.events.choose.add(this.onSelect);
            GAMECONTEXT.viewport.dialogue.show();
        },
        enumerable: true
    }
});


function SequenceHandler(node) {
    RoutePart.call(this, node);
    this.__sceneindex__ = 0;
    
    this.onNext = null;
    this.onSkip = null;
}
SequenceHandler.prototype = Object.create(RoutePart.prototype, {
    handleExit: {
        value: function () {
            GAMECONTEXT.viewport.events.next.remove(this.onNext);
            GAMECONTEXT.viewport.events.skip.remove(this.onSkip);
            
            GAMECONTEXT.scenario.jumpToRoutePart(this.__node__.next);
        },
        enumerable: true,
    },
    hasNextScreen: {
        get: function () {
            return this.__sceneindex__ < this.__node__.c.length - 1;
        },
        enumerable: true
    },
    firstScreen: {
        get: function () {
            return new Handler(this.__node__.c[0]);
        },
        enumerable: true
    },
    nextScreen: {
        get: function () {
            return new Handler(this.__node__.c[++this.__sceneindex__]);
        },
        enumerable: true
    },
    handleNext: {
        value: function () {
            if (this.hasNextScreen) {
                var screen = this.nextScreen;
                screen.handle();
            } else {
                this.handleExit();
            }
        },
        enumerable: true,
    },
    handle: {
        value: function () {
            var handler = this;
            var screen = this.firstScreen;
            screen.handle();
            
            this.onNext = function () {
                handler.handleNext();
            }
            
            this.onSkip = function () {
                handler.handleExit();
            }
            
            GAMECONTEXT.viewport.events.next.add(this.onNext);
            GAMECONTEXT.viewport.events.skip.add(this.onSkip);
        },
        enumerable: true,
    }
});

var StageHandler = {
    handle: function (stage) {
        if (stage.clear) {
            this.clearCharacterSprites();
        }
        
        if (stage.remove && stage.remove.length > 0) {
            this.removeCharacterSprites(stage.remove);
        }
        
        if (stage.add && stage.add.length > 0) {
            this.addCharacterSprites(stage.add);
        }
    },
    addCharacterSprites: function (spriteDescs) {
        var sprites = {};
        for (var i = 0; i < spriteDescs.length; ++i) {
            var s = spriteDescs[i];
            sprites[s.id] = new CharacterSprite(s);
        }
        GAMECONTEXT.viewport.stage.characters.add(sprites);
    },
    removeCharacterSprite: function (spriteIds) {
        GAMECONTEXT.viewport.stage.characters.remove(spriteIds);
    },
    clearCharacterSprites: function () {
        GAMECONTEXT.viewport.stage.characters.clear();
    }
};


function ScreenHandler(node) {
    this.__node__ = node;
}
ScreenHandler.prototype = {
    handle: function () {

    }
}

function TextHandler(routepart, node) {
    ScreenHandler.call(this, routepart, node);
}
TextHandler.prototype = Object.create(ScreenHandler.prototype, {
    constructor: { value: TextHandler },
    handleStage: {
        value: function () {
            if (this.__node__.stage) {
                StageHandler.handle(screen.stage);
            }
        },
        enumerable: true
    },
    handleName: {
        value: function () {
            if (this.__node__.char) {
                var character = GAMECONTEXT.scenario.characters[this.__node__.char];
                GAMECONTEXT.viewport.speaker = character;
            } else {
                GAMECONTEXT.viewport.speaker = null;
            }
        },
        enumerable: true
    },
    handleAvatar: {
        value: function () {
            GAMECONTEXT.viewport.avatar.src = this.__node__.avatar;
        },
        enumerable: true
    },
    handleText: {
        value: function () {
            GAMECONTEXT.viewport.text = this.__node__.text;
        },
        enumerable: true
    },
    handleBackground: {
        value: function () {
            if (this.__node__.bg) {
                GAMECONTEXT.viewport.setBackground(this.__node__.bg.src, this.__node__.fade);
            }
        },
        enumerable: true
    },
    handle: {
        value: function () {
            this.handleName();
            this.handleAvatar();
            this.handleText();
            this.handleBackground();
            this.handleStage();
        },
        enumerable: true
    }
});


var AutoSequenceHandler = Object.create(SequenceHandler, {
    constructor: { value: AutoSequenceHandler },
    handleNext: { value: function () {} }
});

var AutoScreenHandler = Object.create(TextHandler, {
    constructor: { value: AutoScreenHandler },
    handle: function (screen) {
        GAMECONTEXT.scenario.screen = screen;
        GAMECONTEXT.viewport.screen = screen;
        
        window.setTimeout(function () {
            screen.sequence.handler.handleNext(screen);
        }, screen.interval);
    }
});

var HandlerMapping = {};
HandlerMapping["sel"] = SelectionHandler;
HandlerMapping["br"] = FirstMatchingHandler;
HandlerMapping["seq"] = SequenceHandler;
HandlerMapping["text"] = TextHandler;
