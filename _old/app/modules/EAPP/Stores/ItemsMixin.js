import {Injector} from 'di';

var injector = new Injector();

var listen = require('angular/react/helpers/listen');



// ItemsMixin needed by JSX components
var ItemsMixin = module.exports = {
	items() {
		var {
			ItemsDomain: {
				actions, events, handlers
			},
			ItemsStore: store,
		} = injector.get(['ItemsDomain','ItemsStore']);
		return {
			actions: actions,
			store: store
		}
	},

	// When mounted, add event listeners
	componentDidMount() {
		var store = injector.get('ItemsStore');
		listen.bind(this)(store, {
			'items.fetched' : this.onItemsFetch,
			'items.length.fetched' : this.onItemsLengthFetch,
			'items.item.inserted' : this.updateData,
			'items.item.deleted' : this.updateData,
			'items.item.updated' : this.updateData,
			'items.itemId.updated' : this.updateStateButtons,
			'items.item.inserted.error' : this.errorInserting,
		});
	}
}