var define = define || undefined;

define(function (require) {
    "use strict";

    var QuadBody = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    };

    return QuadBody;
});
