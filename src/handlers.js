// var Handler = {
//    handle: function (node, viewport) {
//        throw Error("Method not implemented!");
//    }
//};

var handleScene = (function () {
    var TextHandler = {
        handleName: function (textNode) {
            if (textNode.character) {
                var character = GAMECONTEXT.characters[textNode.character];
                GAMECONTEXT.viewport.setSpeaker(character);
            } else {
                GAMECONTEXT.viewport.setSpeaker(null);
            }
        },
        handleAvatar: function (textNode) {
            if (textNode.character && textNode.avatar) {
                var character = GAMECONTEXT.characters[textNode.character];
                GAMECONTEXT.viewport.setAvatar(character, textNode.avatar);
            } else {
                GAMECONTEXT.viewport.setAvatar(null, null);
            }
        },
        handle: function (textNode) {
            GAMECONTEXT.viewport.setText(textNode.text);
        }
    };

    var StageHandler = {
        handle: function (stage) {
            if (stage.clear) {
                this.clearCharacterSprites();
            }
            
            if (stage.remove && stage.remove.length > 0) {
                this.removeCharacterSprites(stage.remove);
            }
            
            if (stage.add && stage.add.length > 0) {
                this.addCharacterSprites(stage.add);
            }
        },
        addCharacterSprites: function (spriteDescs) {
            var sprites = {};
            for (var i = 0; i < spriteDescs.length; ++i) {
                var s = spriteDescs[i];
                sprites.[s.id] = new CharacterSprite(s);
            }
            GAMECONTEXT.viewport.stage.characters.add(sprites);
        },
        removeCharacterSprite: function (spriteIds) {
            GAMECONTEXT.viewport.stage.characters.remove(spriteIds);
        },
        clearCharacterSprites: function () {
            GAMECONTEXT.viewport.stage.characters.clear();
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
