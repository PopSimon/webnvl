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
	for (var i = 0; i < charlist.length; ++i) {
		var character = charlist[i];
		this.characters[character.id] = character;
	}
	
	this.chapters = {};
    
    this.chapter = null;
    this.sequence = null;
    this.screen = null;
}
Scenario.prototype = {
    get: function (id) {
        var ids = id.split(".");
        switch (ids.length) {
            case 1:
                return this.getChapter(ids[0]);
            break;
            case 2:
                return this.getSequence(ids[0], ids[1]);
            break;
            case 3:
                return this.getScreen(ids[0], ids[1], ids[2]);
            break;
            default: 
                throw Error("Bad id!");
        }
    },
	getChapter: function (chapterid) {
		var chapter = this.chapters[chapterid];
		if (!chapter) {
			this.chapter[chapterid] = chapter = DATA.CHAPTERS[chapterid];
		}
		return chapter;
	},
	getSequence: function (chapterid, sceneid) {
		var chapter = this.getChapter(chapterid);
		return chapter.content[i];
	},
	getScreen: function (chapterid, sceneid, textid) {
		var text = this.getScene(chapterid, sceneid);
		return text.content[i];
	}
};
