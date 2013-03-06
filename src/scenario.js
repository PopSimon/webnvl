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
}
Scenario.prototype = {
	getChapter: function (chapterid) {
		var chapter = this.chapters[chapterid];
		if (!chapter) {
			this.chapter[chapterid] = chapter = DATA.CHAPTERS[chapterid];
		}
		return chapter;
	},
	getScene: function (chapterid, sceneid) {
		var chapter = this.getChapter(chapterid);
		return chapter.content[i];
	},
	getText: function (chapterid, sceneid, textid) {
		var text = this.getScene(chapterid, sceneid);
		return text.content[i];
	}
};