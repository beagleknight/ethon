var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    exports.proxy = function (object, method) {
        return function () {
            method.apply(object, arguments);
        };
    };

}(window, ethon));
