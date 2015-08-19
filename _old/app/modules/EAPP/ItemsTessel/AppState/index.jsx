var react = require('angular/react');
import state from 'lib/app-state';
import request from 'tessel-js/lib/request';
import {createTesselBlueprint,ItemsResource} from '../../Stores/RestFactory';

var config = require('EAPP/config');
// Create a store
class ItemsStore {

    constructor() {
        this.bindState("items");
        this.state = {
            items: [],
            filteredItems: [],
            width: 0,
            selectedRow: null,
            empty: false,
            getData: config.tables,
            page: 1,
	        maximumPages: config.DefaultOptions.maximumPages,
	        dataLength: null,
	        maxPageArr: null,
	        maxPage: null,
	        showPaginator: true,
            search: "",
            itemsLength: null,
            classNewItem: "hideNewItem",
            newItem: {id: null, name: "", description: ""},
            errorNewItem: {id: false, name: false, description: false},
            loadPagination: true
        }
    }
    getLoadPagination() {
        return this.state.loadPagination;
    }

    getItems() {
        return this.state.items;
    }
    getWidth() {
        return this.state.width;
    }
    getSelectedRow() {
        return this.state.selectedRow;
    }
    getEmpty() {
        return this.state.empty;
    }
    getData() {
        return this.state.getData.ItemsTable;
    }

    getClassNewItem() {
        return this.state.classNewItem;
    }

    getObjectPagination() {
        return {
            page: this.state.page,
            maximumPages: this.state.maximumPages,
            dataLength: this.state.dataLength,
            maxPageArr: this.state.maxPageArr,
            maxPage: this.state.maxPage,
            showPaginator: this.state.showPaginator,
            itemsLength: this.state.itemsLength
        }
    }
    getPage() {
        return this.state.page;
    }
    getMaximumPages() {
        return this.state.maximumPages;
    }
    getDataLength() {
        return this.state.dataLength;
    }
    getMaxPageArr() {
        return this.state.maxPageArr;
    }
    getMaxPage() {
        return this.state.maxPage;
    }
    getShowPaginator() {
        return this.state.showPaginator;
    }
    getSearch(){
        return this.state.search;
    }
    getItemsLength(){
        return this.state.itemsLength;
    }

    getItemsCount() {
        return this.state.itemsLength;
    }
    getTotalRows() {
        return config.DefaultOptions.rows;
    }

    getNewItem() {
        return this.state.newItem;
    }

    getErrorNewItem(){
        return this.state.errorNewItem;
    }

}


// Create actions
class ItemsActions {

    queryItems(payload, resolve) {
        var a = Number.isInteger(parseInt(store.getSearch())) ? store.getSearch() : "";
        var b = Number.isInteger(store.getSearch()) ? "" : store.getSearch();
        var firstResult = 0;
        if(store.getPage() > 0){
            firstResult = store.getPage()*store.getTotalRows()-(store.getTotalRows());
        }
        var [storeQuery, actionsQuery] = new createTesselBlueprint(ItemsResource, "items", "items");

        actionsQuery.findByPage({"payload": {"itemId": a, "itemDescription": b}, "firstResult": firstResult, "maxResults": store.getTotalRows()});

    }

    queryItemsCount(payload, resolve) {
        var a = Number.isInteger(parseInt(store.getSearch())) ? store.getSearch() : "";
        var b = Number.isInteger(store.getSearch()) ? "" : store.getSearch();
        var firstResult = 0;
        if(store.getPage() > 0){
            firstResult = store.getPage()*store.getTotalRows()-(store.getTotalRows());
        }
        var [storeQuery, actionsQuery] = new createTesselBlueprint(ItemsResource, "items", "itemsLength");

        actionsQuery.count({"payload": {"itemId": a, "itemDescription": b}})
                    .then(() => {actions.setMaxPageArr(null);});
        actions.setLoadPagination(true);
    }

    saveNewItem() {
        var f = new Date();
        var item = new Object();
        item.itemId = store.getNewItem().id;
        item.itemName = store.getNewItem().name;
        item.itemDescription = store.getNewItem().description;
        item.dateCreation = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear().toString().substr(2,2);
        item.dateModified = null;
        item.userCreation = "System";
        item.userModified = null;
        item.deleted = 0;

        var [storeQuery, actionsQuery] = new createTesselBlueprint(ItemsResource, "items", "errores");
        actionsQuery.create(item)
                    .then(()=>{actions.queryItems();});
        actions.setClassNewItem("hideNewItem");

        actions.setNewItem({id: null, name:"", description: ""});
    }

    saveItem() {
        var f = new Date();
        var item = new Object();
        item.itemId = store.getNewItem().id;
        item.itemName = store.getNewItem().name;
        item.itemDescription = store.getNewItem().description;
        item.dateCreation = store.getNewItem().dateCreation;
        item.dateModified = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear().toString().substr(2,2);
        item.userCreation = "System";
        item.userModified = null;
        item.deleted = 0;

        var [storeQuery, actionsQuery] = new createTesselBlueprint(ItemsResource, "items", "errores");
        actionsQuery.update(item)
                    .then(()=>{actions.queryItems();});
        actions.setClassNewItem("hideNewItem");

        actions.setNewItem({id: null, name:"", description: ""});
    }

    deleteItem(itemId) {
        var [storeQuery, actionsQuery] = new createTesselBlueprint(ItemsResource, "items", "errores");
        actionsQuery.delete({"itemId":itemId})
                    .then(()=>{actions.queryItems();});

    }
    setLoadPagination(nLoadPagination, resolve) {
        this.set({loadPagination: nLoadPagination});
        resolve(nLoadPagination);
    }

    setItems(nItems, resolve) {
        this.set({items: nItems});
        resolve(nItems);
    }
    setWidth(nWidth, resolve) {
        this.set({width: nWidth});
        resolve(nWidth);
    }
    setSelectedRow(nSelectedRow, resolve) {
        this.set({selectedRow: nSelectedRow});
        resolve(nSelectedRow);
    }
    setEmpty(nEmpty, resolve) {
        this.set({empty: nEmpty});
        resolve(nEmpty);
    }
    setEditStepRow(row, resolve) {
		this.set({row:row});
		resolve(row);
	}
    setPage(nPage, resolve) {
        this.set({page:nPage});
        resolve(nPage);
    }

    setClassNewItem(nClassNewItem, resolve) {
        this.set({classNewItem:nClassNewItem});
        resolve(nClassNewItem);
    }

    setDataLength(nDataLength, resolve) {
        this.set({dataLength:nDataLength});
        resolve(nDataLength);
    }
    setMaxPageArr(nMaxPageArr, resolve) {
        this.set({maxPageArr:nMaxPageArr});
        resolve(nMaxPageArr);
    }
    setMaxPage(nMaxPage, resolve) {
        this.set({maxPage:nMaxPage});
        resolve(nMaxPage);
    }
    setShowPaginator(nShowPaginator, resolve) {
        this.set({showPaginator:nShowPaginator});
        resolve(nShowPaginator);
    }
    setSearch(nSearch, resolve) {
        this.set({search:nSearch});
        resolve(nSearch);
    }
    setNewItem(nNewItem, resolve) {
        this.set({newItem:nNewItem});
        resolve(nNewItem);
    }

    setErrorNewItem(nErrorNewItem, resolve){
        this.set({errorNewItem:nErrorNewItem});
        resolve(nErrorNewItem);
    }

}

// Export instances
export var store = state.createStore(ItemsStore);
export var actions = store.createActions(ItemsActions);
