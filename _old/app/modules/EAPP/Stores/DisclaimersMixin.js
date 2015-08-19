import {injector} from 'di';

var listen = require('angular/react/helpers/listen');

// Disclaimers Mixin needed by JSX components
var DisclaimersMixin = module.exports = {
	disclaimers() {
		var {
			DisclaimersDomain: {
				actions, events, handlers
			},
			DisclaimersStore: store,
		} = injector.get(['DisclaimersDomain','DisclaimersStore']);
		return {
			actions: actions,
			store: store
		}
	},

	// When mounted, add event listeners
	componentDidMount() {
		var store = injector.get('DisclaimersStore')
		listen.bind(this)(store, {
			'disclaimers.fetched' : this.onDisclaimersFetch,
			'disclaimers.length.fetched' : this.onDisclaimersLengthFetch,
			'disclaimers.disclaimer.inserted' : this.updateData,
			'disclaimers.disclaimer.deleted' : this.updateData,
			'disclaimers.disclaimer.updated' : this.updateData,
			'disclaimers.selectedRow.updated' : this.updateStateButtons,
			'disclaimers.items.fetched' : this.onItemsFetch,
			'disclaimers.disclaimer.inserted.error' : this.errorInserting,
		});
	}
}