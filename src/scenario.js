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
    this.routepart = null;
    this.__screenIndex__ = 0;
	this.screen = null;
}
Scenario.prototype = {
    splitId: function (id) {
		if (typeof id == 'string') {
			return id.split(".");
		} else {
			return [id];
		}
	},
	get: function (id) {
        var ids = this.splitID(id);
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
	getRoutePart: function (id1, id2) {
		var routepartid;
		
		if (!id2) {
			routepartid = id1;
			chapter = this.chapter;
		} else {
			routepartid = id2;
			chapter = this.getChapter(id1);
		}
		
		return chapter.content[routepartid];
	},
	getScreen: function (id1, id2, id3) {
		var rp = this.getRoutePart(id1, id2);
		return rp.content[id3];
	},
	jump: function (routepartid) {
		var ids = this.splitID(routepartid);
        switch (ids.length) {
            case 1:
                this.routepart = this.chapter.content[ids[0]];
				this.__screenIndex__ = 0;
            break;
            case 2:				
				this.chapter = this.getChapter(ids[0]);
				this.routepart = this.chapter.content[ids[1]];
				this.__screenIndex__ = 0;
            break;
			case 3:
				this.chapter = this.getChapter(ids[0]);
				this.routepart = this.chapter.content[ids[1]];
				this.__screenIndex__ = ids[2];
			break;
            default: 
                throw Error("Bad id!");
        }
		
		this.screen = this.routepart.content[this.__screenIndex__];
		
		this.handle(this.screen);
	},
	next: function () {
		if (this.__screenIndex__ < this.routepart.content.length) {
			this.jump(++this.routepart.content.length);
		}
	},
	handle: function (screen) {
	}
};
