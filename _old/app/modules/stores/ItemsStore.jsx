import createTesselBlueprint from 'lib/createTesselBlueprint';
import {ItemsResource} from 'lib/Resource';

var [store, actions] = createTesselBlueprint(ItemsResource, 'items', 'items');

export default store;
