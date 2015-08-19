import {injector} from 'di';

var listen = require('angular/react/helpers/listen');

// CountriesMixin needed by JSX components
var CountriesMixin = module.exports = {
	countries() {
		var {
			CountriesDomain: {
				actions, events, handlers
			},
			CountriesStore: store,
		} = injector.get(['CountriesDomain','CountriesStore']);
		return {
			actions: actions,
			store: store
		}
	},

	// When mounted, add event listeners
	componentDidMount() {
		var store = injector.get('CountriesStore');
		listen.bind(this)(store, {
			'countries.fetched' : this.onCountriesFetch,
			'countries.length.fetched' : this.onCountriesLengthFetch,
			'countries.country.inserted' : this.updateData,
			'countries.country.deleted' : this.updateData,
			'countries.country.updated' : this.updateData,
			'countries.countryId.updated' : this.updateStateButtons,
			'countries.country.inserted.error' : this.errorInserting,
		});
	}
}
