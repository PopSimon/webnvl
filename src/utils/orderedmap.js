"use strict";

var OrderedMaps = {
    construct: function (/* IOrderedMap */ map) {
        map.__map__ = {};
        map.__list__ = [];
    },
    add: function (/* IOrderedMap */ map, /* string */ key, /* Object */ obj) {
        map.__map__[key] = obj;
        map.__list__.push(obj);
    },
    remove: function (/* IOrderedMap */ map, /* string */ key) {
        var obj = map.__map__[key];
        delete map.__map__[key];
        removeItem(map.__list__, obj);
        return obj;
    },
    indexOf: function (/* IOrderedMap */ map, /* string */ key) {
        return map.__list__.indexOf(animation.name);
    },
    get: function (/* IOrderedMap */ map, /* string */ key) {
        return map.__map__[key];
    }
};