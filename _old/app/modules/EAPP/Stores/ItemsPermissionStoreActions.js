// Import the annotations
import {
	NgStore,
	NgActions,
	Register
} from 'annotations';

// Cookies from uncompresion
import {Cookies} from 'cookies';

/* Items Actions */

@NgActions({
	module: 'EAPP'
})
function ItemsPermission() {
	return {
		queryItemsPermission: "ADMIN_QUERY_ITEMS_PERMISSION",
		queryItemsPermissionCount: "ADMIN_QUERY_ITEMS_PERMISSION_COUNT",
		queryItems: "ADMIN_QUERY_ITEMS_ITEMS_PERMISSION",
		queryCountries: "ADMIN_QUERY_COUNTRIES_PERMISSION",
		setPage: "ADMIN_SET_PAGE_ITEMS_PERMISSION",
		setSearch : "ADMIN_SET_SEARCH_ITEMS_PERMISSION",
		setItemId : "ADMIN_SET_ITEMID_ITEMS_PERMISSION",
		setItemName : "ADMIN_SET_ITEMNAME_ITEMS_PERMISSION",
		setOu : "ADMIN_SET_OU_ITEMS_PERMISSION",
		setCountry : "ADMIN_SET_COUNTRY_ITEMS_PERMISSION",
		setDivision : "ADMIN_SET_DIVISION_ITEMS_PERMISSION",
		setBusinessRole : "ADMIN_SET_BUSINESS_ROLE_ITEMS_PERMISSION",
		setIsForMedical : "ADMIN_SET_IS_FOR_MEDICAL_ITEMS_PERMISSION",
		setIsForMarketing : "ADMIN_SET_IS_FOR_MARKETING_ITEMS_PERMISSION",
		setIsForSales : "ADMIN_SET_IS_FOR_SALES_ITEMS_PERMISSION",
		setEverybody : "ADMIN_SET_EVERYBODY_ITEMS_PERMISSION",
		addItemPermissionPopup : "ADMIN_ADD_ITEMS_PERMISSION",
		deleteItemPermissionPopup : "ADMIN_DELETE_ITEMS_PERMISSION",
		updateItemPermissionPopup : "ADMIN_UPDATE_ITEMS_PERMISSION",
		setItemNameForCombo : "ADMIN_SET_ITEMNAMEFORCOMBO_ITEMS_PERMISSION",
		setSelectedRow : "ADMIN_SET_SELECTED_ROW_ITEMS_PERMISSION"
	};
}

/**
 * Items Store
 */
