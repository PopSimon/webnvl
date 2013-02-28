"use strict";

function Scenario(/* jQuery element */ element, gameContext) {
    this.root = element;
    // Sequence.call(this, element, null);
    this.chapter = null;
    this.scene = null;
    this.gameContext = this.gameContext;
    this.load(gameContext);
}
Scenario.prototype = Object.create(Sequence.prototype, {
    constructor: { value: Scenario },
    getElement: {
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
        },
        enumerable: true
    },
    get: {
        value: /* Node */ function (/* jQuery element | selector String */ element) {
            element = this.getElement(element);
            
            var parentElement = element.parent();
            if (parentElement === this.root) {
                // a chapter
                return this.factory.create(element, this, this);
            } else if (parentElement === this.chapter.element) {
                // a child scene of the actual chapter
                return this.chapter.factory.create(element, this.chapter);
            } else {
                // a 
                var parent = this.get(parentElement);
                return parent.factory.create(element, parent);
            }
        },
        enumerable: true
    },
    jump: {
        value: function (/* jQuery element | selector String */ element) {
            /* Node */ var node = this.get(element);
            this.visitor.visit(node);
        },
        enumerable: true
    },
    /**
     * A visitor léptetése 
     * 
     */
    next: {
        value: /* Scene */ function () {
            visitor.visit(this.getNext(visitor.actual));
            
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
    id: {
        get: function () {
            return this.element.attr("id");
        },
        enumerable: true
    }
    
    selector: {
        value: "section",
        enumerable: true
    },
    factory: {
        value: new NodeFactory([Chapter, CutScene]),
        enumerable: true
    },
    release: {
        value: function (/* Visitor */ visitor) {
            this.index = 0;
        },
        enumerable: true
    }
});

function Node(/* jQuery element */ element, /* jQuery element */ parent) {
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
Node.prototype = Object.create({ Object.prototype, {
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
                    }
                    this.__next__ = this.parent.next;
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
        value: function (/* Visitor */ visitor) {
            visitor.actual = this;
        },
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
                var index = this.parent.indexOf(this) - 1;
                if (index < 0) throw Error("Element is not child of it's parent!");
                this.__id__ = this.element.attr("id") || this.parent.id + ":nth-child("  + ")";
            }
            return this.__id__;
        },
        enumerable: true
    }
});


function Scene(element, parent, scenario) {
    Node.call(this, element, parent, scenario);
}
Scene.prototype = Object.create(Node.prototype, {
    constructor: { value: Scene }
    
});






function Constr


function NodeFactory(constructors) {
    if (constructors.length < 1) {
        throw Error("No constructors!");
    }
    this.constructors = constructors;
    this.selector = this.constructors[0].prototype.selector;
    for (var i = 1; i < constructors.length; ++i) {
        this.selector += ", " + constructor[i].prototype.selector;
    }
}
NodeFactory.prototype = {
    constructor: NodeFactory,
    create: function (/* jQuery element */ element, /* jQuery element */ parent) {
        for (var i = 0; i < this.constructors.length; ++i) {
            var constructor = this.constructors[i];
            if (element.is(constructor.prototype.selector)) {
                return new constructor(element, parent);
            }
        }
        return null;
    }
}


function Node(/* jQuery element */ element, /* jQuery element */ parent) {
    /* jQuery element */ this.element = element;
    /* Fork */ this.parent = parent;
    /* String */ this.id = element.attr("id") || parent.getId(this);
    /* String */ this.next = element.data("next");
}
Node.prototype = {
    constructor: Node,
    accept: function (/* Visitor */ visitor) {
        if (this.handler) {
            this.handler.handle(visitor, this);
        }
    }
    release: function (/* Visitor */ visitor) {
        if (this.next) {
            visitor.next = this.next;
        } else {
            this.parent.reaccept(visitor);
        }
    }
}

function Leaf(/* jQuery element */ element, /* jQuery element */ parent) {
    Node.call(this, element, parent);
}
Leaf.prototype = Object.create(Node.prototype, {
    constructor: {
        value: Leaf
    },
    accept: {
        value: function (/* Visitor */ visitor) {
            Object.getPrototypeOf(this).accept(visitor);
            this.release(visitor);
        },
        enumerable: true
    }
});

function Fork(/* jQuery element */ element, /* jQuery element */ parent) {
    Node.call(this, element, parent);
    this.children = element.children(this.childrenSelector);
}
Fork.prototype = Object.create(Node.prototype, {
    constructor: {
        value: Fork,
        enumerable: true,
    },
    forward: {
        value: function (/* Visitor */ visitor, /* jQuery element */ child) {
            visitor.visit(this.factory.create(child, this));
        },
        enumerable: true,
    },
    reaccept: {
        value: function (/* Visitor */ visitor, /* jQuery element */ child) {
            throw Error("Not Implemented!");
        },
        enumerable: true,
    },
});

