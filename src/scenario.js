"use strict";

function parentPrototype(object) {
    var proto = Object.getPrototypeOf(object);
    if (proto === Object.prototype) {
        return proto;
    } else {
        return Object.getPrototypeOf(proto);
    }
}






function Scenario(/* jQuery element */ element) {
    this.characters = {};
    var charlist = JSON.parse(DATA.META.CHARACTERS);
    for (var i=0; i < charlist.length; ++i) {
        var character = charlist[i];
        this.characters[character.id] = character;
    }
    
    this.chapters = {};
}
Scenario.prototype = {
    getChapter: function (chapterid) {
        if (!this.chapters[chapterid]) {
            var raw = DATA.CHAPTERS[chapterid];
            if (!raw) {
                return null;
            }
            this.chapters[chapterid] = JSON.parse(raw);
        }
        
        return this.chapters[chapterid];
    },
    getScene: function (chapterid, sceneid) {
        var chapter = this.getChapter(chapterid);
        var scene = chapter.content[sceneid];
        return scene;
    },
    getText: function (chapterid, sceneid, textid) {
        var scene = this.getScene(chapterid, sceneid);
        var text = scene.content[textid];
        return text;
    }
}
