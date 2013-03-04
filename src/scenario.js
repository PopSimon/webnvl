"use strict";

function parentPrototype(object) {
    var proto = Object.getPrototypeOf(object);
    if (proto === Object.prototype) {
        return proto;
    } else {
        return Object.getPrototypeOf(proto);
    }
}

function NodeFactory(constructors) {
    if (constructors.length < 1) {
        throw Error("No constructors!");
    }
    
    return function (/* jQuery element */ element, /* jQuery element */ parent, /* Scenario */ scenario) {
        for (var i = 0; i < constructors.length; ++i) {
            var constructor = constructors[i];
            if (element.is(constructor.prototype.selector)) {
                return new constructor(element, parent, scenario);
            }
        }
        throw Error("Unknown node type: " + element);
    }
}


function Scenario(/* jQuery element */ element) {
    this.root = element;
    this.history = null;//new History();
    this.__visitor__ = null;//new Visitor(this.history);
}
Scenario.prototype = Object.create(Object.prototype, {
    constructor: { value: Scenario },
    init: {
        value: function () {
            this.__visitor__ = new Visitor(this, this.history);
            this.__visitor__.visit(this.first);
        },
        enumerable: true
    },
    load: {
        value: function (/* String */ savename) {
            var history = window.localStorage[GAMECONTEXT.gameprefix + "_" + savename];
            this.history = history ? new History(history) : new History();
        },
        enumerable: true
    },
    save: {
        value: function (/* String */ savename) {
            var postfix;
            if (save) {
                // named save
                postfix = "_save_" + savename;
            } else {
                // quicksave
                postfix = "_quicksave";
            }
            window.localStorage[GAMECONTEXT.name + postfix] = JSON.stringify(this.history);
        },
        enumerable: true
    },
    __getElement__: {
        value: /* jQuery element */ function (/* jQuery element | selector String */ hook) {
            /* jQuery element */ var element;
            if (typeof hook === 'string') {
                // we got a selector
                element = this.root.find(hook);
                if (element.length !== 1) {
                    throw Error("Too many/no (" + element.length + ") matches for '" + hook + "'");
                }
            } else {
                element = hook;
            }
            
            return element;
        }
    },
    get: {
        value: /* Node */ function (/* jQuery element | selector String */ element) {
            element = this.__getElement__(element);
            
            var parentElement = element.parent();
            if (parentElement.is(this.root)) {
                // a chapter
                return this.childFactory(element, this, this);
            } else if (parentElement.is(this.history.chapter.element)) {
                // a child scene of the actual chapter
                return this.history.chapter.childFactory(element, this.history.chapter, this);
            } else {
                // a 
                var parent = this.get(parentElement);
                return parent.childFactory(element, parent, this);
            }
        },
        enumerable: true
    },
    first: {
        get: /* Node */ function () {
            return this.get(this.root.children().first());
        },
        enumerable: true
    },
    jump: {
        value: function (/* jQuery element | selector String */ element) {
            /* Node */ var node = this.get(element);
            this.__visitor__.visit(node);
        },
        enumerable: true
    },
    /**
     * A visitor léptetése 
     * 
     */
    next: {
        value: /* Scene */ function () {
            this.__visitor__.next();
            
            /* if (this.scene.next) {
                return this.jump(this.scene.next);
            } else {
                var nextElement = this.scene.element.next();
                if (nextElement.length === 1) {
                    return this.jump(nextElement);
                } else {
                    return this.next(node.parent);
                }
            }*/
        },
        enumerable: true
    },
    check: {
        value: /* boolean */ function (element, gameContext) {
            var cstr = element.data("constrain");
            if (cstr) {
                return this.conditions[cstr](gameContext);
            } else {
                return true;
            }
        },
        enumerable: true
    },
    getNext: {
        value: function (/* Node */ node) {
            /* Node */ var nextNode = node.next;
            while (!nextNode.check(this.gameContext)) {
                nextNode = nextNode.alt || nextNode.next;
            }
            return nextNode;
        },
        enumerable: true
    },
    
    
    selector: {
        value: "#scenario",
        enumerable: true
    },
    childFactory: {
        value: new NodeFactory([Chapter]),
        enumerable: true
    }
});

