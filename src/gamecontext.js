"use strict";

function GameContext(scenario, viewport) {
    this.viewport = viewport;
    this.scenario = scenario;
    this.startDate = new Date();
    this.conditions = {};
}
GameContext.prototype = Object.create(Object.prototype, {
    elapsedTime: {
        get: function () {
            return new Date(Date.now() - this.startDate);
        },
        enumerable: true,
        configurable: false
    }
});
