var define = define || undefined;

define(function (require) {
    "use strict";

    return function (object, method) {
        return function () {
            method.apply(object, arguments);
        };
    };
});
