// Import the annotations
import {
	NgStore,
	NgActions,
	Register
} from 'annotations';

// Cookies from uncompresion
import {Cookies} from 'cookies';

/* Tas Actions */

@NgActions({
	module: 'EAPP'
})
function Tas() {
	return {
		queryTas: "ADMIN_QUERY_TAS",
		queryTasCount: "ADMIN_QUERY_TAS_COUNT",
		setPage: "ADMIN_SET_PAGE_TAS",
		setSearch : "ADMIN_SET_SEARCH_TAS",
		setTaId : "ADMIN_SET_TAID_TAS",
		setTaName : "ADMIN_SET_TANAME_TAS",
		setOu : "ADMIN_SET_TAOU_TAS",
		setCountry: "ADMIN_SET_COUNTRY_TAS",
		setDivision: "ADMIN_SET_DIVISION_TAS",
		setIsBu: "ADMIN_SET_IS_BU_TAS",
		setIsBf: "ADMIN_SET_IS_BF_TAS",
		addTaPopup : "ADMIN_ADD_TAS",
		deleteTaPopup : "ADMIN_DELETE_TAS",
		updateTaPopup : "ADMIN_UPDATE_TAS"
	};
}

/**
 * Tas Store
 */
@NgStore({
	module: 'EAPP',
	inject: ['TasDomain',"$http", "Global", 'AppState', '$location']
})
function TasStore() {
	var handlers = this.TasDomain.handlers;
	var $http = this.$http;
	var Global = this.Global;
	var debug = this.debug('TasStore');
	var $location = this.$location;
	var AppState = this.AppState;

	var DEFAULT_OPTIONS = {
		"rows":8,
		"maximumPages":10
	}

	// Initial app state
	var state = this.AppState.state.tas = {};
	state.tas = [];
	state.tasLength = null;
	state.selectedRow = null;
	state.page = 1;
	state.search = "";
	state.taId = null;
	state.taName = null;
	state.ou = null;
	state.country = null;
	state.division = null;
	state.isBu = null;
	state.isBf = null;
	state.ous = [{"id":1,"ou":"AUSTRIA_PH"},{"id":2,"ou":"SOUTHKOREA_PH"}];

	return {

		handlers: handlers,

		queryTas: function() {
			var ctx = this;
			var firstResult = state.page*DEFAULT_OPTIONS.rows-(DEFAULT_OPTIONS.rows);
			var maxResults = DEFAULT_OPTIONS.rows;
			$http.post(Global.Server + `/np5services/countryandta/np5therapeuticalarea/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{
				'taName' : state.search,
				'organizationalUnit' : state.ou
			})
			.success(function(data){
			debug(`Found ${data.length} tas.`)
			state.tas = data || [];
			ctx.emit('tas.fetched');
		})
		},

		queryTasCount: function(a,b) {
			var ctx = this;
			$http.post(Global.Server + `/np5services/countryandta/np5therapeuticalarea/count` ,{
				'taName' : state.search,
				'organizationalUnit' : state.ou
			}).success(function(data){
				debug(`Found ${data} tas.`)
				state.tasLength = data || [];
				ctx.emit('tas.length.fetched');
			})
		},

		addTaPopup: function(){
			var ctx = this;
			$http.post(Global.Server + `/np5services/countryandta/np5therapeuticalarea/insert`,{
				'taId' : state.taId,
				'taName' : state.taName,
				'organizationalUnit' : state.ou,
				'country' : state.country,
				'division' : state.division,
				'isBu' : state.isBu,
				'isBf' : state.isBf,
				'deleted' : 0
			}).success(function(){
				debug(`Inserted tas`);
				ctx.emit('tas.ta.inserted');
			}).error(function(){
				debug(`Error inserting tas`);
				ctx.emit('tas.ta.inserted.error');
			})
		},

		updateTaPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/countryandta/np5therapeuticalarea/update`,{
				'taId' : state.taId,
				'taName' : state.taName,
				'organizationalUnit' : state.ou,
				'country' : state.country,
				'division' : state.division,
				'isBu' : state.isBu,
				'isBf' : state.isBf,
				'deleted' : 0
			}).success(function(){
				debug(`Updated tas`);
				ctx.emit('tas.ta.updated');
			})
		},

		deleteTaPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/countryandta/np5therapeuticalarea/delete`,{
				'taId' : state.taId
			}).success(function(){
				debug(`Deleted tas`);
				ctx.emit('tas.ta.deleted');
			})
		},

		setPage: function(p) {
			state.page = p;
			debug("page was updated");
			this.emit('tas.page.updated');
		},

		setSearch: function(s) {
			state.search = s;
			debug("search was updated");
			this.emit('tas.search.updated');
		},

		setTaId: function(i) {
			state.taId = i;
			debug("taId was updated");
			if(i!=null){
				this.emit('tas.taId.updated');
			}
		},

		setTaName: function(i) {
			state.taName = i;
			debug("taName was updated");
			this.emit('tas.taName.updated');
		},

		setOu: function(i) {
			state.ou = i;
			debug("ou was updated");
			this.emit('tas.ou.updated');
		},

		setCountry: function(i){
			state.country = i;
			debug("country was updated");
			this.emit("tas.country.updated");
		},

		setDivision: function(i){
			state.division = i;
			debug("division was updated");
			this.emit("tas.division.updated");
		},

		setIsBu: function(i){
			state.isBu = i;
			debug("isBu was updated");
			this.emit("tas.isBu.updated");
		},

		setIsBf: function(i){
			state.isBf = i;
			debug("isBf was updated");
			this.emit("tas.isBf.updated");
		},

		// Public API
		exports: {
			getTas: function() {
				return state.tas;
			},
			getTasCount: function() {
				return state.tasLength;
			},
			getTotalRows: function() {
				return DEFAULT_OPTIONS.rows;
			},
			getMaxPages: function() {
				return DEFAULT_OPTIONS.maximumPages;
			},
			getTaId: function(){
				return state.taId;
			},
			getTaName: function(){
				return state.taName;
			},
			getTaOu: function(){
				return state.ou;
			},
			getTaCountry: function(){
				return state.country;
			},
			getTaDivision: function(){
				return state.division;
			},
			getTaIsBu: function(){
				return state.isBu;
			},
			getTaIsBf: function(){
				return state.isBf;
			},
			getOus: function(){
				return state.ous;
			},
			getPage: function(){
				return state.page;
			}
		}
	};
}
Register(TasStore);
Register(Tas);