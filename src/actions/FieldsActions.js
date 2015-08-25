import createTesselBlueprint from '../lib/createTesselBlueprint';
import {MasterFieldsResource} from '../lib/Resource';

var [store, actions] = createTesselBlueprint(MasterFieldsResource, 'fields', 'fields');

export default actions;