function Node(/* jQuery element */ element, /* jQuery element */ parent, /* Scenario */ scenario) {
    /* jQuery element */ this.element = element;
    /* Fork */ this.parent = parent;
    /* Scenario */ this.scenario = scenario;
    
    /* string */ this.__id__ = null;
    /* String */ this.__nextId__ = element.data("next");
    /* String */ this.__altId__ = element.data("next");
    /* String */ this.__conditionName__ = element.data("constrain");
    
    /* Node */ this.__next__ = null;
    /* Node */ this.__alt__ = null;
    
}
Node.prototype = Object.create(Object.prototype, {
    constructor: { value: Node },
    /* Node */ next: {
        get: /* Node */ function () {
            if (!this.__next__) {
                if (this.__nextId__) {
                    this.__next__ = this.scenario.get(this.__nextId__);
                } else {
                    var nextElement = this.element.next();
                    if (nextElement.length === 1) {
                        this.__next__ = this.scenario.get(nextElement);
                    } else {
                        this.__next__ = this.parent.next;
                    }
                }
            }
            return this.__next__;
        },
        enumerable: true
    },
    /* Node */ alt: {
        get: /* Node */ function () {
            if (typeof this.__alt__ == 'undefined') {
                if (this.__altId__) {
                    this.__alt__ = this.scenario.get(this.__altId__);
                } else {
                    this.__alt__ = null;
                }
            }
            return this.__alt__;
        },
        enumerable: true
    },
    accept: {
        value: function (/* Visitor */ visitor) {},
        enumerable: true
    },
    check: {
        value: /* boolean */ function (gameContext) {
            if (this.__conditionName__) {
                return gameContext.conditions[cstr]();
            } else {
                return true;
            }
        },
        enumerable: true
    },
    id: {
        get: /* string */ function () {
            if (!this.__id__) {
                var id = this.element.attr("id");
                this.__id__ = id ? "#" + id :
                    this.parent.id + " :nth-child(" 
                    + (this.parent.element.children().index(this.element) + 1) 
                    + ")";
            }
            return this.__id__;
        },
        enumerable: true
    },
    chapter: {
        get: /* */ function () {
        },
        enumerable: true
    }
});


function Fork(element, parent, scenario) {
    Node.call(this, element, parent, scenario);
}
Fork.prototype = Object.create(Node.prototype, {
    constructor: { value: Fork }
});


function Scene(element, parent, scenario) {
    Node.call(this, element, parent, scenario);
}
Scene.prototype = Object.create(Node.prototype, {
    constructor: { value: Scene },
    handler: { value: SceneHandler, enumerable: true },
    selector: { value: "p", enumerable: true },
    chapter: {
        get: /* */ function () {
            return this.parent;
        },
        enumerable: true
    },
    accept: {
        value: function (/* Visitor */ visitor) {
            parentPrototype(this).accept(visitor);
            visitor.history.add(this);
        },
        enumerable: true
    }
});


function Chapter(element, parent, scenario) {
    Fork.call(this, element, parent, scenario);
}
Chapter.prototype = Object.create(Fork.prototype, {
    constructor: { value: Chapter },
    handler: { value: ChapterHandler, enumerable: true },
    selector: { value: "article", enumerable: true },
    accept: {
        value: function (/* Visitor */ visitor) {
            visitor.visit(this.childFactory(
                this.element.children().first(), this, this.scenario));
        },
        enumerable: true
    },
    childFactory: {
        value: NodeFactory([Scene, StageDesc]),
        enumerable: true
    },
    chapter: {
        get: /* */ function () {
            return this;
        },
        enumerable: true
    }
});

function StageDesc(element, parent, scenario) {
    Scene.call(this, element, parent, scenario);
}
StageDesc.prototype = Object.create(Scene.prototype, {
    constructor: { value: StageDesc },
    handler: { value: StageHandler, enumerable: true },
    selector: { value: "div.stage", enumerable: true },
    accept: {
        value: function (/* Visitor */ visitor) {
            visitor.visit(this.scenario.getNext(this));
        },
        enumerable: true
    },
    characters: {
        get: /* jQuery element */ function () {
            return this.element.children(".char");
        },
        enumerable: false
    },
    chapter: {
        get: /* */ function () {
            return this;
        },
        enumerable: true
    }
});
