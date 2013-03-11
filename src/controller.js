"use strict";

var BranchingController = {
    handleOption: function (branching, opt) {
        if (opt.ef) {
            var effect = new Function("variables", opt.ef);
            effect(GAMECONTEXT.variables);
        }
        
        GAMECONTEXT.scenario.jump(opt.next || branching.next);
    }
}

var FirstMatchingController = Object.create( BranchingControl, {
    handle: {
        value: function (branching) {
            var opts = branching.validOptions;
            this.handleOption(branching, opts[0]);
        },
        enumerable: true
    }
});

var SelectionController = Object.create( BranchingControl, {
    handle: {
        value: function (branching) {
            var opts = branching.validOptions;
            var controller = this;
            
            var selection = new Selection(opts, function (e) {
                var opt = branching.options[e.target.attr(id)];
                GAMECONTEXT.viewport.dialogue.hide();
                controller.handleOption(branching, opt);
            });
            
            GAMECONTEXT.viewport.dialogue = selection;
            GAMECONTEXT.viewport.dialogue.show();
        },
        enumerable: true
    }
});

var SequenceController = {
    handleExit: function (sequence) {
        GAMECONTEXT.viewport.removeEventListener("next", onNext);
        GAMECONTEXT.viewport.removeEventListener("skip", onSkip);
        Scenario.jump(sequence.next);
    },
    handleNext: function (sequence) {
        if (sequence.hasNext) {
            var screen = sequence.next();
            screen.handler.handle(screen);
        } else {
            this.handleExit(sequence);
        }
    },
    handle: function (sequence) {
        var controller = this;
        
        function onNext() {
            controller.handleNext(sequence);
        }
        
        function onSkip() {
            controller.handleExit(sequence);
        }
        
        GAMECONTEXT.viewport.addEventListener("next", onNext);
        GAMECONTEXT.viewport.addEventListener("skip", onSkip);
    }
};

var SimpleScreenController = {
    handle: function (screen) {
        GAMECONTEXT.scenario.screen = screen;
        GAMECONTEXT.viewport.screen = screen;
    }
};

var AutoSequenceController = Object.create(SequenceController, {
    constructor: { value: AutoSequenceController },
    handleNext: { value: function () {} }
});

var AutoScreenController = Object.create(SimpleScreenController, {
    constructor: { value: AutoScreenController },
    handle: function (screen) {
        GAMECONTEXT.scenario.screen = screen;
        GAMECONTEXT.viewport.screen = screen;
        
        window.setTimeout(function () {
            screen.sequence.handler.handleNext(screen);
        }, screen.interval);
    }
});
