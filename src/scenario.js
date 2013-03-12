"use strict";

"use strict";

function Id(id) {
    var parts = id.split(":");
    switch (parts.length) {
        case 1:
            this.chapter = parts[0];
            this.routepart = parts[1];
            this.scene = parts[3];
        case 2:
            this.chapter = parts[0];
            this.routepart = parts[1];
            this.scene = parts[3];
        case 3:
            this.chapter = parts[0];
            this.routepart = parts[1];
            this.scene = parts[3];
        default: throw Error("Bad id: " + id);
    }

}

/*
 *
 *
 */
 
function RoutePart(node) {
    this.__node__ = node;
    this.id = new Id(node.id);
    this.next = new Id(node.next);
}
RoutePart.prototype = Object.create(RoutePart.prototype, {
    constructor: { value: Sequence }
});


function Sequence(node) {
    RoutePart.call(this, node);
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
            return this.SceneFactory(this.__node__.c[0]);
        },
        enumerable: true
    },
    nextScreen: {
        get: function () {
            return this.SceneFactory(this.__node__.c[++this.__sceneindex__]);
        },
        enumerable: true
    },
    handler: {
        value: SequenceHandler,
        enumerable: true
    }
});

function Branching(node) {
    RoutePart.call(this, node);
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

function Selection(node) {
    Branching.call(this, node);
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

function RoutePartFactory(node) {
    switch (node.type) {
        case "seq":
            return new Sequence(node);
        case "br":
            return new Branching(node);
        case "sel":
            return new Selection(node);
        default: throw Error("Unknown type: " + node);
    }
}




function Chapter(node) {
    this.id = node.id;
    this.__node__ = node;
}
Chapter.prototype = {
    type: { value: "chap", enumerable: true },
    contains: function (id) {
        return !id.chapter || id.chapter === this.id;
    },
    get: function (id) {
        var rpart = this.__node__.c[id];
        return RoutePartFactory(rpart);
    }
}


function Scenario(/* jQuery element */ element) {
	this.characters = {};
	var charlist = JSON.parse(DATA.META.CHARACTERS);
	for (var i = 0; i < charlist.length; ++i) {
		var character = charlist[i];
		this.characters[character.id] = character;
	}
    
    this.entryId = new Id(DATA.META.ENTRYPOINT);
	
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
        this.__routepart__.handler.handle(__routepart__);
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
