import createTesselBlueprint from '../lib/createTesselBlueprint';
import {TasResource} from '../lib/Resource';

var [store, actions] = createTesselBlueprint(TasResource, 'tas', 'tas');

export default actions;
