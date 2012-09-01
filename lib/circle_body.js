var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    var CircleBody = function (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    };

    exports.CircleBody = CircleBody;
}(window, ethon));
