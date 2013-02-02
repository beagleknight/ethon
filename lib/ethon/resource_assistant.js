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

    var settings = {},
        imagesToLoad = 0,
        imagesLoaded = 0;

    /**
     * Load an image and store it for a further usage.
     * A callback is called when the image is ready.
     *
     * @method loadImage
     * @param {String} path Image's path 
     * @param {Function} callback Function to be called when the 
     * imageresource is loaded.
     */
    function loadImage(path, callback) {
        var image = new window.Image();

        image.src = path;
        image.addEventListener("load", function () {
            callback(image);
        });
    }

    /**
     * TODO
     */
    function loadImages(object) {
        var prop,
            imageLoadedCallback = function (object, prop) {
                return function (image) {
                    imagesLoaded += 1;
                    object[prop] = image;
                };
            };

        if (typeof object !== 'object') {
            return;
        }

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                if (prop === 'image') {
                    imagesToLoad += 1;
                    loadImage(object[prop], imageLoadedCallback(object, prop));
                } else {
                    loadImages(object[prop]);
                }
            }
        }
    }

    /**
     * TODO
     */
    function loadSettings(value, callback) {
        var loadingImagesInterval,
            loadingImagesCallback = function () {
                if (imagesToLoad === imagesLoaded) {
                    clearInterval(loadingImagesInterval);
                    callback();
                }
            };

        if (typeof value === 'string') {
            settings = JSON.parse(value);
        } else {
            settings = value;
        }

        loadImages(settings);
        loadingImagesInterval = setInterval(loadingImagesCallback, 500);
    }

    /**
     * TODO
     */
    function loadGUI(gui) {
        var view, component, i, l;

        for (view in settings.gui) {
            if (settings.gui.hasOwnProperty(view)) {
                for (component in settings.gui[view]) {
                    if (settings.gui[view].hasOwnProperty(component)) {
                        for (i = 0, l = settings.gui[view][component].length; i < l; i += 1) {
                            gui.addElement(component, view, settings.gui[view][component][i]);
                        }
                    }
                }
            }
        }
    }

    return {
        loadSettings: loadSettings,
        loadGUI: loadGUI
    };

});
