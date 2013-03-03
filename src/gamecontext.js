"use strict";

function GameContext(scenario, viewport) {
    this.viewport = viewport;
    this.scenario = scenario;
    this.startDate = new Date();
    this.conditions = {};
    this.variables = {};
}
GameContext.prototype = Object.create(Object.prototype, {
    elapsedTime: {
        get: function () {
            return new Date(Date.now() - this.startDate);
        },
        enumerable: true
    },
    load: {
        value: function () {
            this.scenario.load();
        },
        enumerable: true
    }
});
