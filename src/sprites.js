function setAnimation(element, name, duration, tfunc) {
	element.css("-webkit-animation", name + duration + tfunc);
}

function Sprite(spriteDesc) {
	this.id = spriteDesc.id;
	this.src = spriteDesc.src;
	this.top = spriteDesc.top;
	this.left = spriteDesc.left;
	this.right = spriteDesc.right;
	this.bottom = spriteDesc.bottom;
	this.width = spriteDesc.width;
	this.height = spriteDesc.height;
	this.transition = spriteDesc.transition;
	
	this.element = this.createElement();
}
Sprite.prototype = {
	constructor: Sprite,
	jproto: $('<img src="img/missing.jpg"/>'),
	createElement: function () {
		var element = this.jproto.clone();
		element.attr("id", this.id);
		element.attr("src", this.src);
		if (this.cssClass) element.addClass(this.cssClass);
		
		if (this.top) element.css("top", this.top);
		if (this.left) element.css("left", this.left);
		if (this.right) element.css("right", this.right);
		if (this.bottom) element.css("bottom", this.bottom);
		if (this.width) element.css("width", this.width);
		if (this.height) element.css("height", this.height);
		
		if (this.transition) setAnimation(element, this.transition.name, 
			this.transition.duration, this.transition.tfunc);
		
		return element;
	},
	toJSON: function () {
		var result = {};
		result.src = this.src;
		result.id = this.id;
		
		if (this.cssClass) result.cssClass = this.cssClass;
		
		if (this.top) result.top = this.top;
		if (this.left) result.left = this.left;
		if (this.right) result.right = this.right;
		if (this.bottom) result.bottom = this.bottom;
		if (this.width) result.width = this.width;
		if (this.height) result.height = this.height;
		
		if (this.transition) result.transition = this.transition;
	
		return JSON.stringify(result);
	}
}