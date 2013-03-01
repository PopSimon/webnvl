"use strict";

function init() {
    // var textBox = $("#textbox");
    var viewport = new ViewPort();
    var scenario = new Scenario($(Scenario.prototype.selector));
    GAMECONTEXT = new GameContext(scenario, viewport);
    
    function onSpaceDown() {
        console.log("next");
        var next = scenario.next();
        viewport.handle(next);
    }
    
    function onBackspaceDown() {
        viewport.toggleUI();
    }

    function globalKeyDownListener(e) {
        switch (e.keyCode) {
            case 32: // space
                onSpaceDown();
            break;
            case 8: // backspace
                onBackspaceDown();
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
