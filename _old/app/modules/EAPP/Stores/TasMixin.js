import {injector} from 'di';

var listen = require('angular/react/helpers/listen');

// TasMixin needed by JSX components
var TasMixin = module.exports = {
	tas() { 
		var {
			TasDomain: {
				actions, events, handlers
			},
			TasStore: store,
		} = injector.get(['TasDomain','TasStore']);
		return {
			actions: actions,
			store: store
		}
	},

	// When mounted, add event listeners
	componentDidMount() {
		var store = injector.get('TasStore');
		listen.bind(this)(store, {
			'tas.fetched' : this.onTasFetch,
			'tas.length.fetched' : this.onTasLengthFetch,
			'tas.ta.inserted' : this.updateData,
			'tas.ta.deleted' : this.updateData,
			'tas.ta.updated' : this.updateData,
			'tas.taId.updated' : this.updateStateButtons,
			'tas.ta.inserted.error' : this.errorInserting,
		});
	}
}