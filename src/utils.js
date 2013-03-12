function parentPrototype(object) {
    var proto = Object.getPrototypeOf(object);
    if (proto === Object.prototype) {
        return proto;
    } else {
        return Object.getPrototypeOf(proto);
    }
}
