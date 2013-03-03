// var Handler = {
//    handle: function (node, viewport) {
//        throw Error("Method not implemented!");
//    }
//};

TextHandler = {
    handle: function (node, viewport) {
        viewport.text = node.element;
    }
};

StageHandler = {
    handle: function (node, viewport) {
        var character = node.element.data("character");
        var mood = node.element.data("mood");

        viewport.avatar = new Avatar(character, mood);
    }
};


function HandlerGroup(handlers) {
    this.handlers = handlers;
}
HandlerGroup.prototype = Object.create(Object.prototype, {
    constructor: { value: HandlerGroup },
    handle: {
        value: function (node, viewport) {
            for (var i = 0; i < this.handlers.length; ++i) {
                node = this.handlers[i].handle(node, viewport);
            }
        }
    }
});

var SceneHandler = new HandlerGroup([
    TextHandler
]);

var ChapterHandler = {
    handle: function (visitor, node) {
        var ambient = node.element.children("audio.ambient");
        if (ambient.length) {
            GAMECONTEXT.viewport.ambient = ambient;
        }
    }
};