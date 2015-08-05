/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
var csv = require('csv');

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  // set we.csv after load all plugins
  plugin.events.on('we:after:load:plugins', function (we) {
    we.csv = csv;
  });
  return plugin;
};