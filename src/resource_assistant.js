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

    var settings     = {},
        imagesToLoad = 0,
        imagesLoaded = 0,
        soundsToLoad = 0,
        soundsLoaded = 0,
        images       = {},
        files        = {},
        $            = require('jquery'),
        Scene        = require("ethon/scene");

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
        $(image).on("load", function () {
            callback(image);
        });
    }

    /**
     * Load an sound and store it for a further usage.
     * A callback is called when the sound is ready.
     *
     * @method loadSound
     * @param {String} path Sound's path 
     * @param {Function} callback Function to be called when the 
     * sound resource is loaded.
     */
    //function loadSound(path, callback) {
    //    var sound = new window.Audio();

    //    sound.src = path;
    //    sound.type = "audio/mpeg";
    //    sound.load();
    //    $(sound).on("loadedmetadata", function () {
    //        callback(sound);
    //    }, true);
    //}

    /**
     * TODO
     */
    function loadAssets(object) {
        var prop,
            imageLoadedCallback = function (object, prop) {
                return function (image) {
                    imagesLoaded += 1;
                    images[prop] = image;
                };
            };

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                switch(object[prop].type) {
                    case "image":
                        imagesToLoad += 1;
                        loadImage(object[prop].url, imageLoadedCallback(object, prop));
                        break;
                    default:
                        files[prop] = object[prop].url;
                        break;
                }
            }
        }
    }

    /**
     * TODO
     */
    //function loadSounds(object) {
    //    var prop,
    //        soundLoadedCallback = function (object, prop) {
    //            return function (sound) {
    //                soundsLoaded += 1;
    //                object[prop] = sound;
    //            };
    //        };

    //    if (typeof object !== 'object') {
    //        return;
    //    }

    //    for (prop in object) {
    //        if (object.hasOwnProperty(prop)) {
    //            if (prop === 'sound') {
    //                soundsToLoad += 1;
    //                loadSound(object[prop], soundLoadedCallback(object, prop));
    //            } else {
    //                loadSounds(object[prop]);
    //            }
    //        }
    //    }
    //}

    /**
     * TODO
     */
    function loadSettings(game, value, callback) {
        //console.log("Start load settings...");
        var loadingAssetsInterval,
            loadingAssetsCallback = function () {
                //console.log("Loading assets: " + imagesLoaded + "/" + imagesToLoad + " images and " + soundsLoaded + "/" + soundsToLoad + " sounds...");
                game.broadcast("loading_progress", ((imagesLoaded + soundsLoaded) / (imagesToLoad + soundsToLoad)) * 100);
                if (imagesToLoad === imagesLoaded && soundsToLoad === soundsLoaded) {
                    clearInterval(loadingAssetsInterval);
                    callback();
                }
            };

        if (typeof value === 'string') {
            settings = JSON.parse(value);
        } else {
            settings = value;
        }

        loadAssets(settings.assets);
        loadingAssetsInterval = setInterval(loadingAssetsCallback, 500);
    }

    function loadComponents(game, viewId, components) {
        var component, i, l;

        for (i = 0, l = components.length; i < l; i += 1) {
            component = components[i];
            game.gui.addElement(component.type, viewId, component);
        }
    }

    function loadTransitions(game, viewId, transitions) {
        var transition;

        function makeTransition(game, viewId, transition) {
            return function () {
                setTimeout(function () {
                    if (game.activeScene === viewId) {
                        game.setActiveScene(transition.scene);
                    }
                }, transition.delay || 0);
            };
        }

        for (transition in transitions) {
            if (transitions.hasOwnProperty(transition)) {
                game.on(transition, makeTransition(game, viewId, transitions[transition]));
            }
        }
    }

    /**
     * TODO
     */
    function loadGUI(game, callback) {
        var i, l, view;

        for (i = 0, l = settings.gui.length; i < l; i += 1) {
            view = settings.gui[i];

            game.addScene(view.name, new Scene(game));
            loadComponents(game, view.name, view.components);
            loadTransitions(game, view.name, view.transitions);
        }

        callback();
    }

    /**
     * TODO
     */
    function getData(name) {
        return settings.data[name];
    }

    function getImage(name) {
        return images[name];
    }

    function getFile(name) {
        return files[name];
    }

    return {
        loadSettings: loadSettings,
        loadGUI: loadGUI,
        getData: getData,
        getImage: getImage,
        getFile: getFile
    };

});