function Sequence(/* jQuery element */ element, /* jQuery element */ parent) {
    Fork.call(this, element, parent);
    this.index = 0;
}
Sequence.prototype = Object.create(Fork.prototype, {
    constructor: {
        value: Sequence
    },
    accept: {
        value: function (/* Visitor */ visitor) {
            Object.getPrototypeOf(this).accept(visitor);
            this.forward(visitor, this.children.eq(this.index));
            ++this.index;
        },
        enumerable: true
    },
    reaccept: {
        value: function (/* Visitor */ visitor, /* jQuery element */ child) {
            if (this.index < this.children.length) {
                this.forward(visitor, this.children.eq(this.index));
                ++this.index;
            } else {
                this.release(visitor);
            }
        },
        enumerable: true,
    }
});

function Alternative(/* jQuery element */ element, /* jQuery element */ parent) {
    Fork.call(this, element, parent);
}
Alternative.prototype = Object.create(Fork.prototype, {
    constructor: {
        value: Alternative,
    },
    consult: {
        value: function (/* Visitor */ visitor) {

        },
        enumerable: true
    },
    accept: {
        value: function (/* Visitor */ visitor) {
            Object.getPrototypeOf(this).accept(visitor);
            
            // we check the branches and choose the first matchin one
            // the last one is the "fallback" branch, we don't need to check that
            for (var i = 0; i < this.children.length - 1; ++i) {
                var branch = this.children.eq(i);
                var conditionName = branch.data("condition");
                if (!conditionName) {
                    throw Error("No condition in branch! " + branch);
                }
                var condition = visitor.context.conditions[conditionName];
                if (!condition) {
                    throw Error("No such condition! " + branch);
                }
                if (condition(visitor) == true) {
                    this.forward(branch);
                    return;
                }
            }
            
            // if we haven't found a matching condition, we go with the default branch (the last one)
            this.forward(this.children.eq(this.children.length-1));
        },
        enumerable: true
    },
    reaccept: {
        value: function (/* Visitor */ visitor) {
            this.release(visitor);
        },
        enumerable: true
    }
});

/*
 *
 */

function Paragraph(/* jQuery element */ element, /* jQuery element */ parent) {
    Leaf.call(this, element, parent);
}
Paragraph.prototype = Object.create(Leaf.prototype, {
    constructor: {
        value: Paragraph
    },
    selector: {
        value: "p",
        enumerable: true
    },
    handler: {
        value: ParagraphHandler,
        enumerable: true
    }
});

function Stage(/* jQuery element */ element, /* jQuery element */ parent) {
    Leaf.call(this, element, parent);
}
Stage.prototype = Object.create(Leaf.prototype, {
    constructor: {
        value: Stage
    },
    selector: {
        value: "div",
        enumerable: true
    },
    handler: {
        value: StageHandler,
        enumerable: true
    }
});

function CutScene(/* jQuery element */ element, /* jQuery element */ parent) {
    Leaf.call(this, element, parent);
}
CutScene.prototype = Object.create(Leaf.prototype, {
    constructor: {
        value: CutScene
    },
    selector: {
        value: "video",
        enumerable: true
    },
    handler: {
        value: VideoHandler,
        enumerable: true
    }
});

function Choice(/* jQuery element */ element, /* jQuery element */ parent) {
    Alternative.call(this, element, parent);
}
Choice.prototype = Object.create(Alternative.prototype, {
    constructor: {
        value: Choice
    },
    selector: {
        value: "ul",
        enumerable: true
    },
    handler: {
        value: ChoiceHandler,
        enumerable: true
    }
});

function Chapter(/* jQuery element */ element, /* jQuery element */ parent) {
    Sequence.call(this, element, parent);
}
Chapter.prototype = Object.create(Sequence.prototype, {
    constructor: { value: Chapter },
    selector: {
        value: "article",
        enumerable: true
    },
    factory: {
        value: new NodeFactory([Paragraph, CutScene, Choice]),
        enumerable: true
    }
});

function Scenario(/* jQuery element */ element) {
    Sequence.call(this, element, null);
}
Scenario.prototype = Object.create(Sequence.prototype, {
    constructor: { value: Scenario },
    selector: {
        value: "section",
        enumerable: true
    },
    factory: {
        value: new NodeFactory([Chapter, CutScene]),
        enumerable: true
    },
    release: {
        value: function (/* Visitor */ visitor) {
            this.index = 0;
        },
        enumerable: true
    }
});

