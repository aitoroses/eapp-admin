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
	tAreas: {
		store: null,
		actions: null
	},
	itemsPer: {
		store: null,
		actions: null
	}

}

export default api;

global.api = api;
