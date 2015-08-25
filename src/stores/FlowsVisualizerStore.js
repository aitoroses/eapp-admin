import createTesselBlueprint from '../lib/createTesselBlueprint';
import {FlowsResource} from '../lib/Resource';

var [store, actions] = createTesselBlueprint(FlowsResource, 'flowsResource', 'flows');

window.storeFlows = store;

export default store;
