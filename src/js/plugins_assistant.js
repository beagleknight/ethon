(function () {
    "use strict";

    var pluginsConfig = {};

    function loadPlugins (plugins) {
        var pluginId;

        for (pluginId in plugins) {
            if (plugins.hasOwnProperty(pluginId)) {
                pluginsConfig[pluginId] = JSON.parse(plugins[pluginId]);
            }
        }
    }

    function getConfig (pluginId) {
        return pluginsConfig[pluginId];
    }

    module.exports = {
        loadPlugins: loadPlugins,
        getConfig: getConfig
    };
}());
