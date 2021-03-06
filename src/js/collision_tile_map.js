(function () {
    "use strict";

    var CollisionTileMap;

    CollisionTileMap = function (map, tileSize) {
        this.map = map;
        this.tileSize = tileSize;
    };

    CollisionTileMap.prototype.checkCollision = function (soul) {
        var collision = { x: false, y: false }, i1, j1, i2, j2, i3, j3, i4, j4,
            body = soul.getBody(),
            velocity = soul.getVelocity(),
            position = soul.getPosition();

        // Check quad's top left
        j1 = Math.floor((position.x + body.x + 1) / this.tileSize);
        i1 = Math.floor((position.y + body.y - 1) / this.tileSize);
        // Check quad's top right
        j2 = Math.floor((position.x + body.x + body.w - 1) / this.tileSize);
        i2 = Math.floor((position.y + body.y - 1) / this.tileSize);
        // Check quad's bottom left
        j3 = Math.floor((position.x + body.x + 1) / this.tileSize);
        i3 = Math.floor((position.y + body.y + body.h + 1) / this.tileSize);
        // Check quad's bottom right
        j4 = Math.floor((position.x + body.x + body.w - 1) / this.tileSize);
        i4 = Math.floor((position.y + body.y + body.h + 1) / this.tileSize);

        collision.x = (velocity.x > 0 && (this.map[i2][j2] === 1 && this.map[i4][j4] === 1)) ||
                      (velocity.x < 0 && (this.map[i1][j1] === 1 && this.map[i3][j3] === 1));
        collision.y = (velocity.y > 0 && (this.map[i3][j3] === 1 || this.map[i4][j4] === 1)) ||
                      (velocity.y < 0 && (this.map[i1][j1] === 1 || this.map[i2][j2] === 1));

        return collision;
    };

    module.exports = CollisionTileMap;
}());
