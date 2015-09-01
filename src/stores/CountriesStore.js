import createTesselBlueprint from '../lib/createTesselBlueprint'
import {CountriesResource} from '../lib/Resource'

var [store, actions] = createTesselBlueprint(CountriesResource, 'countries', 'countries')

export default store
