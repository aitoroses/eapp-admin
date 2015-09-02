import ItemsActions from 'actions/ItemsActions'
import ItemsStore from 'stores/ItemsStore'
import TasActions from 'actions/TasActions'
import TasStore from 'stores/TasStore'
import CountriesActions from 'actions/CountriesActions'
import CountriesStore from 'stores/CountriesStore'
import DisclaimersActions from 'actions/DisclaimersActions'
import DisclaimersStore from 'stores/DisclaimersStore'
import ItemsPemissionActions from 'actions/ItemsPermissionActions'
import ItemsPermissionStore from 'stores/ItemsPermissionStore'

var api = {

  countries: {
    store: CountriesStore,
    actions: CountriesActions
  },
  disclaimers: {
    store: DisclaimersStore,
    actions: DisclaimersActions
  },
  items: {
    store: ItemsStore,
    actions: ItemsActions
  },
  tas: {
    store: TasStore,
    actions: TasActions
  },
  itemsPermission: {
    store: ItemsPermissionStore,
    actions: ItemsPemissionActions
  }

}

export default api

global.api = api
