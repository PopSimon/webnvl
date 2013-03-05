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
    $.ajax({
        type: "GET",
        url: "overview.xml",
        dataType: "xml",
        success: (function(xml) {
            this.setOverview(xml);
        }).bind(this)
    });
    
    var overview = 
    this.chapter = null;
    this.history = null;//new History();
}
Scenario.prototype = {
    setOverview: function (xml) {
        var overview = $.parseXML(xml);
    }
}