"use strict";

var ViewPort = {
	target: null
}

var prefixes = {
	animation: "-webkit-animation"
};

function animate(/* jQuery element */ element) {
	var animname = element.data("animation");
	if (animname) {
		ViewPort.target.css(prefixes.animation, animname + " 2s");
	}
}

window.onload = function () {
	ViewPort.target = $("#target");
	setTimeout(function () {
		animate($("#source"));
	})
}