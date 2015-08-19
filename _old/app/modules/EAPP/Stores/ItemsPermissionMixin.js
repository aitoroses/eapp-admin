import {injector} from 'di';

var listen = require('angular/react/helpers/listen');



// ItemsPermission Mixin needed by JSX components
var ItemsPermissionMixin = module.exports = {
	ItemsPermission() {
		var {
			ItemsPermissionDomain: {
				actions, events, handlers
			},
			ItemsPermissionStore: store,
		} = injector.get(['ItemsPermissionDomain','ItemsPermissionStore']);
		return {
			actions: actions,
			store: store
		}
	},

	// When mounted, add event listeners
	componentDidMount() {
		var store = injector.get('ItemsPermissionStore');
		listen.bind(this)(store, {
			'itemsPermission.fetched' : this.onItemsPermissionFetch,
			'itemsPermission.length.fetched' : this.onItemsPermissionLengthFetch,
			'itemsPermission.item.inserted' : this.updateData,
			'itemsPermission.item.deleted' : this.updateData,
			'itemsPermission.item.updated' : this.updateData,
			"itemsPermission.selectedRow.updated" : this.updateStateButtons,
			'itemsPermission.items.fetched' : this.onItemsFetch,
			'itemsPermission.itemNameForCombo.updated' : this.onItemNameFetchForCombo,
			'itemsPermission.countries.fetched' : this.onCountriesFetch,
		});
	}
}