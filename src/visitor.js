function History(serialised) {
    this.screen = serialised ? serialised.screen : null;
    this.section = serialised ? serialised.section : null;
    this.chapter = serialised ? serialised.chapter : null;
    
    this.visited = serialised ? serialised.visited : [];
    this.cache = []
    
    for (var i = 0; i < this.visited.length; ++i) {
        
    }
    
    if (serialised) {
        var visited = JSON.parse(serialised);
        
        // we unshift the given ids-s (because of unshift we use the reversed order)
        for (var i = visited.length - 1; i >= 0 ; --i) {
            this.add(visited[i]);
        }
    }
}
History.prototype = {
    MAX: 3,
    __addVisited__: function (node) {
        if (typeof node == "string") {
            this.__ids__.unshift(node);
            this.visited.unshift(GAMECONTEXT.scenario.get(node));
        } else {
            this.__ids__.unshift(node.id);
            this.visited.unshift(node);
        }
        if (this.__ids__.length > this.MAX) this.__ids__.length = this.MAX;
        if (this.visited.length > this.MAX) this.visited.length = this.MAX;
    },
    add: function (/* Node */ node) {
        node = typeof node == "string" ? GAMECONTEXT.scenario.get(node) : node;
        this.actual = node;
        this.chapter = node.chapter;
        this.__addVisited__(node);
    },
    toJSON: function () {
        return JSON.stringify(this.__ids__);
    }
};

function Visitor(scenario, history) {
    /* Scenario */ this.scenario = scenario;
    /* History */ this.history = history || new History();
}
Visitor.prototype = Object.create(Object.prototype, {
    constructor: { value: Visitor },
    visit: { 
        value: function (node) {
            GAMECONTEXT.viewport.handle(node);
            node.accept(this);
        },
        enumerable: true
    },
    next: {
        value: /* Node */ function () {
            this.visit(this.scenario.getNext(this.actual));
        },
        enumerable: true
    },
    actual: {
        get: /* Node */ function () {
            return this.history.actual;
        },
        enumerable: true
    } 
});
