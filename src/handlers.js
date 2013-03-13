"use strict";

function Handler(node) {
    return new HandlerMapping[node.constructor];
}

var BranchingHandler = {
    handleOption: function (branching, opt) {
        if (opt.ef) {
            var effect = new Function("variables", opt.ef);
            effect(GAMECONTEXT.variables);
        }
        
        GAMECONTEXT.scenario.jump(opt.next || branching.next);
    }
}

var FirstMatchingHandler = Object.create(BranchingHandler, {
    handle: {
        value: function (branching) {
            var opts = branching.validOptions;
            this.handleOption(branching, opts[0]);
        },
        enumerable: true
    }
});

var SelectionHandler = Object.create(BranchingHandler, {
    handle: {
        value: function (branching) {
            var opts = branching.validOptions;
            var handler = this;
            
            var selection = new Selection(opts, function (opt) {
                GAMECONTEXT.viewport.dialogue.hide();
                handler.handleOption(branching, opt);
            });
            
            GAMECONTEXT.viewport.dialogue.options = selection;
            GAMECONTEXT.viewport.dialogue.show();
        },
        enumerable: true
    }
});


function SequenceHandler(sequence) {
    this.sequence = sequence;
    this.onNext = null;
    this.onSkip = null;
}
SequenceHandler.prototype = {
    handleExit: function (sequence) {
        GAMECONTEXT.viewport.events.next.remove(this.onNext);
        GAMECONTEXT.viewport.events.skip.remove(this.onSkip);
        
        Scenario.jump(sequence.next);
    },
    handleNext: function (sequence) {
        if (sequence.hasNextScreen) {
            var screen = sequence.nextScreen;
            screen.handler.handle(screen);
        } else {
            this.handleExit(sequence);
        }
    },
    handle: function () {
        var handler = this;
        var sequence = this.sequence;
        var screen = sequence.firstScreen;
        screen.handler.handle(screen);
        
        this.onNext = function () {
            handler.handleNext(sequence);
        }
        
        this.onSkip = function () {
            handler.handleExit(sequence);
        }
        
        GAMECONTEXT.viewport.events.next.add(this.onNext);
        GAMECONTEXT.viewport.events.skip.add(this.onSkip);
    }
};

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

var TextHandler = {
    handleName: function (textNode) {
        if (textNode.char) {
            var character = GAMECONTEXT.characters[textNode.char];
            //GAMECONTEXT.viewport.setSpeaker(character);
        } else {
            //GAMECONTEXT.viewport.setSpeaker(null);
        }
    },
    handleAvatar: function (textNode) {
        GAMECONTEXT.viewport.avatar.src = textNode.avatar;
    },
    handleText: function (textNode) {
        GAMECONTEXT.viewport.text = textNode.text;
    },
    handle: function (textNode) {
        this.handleName(textNode);
        this.handleAvatar(textNode);
        this.handleText(textNode);
    }
};

function handleBackground(bg) {
    GAMECONTEXT.viewport.setBackground(bg.src, bg.fade);
}

var SimpleScreenHandler = {

    handle: function (screen) {
        GAMECONTEXT.scenario.screen = screen;
        
        if (screen.stage) {
            StageHandler.handle(screen.stage);
        }
        
        TextHandler.handle(screen);
        
        if (screen.bg) {
            handleBackground(bg);
        }
    }
};

var AutoSequenceHandler = Object.create(SequenceHandler, {
    constructor: { value: AutoSequenceHandler },
    handleNext: { value: function () {} }
});

var AutoScreenHandler = Object.create(SimpleScreenHandler, {
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
HandlerMapping[Selection.prototype.type] = SelectionHandler;
HandlerMapping[Branching.prototype.type] = FirstMatchingHandler;
HandlerMapping[Sequence.prototype.type] = SequenceHandler;
HandlerMapping[Text.prototype.type] = TextHandler;
