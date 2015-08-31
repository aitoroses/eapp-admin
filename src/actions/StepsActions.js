import createTesselBlueprint from '../lib/createTesselBlueprint';
import {StepsResource} from '../lib/Resource';

var [store, actions] = createTesselBlueprint(StepsResource, 'steps', 'steps');

export default actions;