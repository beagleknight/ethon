(function () {
    "use strict";

    module.exports = function (object, methods) {
        var o = object || {},
            method;

        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                o[method] = methods[method];
            }
        }
        return o;
    };
}());
