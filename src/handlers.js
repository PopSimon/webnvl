// var Handler = {
//    handle: function (node, viewport) {
//        throw Error("Method not implemented!");
//    }
//};

var handleScene = (function () {
    var TextHandler = {
        handleName: function (element) {
            var charid = element.attr("char");
            if (charid) {
                var character = GAMECONTEXT.characters[charid];
                GAMECONTEXT.viewport.setSpeaker(character);
            } else {
                GAMECONTEXT.viewport.setSpeaker(null);
            }
        },
        handleAvatar: function (element) {
            var charid = element.attr("char");
            var avatar = element.attr("avatar");
            if (charid && avatar) {
                var character = GAMECONTEXT.characters[charid];
                GAMECONTEXT.viewport.setAvatar(character, avatar);
            } else {
                GAMECONTEXT.viewport.setAvatar(null, null);
            }
        },
        handle: function (element) {
            GAMECONTEXT.viewport.setText(element.text());
        }
    };

    var StageHandler = {
        handle: function (element) {
            if (element.attr("clear")) {
                this.clearCharacterSprites();
            }
            
            element.find("remove").each((function (index, element) {
                this.removeCharacterSprite(element);
            }).bind(this));
            
            element.find("add").each((function (index, element) {
                this.addCharacterSprite(element);
            }).bind(this));
        },
        addCharacterSprite: function (element) {
            var sprite = new Sprite(
                element.attr("id"), element.attr("src"), element.attr("class"), 
                element.attr("left"), element.attr("top"), element.attr("fade"), 
                element.attr("animation"));
            GAMECONTEXT.viewport.stage.add(sprite);
        },
        removeCharacterSprite: function (element) {
            GAMECONTEXT.viewport.stage.remove(element.attr("id"), element.attr("fade"));
        },
        clearCharacterSprites: function () {
            GAMECONTEXT.viewport.stage.clear();
        }
    };
    
    function handleBackground(element) {
        GAMECONTEXT.viewport.setBackground(element.attr("src"), element.attr("fade"));
    }
    
    return function (element) {
        var bg = element.find("background");
        if (background) handleBackground(bg);
        var stage = element.find("stage");
        if (stage) StageHandler.handle(stage);
        var text = element.find("text");
        if (text) StageHandler.handle(text);
    }
})();
