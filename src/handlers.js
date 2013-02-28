TextHandler = {
    handle: function (visitor, node) {
        var character = node.element.data("character");
        var mood = node.element.data("mood");

        visitor.context.viewport.avatar = new Avatar(character, mood);
        visitor.context.viewport.text = node.element;
    }
};

SceneHandler = {
    handle: function (visitor, node) {
        var ambient = node.element.children("audio.ambient");
        if (ambient.length) {
            visitor.context.viewport.ambient = ambient;
        }
    }
};