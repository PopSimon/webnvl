"use strict";
var GAMECONTEXT = null;
function init() {
    // var textBox = $("#textbox");
    var viewport = new ViewPort();
    var scenario = new Scenario($(Scenario.prototype.selector));
    GAMECONTEXT = new GameContext(scenario, viewport);
    GAMECONTEXT.load();
    scenario.init();
    
    function onSpaceDown(e) {
        e.preventDefault();
        console.log("next");
        scenario.next();
    }
    
    function onBackspaceDown(e) {
        e.preventDefault();
        viewport.toggleUI();
    }

    function globalKeyDownListener(e) {
        switch (e.keyCode) {
            case 32: // space
                onSpaceDown(e);
            break;
            case 8: // backspace
                onBackspaceDown(e);
            default:
            break;
        }
    }
    
    window.addEventListener("keydown", globalKeyDownListener, false);
    
    function onWindowResize() {
        viewport.reset();
    }
    
    window.addEventListener('resize', onWindowResize, false);
}

window.onload = init;
