/*global define*/

/**
 * Provides a Class for map used on a tile-based game.
 *
 * @class TileMap
 * @requires render_assistant
 * @requires resource_assistant
 * @requires proxy
 */
define(function (require) {
    "use strict";

    var renderAssistant   = require("ethon/render_assistant"),
        resourceAssistant = require("ethon/resource_assistant"),
        proxy             = require("ethon/proxy"),
        TileMap;

    /**
     * Constructor
     *
     * @method TileMap
     * @param {Number} x Position on the x-axis
     * @param {Number} y Position on the y-axis
     * @param {Number} w Tile width in pixels
     * @param {Number} h Tile height in pixels
     * @param {String} textureName Texture image identifier
     * @param {String} texturePath Texture image path
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

    /**
     * Set a bidimensional array for map's representation
     *
     * @method setMap
     * @param {Array} map Bidimensional array containing tile ids
     */
    TileMap.prototype.setMap = function (map) {
        this.map = map;
    };

    /**
     * @method getMap
     * @return Bidimensional array containing tile identifiers
     */
    TileMap.prototype.getMap = function () {
        return this.map;
    };

    /**
     * Render the tile map
     *
     * @method render
     */
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
