// Import the annotations
import {
	NgStore,
	NgActions,
	Register
} from 'annotations';

// Cookies from uncompresion
import {Cookies} from 'cookies';

/* Countries Actions */

@NgActions({
	module: 'EAPP'
})
function Countries() {
	return {
		queryCountries: "ADMIN_QUERY_COUNTRIES",
		queryCountriesCount: "ADMIN_QUERY_COUNTRIES_COUNT",
		setPage: "ADMIN_SET_PAGE_COUNTRIES",
		setSearch : "ADMIN_SET_SEARCH_COUNTRIES",
		setCountryId : "ADMIN_SET_COUNTRYID_COUNTRIES",
		setCountryCode : "ADMIN_SET_COUNTRYCODE_COUNTRIES",
		setCountryName : "ADMIN_SET_COUNTRYNAME_COUNTRIES",
		addCountryPopup : "ADMIN_ADD_COUNTRY",
		deleteCountryPopup : "ADMIN_DELETE_COUNTRY",
		updateCountryPopup : "ADMIN_UPDATE_COUNTRY"
	};
}

/**
 * Countries Store
 */
@NgStore({
	module: 'EAPP',
	inject: ['CountriesDomain',"$http", "Global", 'AppState', '$location']
})
function CountriesStore() {
	var handlers = this.CountriesDomain.handlers;
	var $http = this.$http;
	var Global = this.Global;
	var debug = this.debug('CountriesStore');
	var $location = this.$location;
	var AppState = this.AppState;

	var DEFAULT_OPTIONS = {
		"rows":8,
		"maximumPages":10
	}

	// Initial app state
	var state = this.AppState.state.countries = {};
	state.countries = [];
	state.countriesLength = null;
	state.selectedRow = null;
	state.page = 1;
	state.search = "";
	state.countryId = null;
	state.countryCode = null;
	state.countryName = null;

	return {

		handlers: handlers,

		queryCountries: function() {
			var ctx = this;
			var firstResult = state.page*DEFAULT_OPTIONS.rows-(DEFAULT_OPTIONS.rows);
			var maxResults = DEFAULT_OPTIONS.rows;
			if(state.search==""){
				$http.post(Global.Server + `/np5services/countryandta/np5country/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{})
				.success(function(data){
				debug(`Found ${data.length} countries.`)
				state.countries = data || [];
				ctx.emit('countries.fetched');
			})
			}else{
				$http.post(Global.Server + `/np5services/countryandta/np5country/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{
					'countryName' : state.search
				})
				.success(function(data){
				debug(`Found ${data.length} countries.`)
				state.countries = data || [];
				ctx.emit('countries.fetched');
			})
			}
		},

		queryCountriesCount: function(a,b) {
			var ctx = this;
			$http.post(Global.Server + `/np5services/countryandta/np5country/count`,{
				'countryName' : state.search	
			}).success(function(data){
				debug(`Found ${data} countries.`)
				state.countriesLength = data || [];
				ctx.emit('countries.length.fetched');
			})
		},

		addCountryPopup: function(){
			var ctx = this;
			$http.post(Global.Server + `/np5services/countryandta/np5country/insert`,{
				'countryId' : state.countryId,
				'countryCode' : state.countryCode,
				'countryName' : state.countryName,
				'deleted' : 0
			}).success(function(){
				debug(`Inserted country`);
				ctx.emit('countries.country.inserted');
			}).error(function(){
				debug(`Error inserting countries`);
				ctx.emit('countries.country.inserted.error');
			})
		},

		updateCountryPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/countryandta/np5country/update`,{
				'countryId' : state.countryId,
				'countryCode' : state.countryCode,
				'countryName' : state.countryName
			}).success(function(){
				debug(`Updated country`);
				ctx.emit('countries.country.updated');
			})
		},

		deleteCountryPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/countryandta/np5country/delete`,{
				'countryId' : state.countryId
			}).success(function(){
				debug(`Deleted country`);
				ctx.emit('countries.country.deleted');
			})
		},

		setPage: function(p) {
			state.page = p;
			debug("page was updated");
			this.emit('countries.page.updated');
		},

		setSearch: function(s) {
			state.search = s;
			debug("search was updated");
			this.emit('countries.search.updated');
		},

		setCountryId: function(i) {
			state.countryId = i;
			debug("countryId was updated");
			if(i!=null){
				this.emit('countries.countryId.updated');
			}
		},

		setCountryCode: function(i) {
			state.countryCode = i;
			debug("countryCode was updated");
			this.emit('countries.countryCode.updated');
		},

		setCountryName: function(i) {
			state.countryName = i;
			debug("countryName was updated");
			this.emit('countries.countryName.updated');
		},

		// Public API
		exports: {
			getCountries: function() {
				return state.countries;
			},
			getCountriesCount: function() {
				return state.countriesLength;
			},
			getTotalRows: function() {
				return DEFAULT_OPTIONS.rows;
			},
			getMaxPages: function() {
				return DEFAULT_OPTIONS.maximumPages;
			},
			getCountryId: function(){
				return state.countryId;
			},
			getCountryCode: function(){
				return state.countryCode;
			},
			getCountryName: function(){
				return state.countryName;
			},
			getPage: function(){
				return state.page;
			}
		}
	};
}
Register(CountriesStore);
Register(Countries);