var define = define || undefined;

define(function (require) {
    "use strict";

    var renderAssistant   = require("ethon/render_assistant"),
        resourceAssistant = require("ethon/resource_assistant"),
        proxy             = require("ethon/proxy"),
        TileMap;

    /**
     * constructor function
     *
     * Initialize map given initial position, tile width and height
     * and texture name and path.
     */
    TileMap = function (x, y, w, h, textureName, texturePath) {
        this.position = { x: x, y: y};
        this.width = w;
        this.height = h;
        this.texture = null;
        this.map = [];

        resourceAssistant.loadImage(textureName, texturePath, proxy(this, function (image) {
            this.texture = image;
        }));
    };

    TileMap.prototype.setMap = function (map) {
        this.map = map;
    };

    TileMap.prototype.getMap = function () {
        return this.map;
    };

    TileMap.prototype.render = function () {
        var i, l, j, ll, x, y;

        if (this.texture !== null) {
            for (i = 0, l = this.map.length; i < l; i += 1) {
                for (j = 0, ll = this.map[i].length; j < ll; j += 1) {
                    x = this.position.x + j * this.width;
                    y = this.position.y + i * this.height;

                    renderAssistant.drawSubImage(x, y, this.texture, this.map[i][j], this.width, this.height);
                }
            }
        }
    };

    return TileMap;
});
