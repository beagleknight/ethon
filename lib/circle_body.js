var define = define || undefined;

define(function (require) {
    "use strict";

    var CircleBody = function (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
    };

    return CircleBody;
});
