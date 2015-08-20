import ItemsActions from 'actions/ItemsActions'
import ItemsStore from 'stores/ItemsStore'

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
		store: null,
		actions: null
	},
	itemsPermission: {
		store: null,
		actions: null
	}

}

export default api;

global.api = api;
