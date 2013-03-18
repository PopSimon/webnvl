"use strict";

function Id(chapter, routepart, screen) {
    this.chapter = chapter;
    this.routepart = routepart || null;
    this.screen = screen || null;
}
Id.prototype = {
    toString: function () {
        return this.chapter + !this.routepart ? "" :
        ":" + this.routepart + !this.screen ? "" : ":" + this.screen;
    }
}

function RoutePartId(string) {
    var parts = string.split(':');
    var chapter;
    var routepart;
    
    switch (parts.length) {
        case 1:
            chapter = null;
            routepart = parts[0];
        break;
        case 2:
            chapter = parts[0];
            routepart = parts[1];
        break;
        default: throw Error("Bad routepart id: " + string);
    }
    
    Id.call(this, chapter, routepart, null);
}
RoutePartId.prototype = Object.create(Id.prototype, {
    isLocal: {
        get: function () {
            return this.chapter === null;
        },
        enumerable: true
    }
});

function ChapterId(string) {
    return new Id(string, null, null);
}

function ScreenId(routepart, string) {
    return new Id(routepart.id.chapter, routepart.id.routepart, string);
}


function Chapter(node) {
    this.id = ChapterId(node.id);
    this.__node__ = node;
}
Chapter.prototype = Object.create(Object.prototype, {
    type: { value: "chap", enumerable: true },
    contains: {
        value: function (id) {
            return !id.chapter || id.chapter === this.id;
        },
        enumerable: true
    },
    get: {
        value: function (id) {
            return this.__node__.c[id];
        },
        enumerable: true
    }
});


function Scenario(/* jQuery element */ element) {
	this.characters = {};
	var charlist = JSON.parse(DATA.META.CHARACTERS);
	for (var i = 0; i < charlist.length; ++i) {
		var character = charlist[i];
		this.characters[character.id] = character;
	}
    
    this.entryId = DATA.META.ENTRYPOINT;
	
	this.chapters = {};
    
    this.chapter = null;
    this.__routepart__ = null;
	this.screen = null;
}
Scenario.prototype = {
    init: function () {
        this.jumpToRoutePart(this.entryId);
    },
    getChapter: function (id) {
        return new Chapter(JSON.parse(DATA.CHAPTERS[id]));
    },
    jumpToRoutePart: function (id) {
        id = new RoutePartId(id);
        
        if (!id.isLocal || !this.chapter) {
            this.chapter = this.getChapter(id.chapter);
        }
        
        this.__routepart__ = this.chapter.get(id.routepart);
        var handler = new Handler(this.__routepart__);
        handler.handle();
    }
};
