var window = window || undefined,
    define = define || undefined;

define(function (require) {
    "use strict";

    var images = {};

    /**
     * loadImage
     *
     * Load an image and store it for a further usage.
     * A callback is called when the image is ready.
     */
    function loadImage(name, path, callback) {
        var image = new window.Image();

        if (images[path] !== undefined) {
            callback(image);
        } else {
            image.src = path;
            image.addEventListener("load", function () {
                images[name] = image;
                callback(image);
            });
        }
    }

    /**
     * getImage
     *
     * Given a name it returns the stored image
     */
    function getImage(name) {
        return images[name];
    }

    return {
        loadImage: loadImage,
        getImage: getImage
    };

});
