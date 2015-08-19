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
function Items() {
	return {
		queryItems: "ADMIN_QUERY_ITEMS",
		queryItemsCount: "ADMIN_QUERY_ITEMS_COUNT",
		setPage: "ADMIN_SET_PAGE_ITEMS",
		setSearch : "ADMIN_SET_SEARCH_ITEMS",
		setItemId : "ADMIN_SET_ITEMID_ITEMS",
		setItemDescription : "ADMIN_SET_ITEMDESCRIPTION_ITEMS",
		setItemName : "ADMIN_SET_ITEMNAME_ITEMS",
		addItemPopup : "ADMIN_ADD_ITEMS",
		deleteItemPopup : "ADMIN_DELETE_ITEMS",
		updateItemPopup : "ADMIN_UPDATE_ITEMS"
	};
}

/**
 * Items Store
 */
@NgStore({
	module: 'EAPP',
	inject: ['ItemsDomain',"$http", "Global", 'AppState', '$location']
})
function ItemsStore() {
	var handlers = this.ItemsDomain.handlers;
	var $http = this.$http;
	var Global = this.Global;
	var debug = this.debug('ItemsStore');
	var $location = this.$location;
	var AppState = this.AppState;

	var DEFAULT_OPTIONS = {
		"rows":8,
		"maximumPages":10
	}

	// Initial app state
	var state = this.AppState.state.items = {};
	state.items = [];
	state.itemsLength = null;
	state.selectedRow = null;
	state.page = 1;
	state.search = "";
	state.itemId = null;
	state.itemDescription = null;
	state.itemName = null;

	return {

		handlers: handlers,

		queryItems: function() {
			var ctx = this;
			var firstResult = state.page*DEFAULT_OPTIONS.rows-(DEFAULT_OPTIONS.rows);
			var maxResults = DEFAULT_OPTIONS.rows;
			if(state.search==""){
				$http.post(Global.Server + `/eappservices/flowstepitem/confitem/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{})
				.success(function(data){
				debug(`Found ${data.length} items.`)
				state.items = data || [];
				ctx.emit('items.fetched');
			})
			}else{
				var a = Number.isInteger(parseInt(state.search)) ? state.search : "";
				var b = Number.isInteger(state.search) ? "" : state.search;
				$http.post(Global.Server + `/eappservices/flowstepitem/confitem/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{
					'itemId' : a,
					'itemDescription' : b
				})
				.success(function(data){
				debug(`Found ${data.length} items.`)
				state.items = data || [];
				ctx.emit('items.fetched');
			})
			}
		},

		queryItemsCount: function(a,b) {
			var ctx = this;
			var a = Number.isInteger(parseInt(state.search)) ? state.search : "";
			var b = Number.isInteger(state.search) ? "" : state.search;
			$http.post(Global.Server + `/eappservices/flowstepitem/confitem/count`,{
				'itemId' : a,
				'itemDescription' : b
			}).success(function(data){
				debug(`Found ${data} items.`)
				state.itemsLength = data || [];
				ctx.emit('items.length.fetched');
			})
		},

		addItemPopup: function(){
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confitem/insert`,{
				'itemId' : state.itemId,
				'itemDescription' : state.itemDescription,
				'itemName' : state.itemName,
				'deleted' : 0
			}).success(function(){
				debug(`Inserted items`);
				ctx.emit('items.item.inserted');
			}).error(function(){
				debug(`Error inserting items`);
				ctx.emit('items.item.inserted.error');
			})
		},

		updateItemPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confitem/update`,{
				'itemId' : state.itemId,
				'itemDescription' : state.itemDescription,
				'itemName' : state.itemName
			}).success(function(){
				debug(`Updated items`);
				ctx.emit('items.item.updated');
			})
		},

		deleteItemPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confitem/delete`,{
				'itemId' : state.itemId
			}).success(function(){
				debug(`Deleted items`);
				ctx.emit('items.item.deleted');
			})
		},

		setPage: function(p) {
			state.page = p;
			debug("page was updated");
			this.emit('items.page.updated');
		},

		setSearch: function(s) {
			state.search = s;
			debug("search was updated");
			this.emit('items.search.updated');
		},

		setItemId: function(i) {
			state.itemId = i;
			debug("itemId was updated");
			if(i!=null){
				this.emit('items.itemId.updated');
			}
		},

		setItemDescription: function(i) {
			state.itemDescription = i;
			debug("itemDescription was updated");
			this.emit('items.itemDescription.updated');
		},

		setItemName: function(i) {
			state.itemName = i;
			debug("itemName was updated");
			this.emit('items.itemName.updated');
		},

		// Public API
		exports: {
			getItems: function() {
				return state.items;
			},
			getItemsCount: function() {
				return state.itemsLength;
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
			getItemDescription: function(){
				return state.itemDescription;
			},
			getItemName: function(){
				return state.itemName;
			},
			getPage: function(){
				return state.page;
			}
		}
	};
}
Register(ItemsStore);
Register(Items);