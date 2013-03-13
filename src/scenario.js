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

function LocalRoutePartId(act_chapter, string) {
    return new Id(act_chapter.id.chapter, string, null);
}

function RoutePartRef(act_chapter, string) {
    var parts = string.split(':');
    switch (parts.length) {
        case 1:
            return new LocalRoutePartId(act_chapter, string);
        break;
        case 2:
            return new Id(parts[0], parts[1], null);
    }
}

function RoutePartId(string) {
    var parts = string.split(':');
    return new Id(parts[0], parts[1], null);
}

function ChapterId(string) {
    return new Id(string, null, null);
}

function ScreenId(routepart, string) {
    return new Id(routepart.id.chapter, routepart.id.routepart, string);
}

/*
 * 
 * 
 */
 
function RoutePartFactory(chapter, node) {
    switch (node.type) {
        case "seq":
            return new Sequence(chapter, node);
        case "br":
            return new Branching(chapter, node);
        case "sel":
            return new Selection(chapter, node);
        default: throw Error("Unknown type: " + node);
    }
}

function ScreenFactory(routepart, node) {
    switch (node.type) {
        case "text":
            return new Text(routepart, node);
        default: throw Error("Unknown type: " + node);
    }
}

/*
 *
 *
 */
 
function RoutePart(chapter, node) {
    this.chapter = chapter;
    this.__node__ = node;
    this.id = new LocalRoutePartId(chapter, node.id);
    this.next = new RoutePartRef(chapter, node.next);
}
RoutePart.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: Sequence }
});


function Sequence(chapter, node) {
    RoutePart.call(this, chapter, node);
    this.__sceneindex__ = 0;
}
Sequence.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: Sequence },
    type: {
        value: "seq",
        enumerable: true
    },
    hasNextScreen: {
        get: function () {
            return this.__sceneindex__ < this.__node__.c.length - 1;
        },
        enumerable: true
    },
    firstScreen: {
        get: function () {
            return this.screenFactory(this, this.__node__.c[0]);
        },
        enumerable: true
    },
    nextScreen: {
        get: function () {
            return this.screenFactory(this, this.__node__.c[++this.__sceneindex__]);
        },
        enumerable: true
    },
    handler: {
        value: SequenceHandler,
        enumerable: true
    },
    screenFactory: {
        value: ScreenFactory,
        enumerable: true
    }
});

function Branching(chapter, node) {
    RoutePart.call(this, chapter, node);
    this.options = {};
    
    for (var i = 0; i < this.__node__.opts.length; ++i) {
        var opt = this.opts[i];
        this.options[opt.id] = opt;
    }
}
Branching.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: Branching },
    type: {
        value: "br",
        enumerable: true
    },
    validOptions: {
        get: function () {
            var valid = [];
            for (var i = 0; i < this.__node__.opts.length; ++i) {
                var opt = this.__node__.opts[i];
                if (opt.cond) {
                    var cond = new Function("variables", opt.cond);
                    if (cond(GAMECONTEXT.variables)) {
                        valid.push(opt);
                    }
                } else {
                    valid.push(opt);
                }
            }
            return valid;
        },
        enumerable: true
    },
    handler: {
        value: FirstMatchingHandler,
        enumerable: true
    }
});

function Selection(chapter, node) {
    Branching.call(this, chapter, node);
}
Selection.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: Selection },
    type: {
        value: "sel",
        enumerable: true
    },
    handler: {
        value: SelectionHandler,
        enumerable: true
    }
});

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
            var rpart = this.__node__.c[id];
            return RoutePartFactory(this, rpart);
        },
        enumerable: true
    }
});

function Screen(routepart, node) {
    this.id = ScreenId(routepart, node.id);
    this.__node__ = node;
}
Screen.prototype = {
}

function Text(routepart, node) {
    Screen.call(this, routepart, node);
}
Text.prototype = Object.create(Screen.prototype, {
    type: { value: "text", enumerable: true },
    handler: { value: TextHandler, enumerable: true },
    text: {
        get: function () {
            return this.__node__.text;
        },
        enumerable: true
    },
    avatar: {
        get: function () {
            return this.__node__.avtr;
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
    
    this.entryId = new RoutePartId(DATA.META.ENTRYPOINT);
	
	this.chapters = {};
    
    this.chapter = null;
    this.__routepart__ = null;
	this.screen = null;
}
Scenario.prototype = {
    init: function () {
        this.jump(this.entryId);
    },
    getChapter: function (id) {
        return new Chapter(JSON.parse(DATA.CHAPTERS[id]));
    },
    jump: function (id) {
        var chapter;
        
        if (this.chapter && this.chapter.contains(id)) {
            chapter = this.chapter;
        } else {
            this.chapter = chapter = this.getChapter(id.chapter);
        }
        
        this.__routepart__ = chapter.get(id.routepart);
        this.__routepart__.handler.handle(this.__routepart__);
    }
/*	jump: function (routepartid) {
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
	}*/
};
