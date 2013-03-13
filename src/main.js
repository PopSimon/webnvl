"use strict";
var GAMECONTEXT = null;
function init() {
    // var textBox = $("#textbox");
    var viewport = new ViewPort();
    var scenario = new Scenario();
    GAMECONTEXT = new GameContext(scenario, viewport);
    GAMECONTEXT.load();
    scenario.init();
    
    function onWindowResize() {
        viewport.reset();
    }
    
    window.addEventListener('resize', onWindowResize, false);
}

window.onload = init;
