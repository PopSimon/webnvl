"use strict";

var TypeWriter = {
    __handles__: [],
    out: function (element) {
        element[0].textContent = "";
    },
    in: function (element, text, time) {
        var actpos = 0;
        var towrite = "";
        var writtenpos = 0;
        var length = text.length;
        var requested = false;
        
        function animate() {
            element[0].textContent += text.substring(writtenpos, actpos);
            writtenpos = actpos;
            requested = false;
        }
        
        var handles = this.__handles__;
        var handle = setInterval(function () {
            if (length <= actpos) {
                clearInterval(handle);
                handles.splice(handles.indexOf(handle), 1);
                return;
            }
            
            ++actpos;
            
            // the text changed, we request a repaint
            if (!requested) {
                requestAnimationFrame(animate);
                requested = true;
            }
        }, time);
        
        this.__handles__.push(handle);
    },
    clear: function () {
        for (var i=0; i < this.__handles__.length; ++i) {
            clearInterval(this.__handles__[i]);
        }
        this.__handles__.length = 0;
    }
};
