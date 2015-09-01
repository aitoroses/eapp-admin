import ItemsActions from 'actions/ItemsActions'
import ItemsStore from 'stores/ItemsStore'
import TasActions from 'actions/TasActions'
import TasStore from 'stores/TasStore'
import CountriesActions from 'actions/CountriesActions'
import CountriesStore from 'stores/CountriesStore'
var api = {

  countries: {
    store: CountriesStore,
    actions: CountriesActions
  },
  disclaimers: {
    store: null,
    actions: null
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
    store: null,
    actions: null
  }

}

export default api

global.api = api
