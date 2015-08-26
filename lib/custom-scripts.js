// Tracking requests
import {patchXMLHttpRequest, trace} from './requestTracing';
patchXMLHttpRequest(global.window);
global.trace = trace;

// Make items available via CLI
global.itemsCollection = require('../test/mock-db/items')
if (!localStorage.getItem('/test/items.db')) {
	require('../test/mock-db/archive/items-script')
}
