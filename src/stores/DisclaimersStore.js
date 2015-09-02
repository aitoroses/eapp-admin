import createTesselBlueprint from '../lib/createTesselBlueprint'
import {DisclaimersResource} from '../lib/Resource'

var [store, actions] = createTesselBlueprint(DisclaimersResource, 'disclaimers', 'disclaimers')

export default store
