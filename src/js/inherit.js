(function () {
    "use strict";

    function F() {}

    module.exports = function (fn, superFn) {
        F.prototype = superFn.prototype;
        fn.prototype = new F();
        fn.prototype.constructor = fn;
    };
}());
