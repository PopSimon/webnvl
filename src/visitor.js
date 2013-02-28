function Visitor(gameContext) {
    /* GameContext */ this.context = gameContext;
    /* [Node] */ this.visited = [];
    /* Node */ this.next = this.context.scenario;
    /* Node */ this.actual = null;
}
Visitor.prototype = {
    constructor: Visitor,
    visit: function (node) {
        this.actual = node;
        node.accept(this);
    },
    step: function () {
        if (this.actual) {
            this.actual.release(this);
        } else {
            // throw Error("No actual node!");
        }
        
        if (this.next) {
            this.visit(this.next);
        } else {
            throw Error("No next node!");
        }
    }
};
