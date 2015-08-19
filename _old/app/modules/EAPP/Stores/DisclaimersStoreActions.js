// Import the annotations
import {
	NgStore,
	NgActions,
	Register
} from 'annotations';

// Cookies from uncompresion
import {Cookies} from 'cookies';

/* Disclaimers Actions */

@NgActions({
	module: 'EAPP'
})
function Disclaimers() {
	return {
		queryDisclaimers: "ADMIN_QUERY_DISCLAIMERS",
		queryDisclaimersCount: "ADMIN_QUERY_DISCLAIMERS_COUNT",
		setPage: "ADMIN_SET_PAGE_DISCLAIMERS",
		setItemId : "ADMIN_SET_ITEMID_DISCLAIMERS",
		setOu : "ADMIN_SET_OU_DISCLAIMERS",
		setDisclaimer : "ADMIN_SET_DISCLAIMER_DISCLAIMERS",
		addDisclaimerPopup : "ADMIN_ADD_DISCLAIMERS",
		deleteDisclaimerPopup : "ADMIN_DELETE_DISCLAIMERS",
		updateDisclaimerPopup : "ADMIN_UPDATE_DISCLAIMERS",
		queryItems: "ADMIN_QUERY_ITEMS_DISCLAIMERS",
		setSelectedRow: "ADMIN_SET_SELECTED_ROW_DISCLAIMERS"
	};
}

/**
 * Disclaimers Store
 */
@NgStore({
	module: 'EAPP',
	inject: ['DisclaimersDomain',"$http", "Global", 'AppState', '$location']
})
function DisclaimersStore() {
	var handlers = this.DisclaimersDomain.handlers;
	var $http = this.$http;
	var Global = this.Global;
	var debug = this.debug('DisclaimersStore');
	var $location = this.$location;
	var AppState = this.AppState;

	var DEFAULT_OPTIONS = {
		"rows":8,
		"maximumPages":10
	}

	// Initial app state
	var state = this.AppState.state.disclaimers = {};
	state.disclaimers = [];
	state.disclaimersLength = null;
	state.selectedRow = null;
	state.page = 1;
	state.itemId = null;
	state.ou = null;
	state.disclaimer = null;
	state.items = null;
	state.ous = [{"id":1,"ou":"AUSTRIA_PH"},{"id":2,"ou":"SOUTHKOREA_PH"}];

	return {

		handlers: handlers,

		queryDisclaimers: function() {
			var ctx = this;
			var firstResult = state.page*DEFAULT_OPTIONS.rows-(DEFAULT_OPTIONS.rows);
			var maxResults = DEFAULT_OPTIONS.rows;
			$http.post(Global.Server + `/np5services/items/np5confdisclaimer/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{
				'itemId' : state.itemId,
				'organizationalUnit' : state.ou
			})
			.success(function(data){
			debug(`Found ${data.length} disclaimers.`)
			state.disclaimers = data || [];
			ctx.emit('disclaimers.fetched');
			})
		},

		queryDisclaimersCount: function(a,b) {
			var ctx = this;
			$http.post(Global.Server + `/np5services/items/np5confdisclaimer/count`,{
				'itemId' : state.itemId,
				'organizationalUnit' : state.ou
			}).success(function(data){
				debug(`Found ${data} disclaimers.`)
				state.disclaimersLength = data || [];
				ctx.emit('disclaimers.length.fetched');
			})
		},

		queryItems: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confitem/selectbyexample`,{}).success(function(data){
				debug(`Found ${data.length} items.`);
				state.items = data || [];
				ctx.emit('disclaimers.items.fetched');
			});
		},

		addDisclaimerPopup: function(){
			var ctx = this;
			$http.post(Global.Server + `/np5services/items/np5confdisclaimer/insert`,{
				'itemId' : state.itemId,
				'organizationalUnit' : state.ou,
				'disclaimer' : state.disclaimer,
				'deleted' : 0
			}).success(function(){
				debug(`Inserted disclaimer`);
				ctx.emit('disclaimers.disclaimer.inserted');
			}).error(function(){
				debug(`Error inserting disclaimer`);
				ctx.emit('disclaimers.disclaimer.inserted.error');
			})
		},

		updateDisclaimerPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/items/np5confdisclaimer/update`,{
				'itemId' : state.itemId,
				'organizationalUnit' : state.ou,
				'disclaimer' : state.disclaimer
			}).success(function(){
				debug(`Updated disclaimer`);
				ctx.emit('disclaimers.disclaimer.updated');
			})
		},

		deleteDisclaimerPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/items/np5confdisclaimer/delete`,{
				'itemId' : state.itemId,
				'organizationalUnit' : state.ou
			}).success(function(){
				debug(`Deleted disclaimers`);
				ctx.emit('disclaimers.disclaimer.deleted');
			})
		},

		setSelectedRow: function(r){
			state.selectedRow = r;
			debug("selectedRow was updated");
			this.emit('disclaimers.selectedRow.updated');
		},

		setPage: function(p) {
			state.page = p;
			debug("page was updated");
			this.emit('disclaimers.page.updated');
		},

		setItemId: function(i) {
			state.itemId = i;
			debug("itemId was updated");
			this.emit('disclaimers.itemId.updated');
		},

		setOu: function(i) {
			state.ou = i;
			debug("ou was updated");
			this.emit('disclaimers.ou.updated');
		},

		setDisclaimer: function(i) {
			state.disclaimer = i;
			debug("disclaimer was updated");
			this.emit('disclaimers.disclaimertext.updated');
		},

		// Public API
		exports: {
			getDisclaimers: function() {
				return state.disclaimers;
			},
			getDisclaimersCount: function() {
				return state.disclaimersLength;
			},
			getTotalRows: function() {
				return DEFAULT_OPTIONS.rows;
			},
			getMaxPages: function() {
				return DEFAULT_OPTIONS.maximumPages;
			},
			getItemId: function(){
				return state.itemId;
			},
			getOu: function(){
				return state.ou;
			},
			getDisclaimer: function(){
				return state.disclaimer;
			},
			getItems: function(){
				return state.items;
			},
			getOus: function(){
				return state.ous;
			},
			getPage: function(){
				return state.page;
			},
			getSelectedRow: function(){
				return state.selectedRow;
			}
		}
	};
}
Register(DisclaimersStore);
Register(Disclaimers);