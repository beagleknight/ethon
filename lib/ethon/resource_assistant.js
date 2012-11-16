/*jslint browser: true*/
/*global define*/

/**
 * Provides methods for loading and storing resources
 * for a further usage.
 *
 * @class resource_assistant
 */
define(function (require) {
    "use strict";

    var images = {},
        texts = {};

    /**
     * Load an image and store it for a further usage.
     * A callback is called when the image is ready.
     *
     * @method loadImage
     * @param {String} name Image's identifier 
     * @param {String} path Image's path 
     * @param {Function} callback Function to be called when the 
     * imageresource is loaded.
     */
    function loadImage(name, path, callback) {
        var image = new window.Image();

        console.log(name);
        console.log(path);
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
     * Given a name it returns the stored image
     *
     * @method getImage
     * @param {String} name Image's identifier
     */
    function getImage(name) {
        return images[name];
    }

    /**
     * Load text and store it for a further usage.
     *
     * @method loadText
     * @param {String} name Text's identifier
     * @param {String} text Text's value
     */
    function loadText(name, text) {
        texts[name] = text;
    }

    /**
     * Given a name it returns the stored text
     *
     * @method getText
     * @param {String} name Text's identifier
     */
    function getText(name) {
        return texts[name];
    }

    return {
        loadImage: loadImage,
        getImage: getImage,
        loadText: loadText,
        getText: getText
    };

});
