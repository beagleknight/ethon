var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    exports.extend = function (methods, object) {
        var o = object || {},
            method;

        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                o[method] = methods[method];
            }
        }
        return o;
    };

}(window, ethon));
