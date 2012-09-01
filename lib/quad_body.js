var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var QuadBody = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    };

    exports.QuadBody = QuadBody;
}(window, ethon));
