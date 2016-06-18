/**
 * Plugin.js file, set configs, routes, hooks and events here
 *
 * see http://wejs.org/docs/we/extend.plugin
 */
var csv = require('csv');

module.exports = function loadPlugin(projectPath, Plugin) {
  var plugin = new Plugin(__dirname);
  plugin.setConfigs({
    csv: {
      // configure your model coluns with this
      modelColumns: {
        // // Example:
        // user: {
        //   displayName: 'displayName',
        //   fullName: 'fullName',
        //   biography: 'biography',
        //   gender: 'gender'
        // }
      }
    }
  });

  plugin.csvResponseFormat = function csvResponseFormat (req, res){
    var we = req.we;

    var columns, records;

    if (Array.isArray(res.locals.data)) {
      records = res.locals.data
    } else {
      records = [ res.locals.data ];
    }

    // get columns:
    if (res.locals.csvResponseColumns) {
      columns = res.locals.csvResponseColumns;
    } else if (res.locals.model && we.config.csv.modelColumns[res.locals.model]) {
      columns = we.config.csv.modelColumns[res.locals.model];
    } else {
      // try to use the first object attr, this fails for attrs with arrays and objects
      columns = Object.keys(res.locals.data[0].toJSON());
    }

    req.we.csv.stringify(records,{
      header: true,
      quotedString: true,
      columns: columns
    }, function afterParseDataForSendInCSV (err, data){
      if (err) return res.serverError();

      res.set('Content-Type', 'text/csv');
      res.send(data);
    });
  }

  // set we.csv after load all plugins
  plugin.events.on('we:after:load:plugins', function afterLoadCSVPluginAfterLoadPlugins (we) {
    we.csv = csv;

    we.responses.addResponseFormater('text/csv', plugin.csvResponseFormat);
    we.responses.addResponseFormater('csv', plugin.csvResponseFormat);
  });

  return plugin;
};