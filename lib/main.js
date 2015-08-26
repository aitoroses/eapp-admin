global.__config = {
	server: "http://soa-server:7003"
}

// CSS Libs
require('font-awesome/css/font-awesome.css')
require('sweetalert/dist/sweetalert.css')

require('../assets/style/sass/app.scss')
require('../src/components/App.jsx')

import {patchXMLHttpRequest, trace} from './requestTracing';

patchXMLHttpRequest(global.window);
global.trace = trace;
