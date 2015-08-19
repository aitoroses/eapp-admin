var react = require('angular/react');
import state from 'lib/app-state';
import request from 'tessel-js/lib/request';
import {createTesselBlueprint, CountriesResource} from '../../Stores/RestFactory';

var config = require('EAPP/config');
// Create a store
class CountriesStore {

    constructor() {
        this.bindState("countries");
        this.state = {
            countries: [],
            filteredCountries: [],
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
            countriesLength: null,
            classNewCountry: "hideNewCountry",
            newCountry: {id: null, name: "", code: ""},
            errorNewCountry: {id: false, name: false, code: false},
            loadPagination: true
        }
    }

    getLoadPagination() {
        return this.state.loadPagination;
    }

    getCountries() {
        return this.state.countries;
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
        return this.state.getData.CountriesTable;
    }

    getClassNewCountry() {
        return this.state.classNewCountry;
    }

    getObjectPagination() {
        return {
            page: this.state.page,
            maximumPages: this.state.maximumPages,
            dataLength: this.state.dataLength,
            maxPageArr: this.state.maxPageArr,
            maxPage: this.state.maxPage,
            showPaginator: this.state.showPaginator,
            countriesLength: this.state.countriesLength
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
    getCountriesLength(){
        return this.state.countriesLength;
    }

    getCountriesCount() {
        return this.state.countriesLength;
    }
    getTotalRows() {
        return config.DefaultOptions.rows;
    }

    getNewCountry() {
        return this.state.newCountry;
    }

    getErrorNewCountry(){
        return this.state.errorNewCountry;
    }

}


// Create actions
class CountriesActions {

    queryCountries(payload, resolve) {
        var firstResult = 0;
        if(store.getPage() > 0){
            firstResult = store.getPage()*store.getTotalRows()-(store.getTotalRows());
        }
        var [storeQuery, actionsQuery] = new createTesselBlueprint(CountriesResource, "countries", "countries");

        actionsQuery.findByPage({"payload": {"countryName": store.getSearch()}, "firstResult": firstResult, "maxResults": store.getTotalRows()});
    }

    queryCountriesCount(payload, resolve) {
        var firstResult = 0;
        if(store.getPage() > 0){
            firstResult = store.getPage()*store.getTotalRows()-(store.getTotalRows());
        }
        var [storeQuery, actionsQuery] = new createTesselBlueprint(CountriesResource, "countries", "countriesLength");

        actionsQuery.count({"payload": {"countryName": store.getSearch()}})
                    .then(() => {actions.setMaxPageArr(null);});
        actions.setLoadPagination(true);
    }

    saveNewCountry() {
        var f = new Date();
        var country = new Object();
        country.countryId = store.getNewCountry().id;
        country.countryName = store.getNewCountry().name;
        country.countryCode = store.getNewCountry().code;
        country.dateCreation = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear().toString().substr(2,2);
        country.dateModified = null;
        country.userCreation = "System";
        country.userModified = null;
        country.deleted = 0;

        var [storeQuery, actionsQuery] = new createTesselBlueprint(CountriesResource, "countries", "errores");
        actionsQuery.create(country)
                    .then(()=>{actions.queryCountries();});
        actions.setClassNewCountry("hideNewCountry");

        actions.setNewCountry({id: null, name:"", code: ""});
    }

    saveCountry() {
        var f = new Date();
        var country = new Object();
        country.countryId = store.getNewCountry().id;
        country.countryName = store.getNewCountry().name;
        country.countryCode = store.getNewCountry().code;
        country.dateCreation = store.getNewCountry().dateCreation;
        country.dateModified = f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear().toString().substr(2,2);
        country.userCreation = "System";
        country.userModified = null;
        country.deleted = 0;

        var [storeQuery, actionsQuery] = new createTesselBlueprint(CountriesResource, "countries", "errores");
        actionsQuery.update(country)
                    .then(()=>{actions.queryCountries();});
        actions.setClassNewCountry("hideNewCountry");

        actions.setNewCountry({id: null, name:"", code: ""});
    }

    deleteCountry(countryId) {
        var [storeQuery, actionsQuery] = new createTesselBlueprint(CountriesResource, "countries", "errores");
        actionsQuery.delete({"countryId":countryId})
                    .then(()=>{actions.queryCountries();});
    }

    setLoadPagination(nLoadPagination, resolve) {
        this.set({loadPagination: nLoadPagination});
        resolve(nLoadPagination);
    }

    setCountry(nCountry, resolve) {
        this.set({country: nCountry});
        resolve(nCountry);
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

    setClassNewCountry(nClassNewCountry, resolve) {
        this.set({classNewCountry:nClassNewCountry});
        resolve(nClassNewCountry);
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
    setNewCountry(nNewCountry, resolve) {
        this.set({newCountry:nNewCountry});
        resolve(nNewCountry);
    }

    setErrorNewCountry(nErrorNewCountry, resolve){
        this.set({errorNewCountry:nErrorNewCountry});
        resolve(nErrorNewCountry);
    }

}

// Export instances
export var store = state.createStore(CountriesStore);
export var actions = store.createActions(CountriesActions);
