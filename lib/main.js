// Global configuration
global.__config = {
  server: 'http://soa-server:7003'
}

// CSS Libs
require('font-awesome/css/font-awesome.css')
require('sweetalert/dist/sweetalert.css')

require('../assets/style/app.css')
require('../src/components/App.jsx')

// -- Custom scripts
require('./custom-scripts')
