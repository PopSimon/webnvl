"use strict";

function Id(idstring) {
    this.chapter = part[0];
    this.routepart = part[1];
    this.scene = part[3];
    
}

function RoutePart(node) {
    this.__node__ = node;
}
RoutePart.prototype = {
}




function Sequence(node) {
    RoutePart.call(this, node);
    this.__sceneindex__ = 0;
}
Sequence.prototype = Object.create(RoutePart.prototype, {
    next: {
        value: function () {
            if (this.__sceneindex__ < this.__node__.content.length - 1) {
                this.routing.scene = this.SceneFactory(this.__node__.content[this.__sceneindex__]);
            } else {
                this.routing.jump(this.__node__.next);
            }
        },
        enumerable: true
    }
});

function Branching(node) {
    RoutePart.call(this, node);
    this.options = {};
    
    for (var i = 0; i < this.__node__.opts.length; ++i) {
        var opt = this.opts[i];
        this.options[opt.id] = opt;
    }
}
Branching.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: Branching },
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
    }
});



function RoutePartFactory(node) {
    switch (node.type) {
        case "seq":
            return new Sequence(node);
        case "br":
            return new Branching(node);
        default: throw Error("Unknown type: " + node);
    }
}




function Chapter(node) {
    this.id = node.id;
    this.__node__ = node;
}
Chapter.prototype = {
    contains: function (id) {
        return !id.chapter || id.chapter === this.id;
    },
    get: function (id) {
        var rpart = this.__node__.content[id];
        return RoutePartFactory(rpart);
    }
}

function Routing(scenario) {
    this.scenario = scenario;
    this.chapter = null;
    this.__routepart__ = null;
    this.scene = null;
}
Routing.prototype = {
    jump: function (id) {
        var chapter;
        
        if (this.chapter.contains(id)) {
            chapter = this.chapter;
        } else {
            this.chapter = chapter = new Chapter(this.scenario.get(id.chapter));
        }
        
        this.__routepart__ = chapter.get(id.routepart);
        
        if (id.scene) {
            this.scene = this.__routepart__.get(id.scene);
        } else {
            this.scene = this.__routepart__.get();
        }
    }
}