@NgStore({
	module: 'EAPP',
	inject: ['ItemsPermissionDomain',"$http", "Global", 'AppState', '$location']
})
function ItemsPermissionStore() {
	var handlers = this.ItemsPermissionDomain.handlers;
	var $http = this.$http;
	var Global = this.Global;
	var debug = this.debug('ItemsPermissionStore');
	var $location = this.$location;
	var AppState = this.AppState;

	var DEFAULT_OPTIONS = {
		"rows":8,
		"maximumPages":10
	}

	// Initial app state
	var state = this.AppState.state.itemsPermission = {};
	state.itemsPermission = [];
	state.itemsPermissionLength = null;
	state.selectedRow = null;
	state.page = 1;
	state.search = "";
	state.itemId = null;
	state.itemName = null;
	state.itemOu = null;
	state.country = null;
	state.division = null;
	state.businessRole = null;
	state.isForMedical = null;
	state.isForMarketing = null;
	state.isForSales = null;
	state.everybody = null;
	state.items = null;
	state.ous = [{"id":1,"ou":"AUSTRIA_PH"},{"id":2,"ou":"SOUTHKOREA_PH"}];
	state.countries = null;
	state.itemNameForCombo = null;

	return {

		handlers: handlers,

		queryItemsPermission: function() {
			var ctx = this;
			var firstResult = state.page*DEFAULT_OPTIONS.rows-(DEFAULT_OPTIONS.rows);
			var maxResults = DEFAULT_OPTIONS.rows;
			$http.post(Global.Server + `/np5services/items/np5itemspermission/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{
				'itemId' : state.itemId,
				'country' : state.country,
				'division' : state.division,
				'ou' : state.itemOu
			})
			.success(function(data){
			debug(`Found ${data.length} items permissions.`)
			state.itemsPermission = data || [];
			ctx.emit('itemsPermission.fetched');
		})
		},

		queryItemsPermissionCount: function(a,b) {
			var ctx = this;
			$http.post(Global.Server + `/np5services/items/np5itemspermission/count`,{
				'itemId' : state.itemId,
				'country' : state.country,
				'division' : state.division,
				'ou' : state.itemOu
			}).success(function(data){
				debug(`Found ${data} items permissions.`)
				state.itemsPermissionLength = data || [];
				ctx.emit('itemsPermission.length.fetched');
			})
		},

		queryItems: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confitem/selectbyexample`,{}).success(function(data){
				debug(`Found ${data.length} items.`);
				state.items = data || [];
				ctx.emit('itemsPermission.items.fetched');
			});
		},

		queryCountries: function() {
			var ctx = this;
			$http.post(Global.Server + `/np5services/countryandta/np5country/selectbyexample`,{
				'itemName' : state.itemName
			}).success(function(data){
				debug(`Found ${data.length} countries.`);
				state.countries = data || [];
				ctx.emit('itemsPermission.countries.fetched');
			});
		},

		addItemPermissionPopup: function(){
			var ctx = this;
			$http.post(Global.Server + `/np5services/items/np5itemspermission/insert`,{
				'itemId' : state.itemId,
				'ou' : state.itemOu,
				'country' : state.country,
				'division' : state.division,
				'businessRole' : state.businessRole,
				'isForMedical' : state.isForMedical,
				'isForMarketing' : state.isForMarketing,
				'isForSales' : state.isForSales,
				'everybody' : state.everybody,
				'deleted' : 0
			}).success(function(){
				debug(`Inserted items permissions`);
				ctx.emit('itemsPermission.item.inserted');
			})
		},

		updateItemPermissionPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/items/np5itemspermission/update`,{
				'itemId' : state.itemId,
				'ou' : state.itemOu,
				'country' : state.country,
				'division' : state.division,
				'businessRole' : state.businessRole,
				'isForMedical' : state.isForMedical,
				'isForMarketing' : state.isForMarketing,
				'isForSales' : state.isForSales,
				'everybody' : state.everybody
			}).success(function(){
				debug(`Updated items permissions`);
				ctx.emit('itemsPermission.item.updated');
			})
		},

		deleteItemPermissionPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/items/np5itemspermission/delete`,{
				'itemId' : state.itemId,
				'country' : state.country,
				'division' : state.division
			}).success(function(){
				debug(`Deleted items permissions`);
				ctx.emit('itemsPermission.item.deleted');
			})
		},

		setSelectedRow: function(r) {
			state.selectedRow = r;
			debug("selectedRow was updated");
			this.emit("itemsPermission.selectedRow.updated");
		},

		setPage: function(p) {
			state.page = p;
			debug("page was updated");
			this.emit('itemsPermission.page.updated');
		},

		setSearch: function(s) {
			state.search = s;
			debug("search was updated");
			this.emit('itemsPermission.search.updated');
		},

		setItemId: function(i) {
			state.itemId = i;
			debug("itemId was updated");
			this.emit('itemsPermission.itemId.updated');
		},

		setItemName: function(i) {
			state.itemName = i;
			debug("itemName was updated");
			this.emit("itemsPermission.itemName.updated");
		},

		setOu: function(i) {
			state.itemOu = i;
			debug("itemOu was updated");
			this.emit('itemsPermission.itemOu.updated');
		},

		setCountry: function(i) {
			state.country = i;
			debug("country was updated");
			this.emit('itemsPermission.country.updated');
		},

		setDivision: function(i) {
			state.division = i;
			debug("division was updated");
			this.emit('itemsPermission.division.updated');
		},
		setBusinessRole: function(i) {
			state.businessRole = i;
			debug("businessRole was updated");
			this.emit("itemsPermission.businessRole.updated");
		},
		setIsForMedical: function(i) {
			state.isForMedical = i;
			debug("isForMedical was updated");
			this.emit("itemsPermission.isForMedical.updated");
		},
		setIsForMarketing: function(i) {
			state.isForMarketing = i;
			debug("isForMarketing was updated");
			this.emit("itemsPermission.isForMarketing.updated");
		},
		setIsForSales: function(i) {
			state.isForSales = i;
			debug("isForSales was updated");
			this.emit("itemsPermission.isForSales.updated");
		},
		setEverybody: function(i) {
			state.everybody = i;
			debug("everybody was updated");
			this.emit("itemsPermission.everybody.updated");
		},

		setItemNameForCombo: function(i) {
			state.itemNameForCombo = i;
			debug("itemNameForCombo was updated");
			this.emit("itemsPermission.itemNameForCombo.updated");
		},

		// Public API
		exports: {
			getItemsPermission: function() {
				return state.itemsPermission;
			},
			getItemsPermissionCount: function() {
				return state.itemsPermissionLength;
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
			getItemName: function(){
				return state.itemName;
			},
			getOu: function(){
				return state.itemOu;
			},
			getCountry: function(){
				return state.country;
			},
			getDivision: function(){
				return state.division;
			},
			getBusinessRole: function(){
				return state.businessRole;
			},
			getIsForMarketing: function(){
				return state.isForMarketing;
			},
			getIsForMedical: function(){
				return state.isForMedical;
			},
			getIsForSales: function(){
				return state.isForSales;
			},
			getEverybody: function(){
				return state.everybody;
			},
			getItems: function(){
				return state.items;
			},
			getOus: function(){
				return state.ous;
			},
			getCountries: function(){
				return state.countries;
			},
			getSelectedRow: function(){
				return state.selectedRow;
			}
		}
	};
}
Register(ItemsPermissionStore);
Register(ItemsPermission);