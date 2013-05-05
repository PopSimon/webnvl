"use strict";

function CssTransition(/* AnimationDesc */ animdesc) {
    CssAnimation.call(this, animdesc);
    this.fillMode = this.fillMode || "both";
}
CssTransition.prototype = Object.create(CssAnimation.prototype, {});