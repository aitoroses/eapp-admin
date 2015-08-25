import createTesselBlueprint from '../lib/createTesselBlueprint';
import {FlowsResource} from '../lib/Resource';

var [store, actions] = createTesselBlueprint(FlowsResource, 'flowsVisualizer', 'flows');

window.actionsFlows = actions;

export default actions;
