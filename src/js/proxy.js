(function () {
    "use strict";

    module.exports = function (object, method) {
        return function () {
            method.apply(object, arguments);
        };
    };
}());
