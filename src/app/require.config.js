// require.js looks for the following global when initializing
var require = {
  baseUrl: ".",
  paths: {
    "bootstrap": "bower_modules/components-bootstrap/js/bootstrap.min",
    "bootstrap-sidebar": "bower_modules/bootstrap-sidebar/dist/js/sidebar",
    "crossroads": "bower_modules/crossroads/dist/crossroads.min",
    "hasher": "bower_modules/hasher/dist/js/hasher.min",
    "jquery": "bower_modules/jquery/dist/jquery",
    "knockout": "bower_modules/knockout/dist/knockout",
    "knockout-projections": "bower_modules/knockout-projections/dist/knockout-projections",
    "signals": "bower_modules/js-signals/dist/signals.min",
    "google-maps": "bower_modules/google-maps/lib/Google.min",
    "text": "bower_modules/requirejs-text/text"
  },
  shim: {
    "bootstrap-sidebar": {
      deps: ["jquery"]
    },
    "bootstrap": {
      deps: ["jquery"]
    }
  }
};
