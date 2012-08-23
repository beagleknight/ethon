var ethon = ethon || {},
    window = window || {};

(function (window, exports) {
    "use strict";

    function F() {
    }

    exports.inherit = function (fn, superFn) {
        F.prototype = superFn.prototype;
        fn.prototype = new F();
        fn.prototype.constructor = fn;
    };

}(window, ethon));
