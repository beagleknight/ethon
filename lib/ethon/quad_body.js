var define = define || undefined;

define(function (require) {
    "use strict";

    var QuadBody = function (x, y, w, h, collisionGroup) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.collisionGroup = collisionGroup;
    };

    return QuadBody;
});
