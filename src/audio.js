"use strict";

var MathHelper = {
    easeOutQuad: function(t, b, c, d) {
        t /= d;
        return -c * t*(t-2) + b;
    },
    easeInQuad: function (t, b, c, d) {
        t /= d;
        return c*t*t + b;
    }
}

function AudioModule() {
    var types = {
        'audio/ogg; codecs="vorbis"': ".ogg",
        "audio/mp4": ".m4a"
    };
    
    for (var i in types) {
        var cplt = (new Audio()).canPlayType(i);
        if (cplt == "probably" || cplt == "maybe") {
            var extension = types[i];
            break;
        }
    }
    
    if (!extension) {
        throw Error("Not compatible with given audio types!");
    }

    function Channel(directory, fadeDuration) {
        this.__audio__ = null;
        this.__directory__ = directory;
        this.__volume__ = 1.0;
        this.fadeDuration = fadeDuration || 0;
    }
    Channel.prototype = Object.create(Object.prototype, {
        start: {
            value: function () {
                if (this.__audio__) this.__audio__.play();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        stop: {
            value: function () {
                if (this.__audio__) this.__audio__.pause();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        pause: {
            value: function () {
                if (this.__audio__) this.__audio__.pause();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        play: {
            value: function () {
                if (this.__audio__) this.__audio__.play();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        toggle: {
            value: function () {
                if (this.__audio__) {
                    if (this.__audio__.paused) {
                        this.__audio__.play();
                    } else {
                        this.__audio__.pause();
                    }
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        mute: {
            value: function () {
                if (this.__audio__) this.__audio__.muted = true;
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        toggleMute: {
            value: function () {
                if (this.__audio__) this.__audio__.muted = !this.__audio__.muted;
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        fadeProcIntervalTime: {
            value: 60,
            writable: false,
            enumerable: false,
            configurable: false
        },
        fadeOut: {
            value: function (duration, callback) {
                if (!this.__audio__) return;
                
                if (duration instanceof Function) {
                    callback = duration;
                    duration = this.fadeDuration;
                } else {
                    duration = duration || this.fadeDuration;
                }
                
                if (duration > this.fadeProcIntervalTime) {
                    var startvol = this.__volume__;
                    var delta = -this.__volume__;
                    var start = Date.now();
                    
                    var ihandle;
                    ihandle = setInterval((function () {
                        var elapsed = Date.now() - start;
                        var vol = MathHelper.easeOutQuad(elapsed, startvol, delta, duration);
                        if (elapsed >= duration) {
                            this.stop();
                            clearInterval(ihandle);
                            if (callback) callback();
                        } else {
                            this.__audio__.volume = vol;
                        }
                    }).bind(this), this.fadeProcIntervalTime);
                } else {
                    this.stop();
                    if (callback) callback();
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        fadeIn: {
            value: function (duration, callback) {
                if (!this.__audio__) return;
                
                if (duration instanceof Function) {
                    callback = duration;
                    duration = this.fadeDuration;
                } else {
                    duration = duration || this.fadeDuration;
                }
                
                if (duration > this.fadeProcIntervalTime) {
                    var start = Date.now();
                    var ihandle;
                    ihandle = setInterval((function () {
                        var elapsed = Date.now() - start;
                        var vol = MathHelper.easeInQuad(elapsed, 0.0, this.__volume__, duration);
                        if (elapsed >= duration) {
                            clearInterval(ihandle);
                            if (callback) callback();
                        } else {
                            this.__audio__.volume = vol;
                        }
                    }).bind(this), this.fadeProcIntervalTime);
                    this.__audio__.volume = 0;
                    this.start();
                } else {
                    this.__audio__.volume = this.__volume__;
                    this.start();
                    if (callback) callback();
                }
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        src: {
            get: function () {
                if (this.__audio__) return this.__audio__.src;
                else return null;
            },
            set: function (uri) {
                if (this.__audio__) {
                    this.fadeOut((function () {
                        this.__audio__.src = this.__directory__ + uri + extension;
                        this.fadeIn();
                    }).bind(this));
                } else {
                    this.__audio__ = new Audio(this.__directory__ + uri + extension);
                    this.fadeIn();
                }
            },
            enumerable: true,
            configurable: false
        },
        volume: {
            get: function () {
                if (this.__audio__) return this.__volume__;
            },
            set: function (volume) {
                this.__volume__ = volume;
                if (this.__audio__) this.__audio__.volume = volume;
            },
            enumerable: true,
            configurable: false
        }
    });
    
    var ambientPath = "audio/bg/";
    var characterPath = "audio/char/";
    function getAmbientUri(filename) {
        return basePath + ambientBasePath + filename + extension;
    }
    
    var result = Object.create(Object.prototype, {
        constructor: {
            value: AudioModule,
            writable: false,
            enumerable: false,
            configurable: false
        },
        ambient: {
            value: new Channel(ambientPath, 3000),
            writable: false,
            enumerable: true,
            configurable: false
        },
        character: {
            value: new Channel(characterPath, 200),
            writable: false,
            enumerable: true,
            configurable: false
        },
        toggleMute: {
            value: function () {
                this.ambient.toggleMute();
                this.character.toggleMute();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        pause: {
            value: function () {
                this.ambient.pause();
                this.character.pause();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        play: {
            value: function () {
                this.ambient.play();
                this.character.play();
            },
            writable: false,
            enumerable: true,
            configurable: false
        },
        toggle: {
            // don't do it! buggy because setinterval calls back even in hidden mode!
            value: function () {
                this.ambient.toggle();
                this.character.toggle();
            },
            writable: false,
            enumerable: true,
            configurable: false
        }
    });
    
    return result;
}