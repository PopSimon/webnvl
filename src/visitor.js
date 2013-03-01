function History(serialised) {
    this.scene = null;
    this.chapter = null;
    this.__ids__ = [];
    this.visited = [];
    
    if (serialised) {
        var visited = JSON.parse(serialised);
        
        // we unshift the given ids-s (because of unshift we use the reversed order)
        for (var i = visited.length - 1; i >= 0 ; --i) {
            this.add(visited[i]);
        }
    } else {
        this.add(GAMECONTEXT.scenario.start);
    }
}
History.prototype = {
    max: 10,
    __addVisited__: function (node) {
        if (typeof node == "string") {
            this.__ids__.unshift(node);
            this.visited.unshift(GAMECONTEXT.scenario.get(node));
        } else {
            this.__ids__.unshift(node.id);
            this.visited.unshift(node);
        }
        if (this.__ids__.length > max) this.__ids__.length = max;
        if (this.visited.length > max) this.visited.length = max;
    },
    add: function (/* Node */ node) {
        node = typeof node == "string" ? GAMECONTEXT.scenario.get(node) : node;
        this.scene = node;
        this.__addVisited__(node);
    },
    toJSON: function () {
        return JSON.stringify(this.__ids__);
    }
};

function Visitor(history) {
    /* GameContext */ this.context = gameContext;
    /* History */ this.history = history || new History();
    /* Node */ this.actual = null;
}
Visitor.prototype = Object.create(Object.prototype, {
    constructor: { value: Visitor },
    visit: { 
        value: function (node) {
            this.history.add(node);
            node.accept(this);
        },
        enumerable: true
    },
    next: {
        value: function () {
            this.visit(this.actual.next);
            GAMECONTEXT.viewport.handle(this.actual);
        },
        enumerable: true
    },
    actual: {
        get: function () {
            return this.history.actual;
        },
        enumerable: true
    } 
});
