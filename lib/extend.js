var define = define || undefined;

define(function (require, exports, module) {
    "use strict";

    var extend = function (methods, object) {
        var o = object || {},
            method;

        for (method in methods) {
            if (methods.hasOwnProperty(method)) {
                o[method] = methods[method];
            }
        }
        return o;
    };

    return extend;
});
