var requirejs = requirejs || undefined,
    define = define || undefined;

requirejs.config({
    paths: {
        ethon: "../../../lib/ethon"
    }
});

define(function (require) {
    "use strict";

    var Soul            = require("ethon/soul"),
        QuadBody        = require("ethon/quad_body"),
        inherit         = require("ethon/inherit"),
        proxy           = require("ethon/proxy"),
        renderAssistant = require("ethon/render_assistant"),
        radius = 5,
        id = 0,
        tileSize = 20,
        Coconut;

    /**
     * constructor
     *
     * Use Soul constructor to initialize name and
     * position
     */
    Coconut = function (i, j) {
        Soul.call(this, "coconut_" + id, i * tileSize + tileSize / 2, j * tileSize + tileSize / 2);
        id += 1;

        // TODO: dont check collisions
        this.checkCollision = false;
        this.setBody(new QuadBody(0, 0, radius * 2, radius * 2, "coconuts"));
    };

    inherit(Coconut, Soul);

    Coconut.prototype.render = function () {
        var position = this.getPosition();
        renderAssistant.drawCircle(position.x, position.y, radius, "#ffffff");
    };

    return Coconut;
});
