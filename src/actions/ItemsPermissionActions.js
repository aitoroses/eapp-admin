import createTesselBlueprint from '../lib/createTesselBlueprint'
import {ItemsPermissionsResource} from '../lib/Resource'

var [store, actions] = createTesselBlueprint(ItemsPermissionsResource, 'itemsPermission', 'itemsPermission')

export default actions
