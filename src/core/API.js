import ItemsActions from 'actions/ItemsActions'
import ItemsStore from 'stores/ItemsStore'
import TasActions from 'actions/TasActions'
import TasStore from 'stores/TasStore'
var api = {

  countries: {
    store: null,
    actions: null
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
