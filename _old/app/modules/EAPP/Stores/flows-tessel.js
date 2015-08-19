import state from './app-state';
import request from 'tessel-js/lib/request';
import validation from 'EAPP/validations';
import {createTesselBlueprint,ItemsResource, MasterFieldsResource, TasResource} from './RestFactory';

// Examples of using crud operations on RestFactory
// Define actions and delete this functions from window scope.
window.go = function() {
	var [store, actions] = createTesselBlueprint(ItemsResource, 'flows','items');
	actions.create({"itemId":134,"itemName":"aaaa","itemDescription":"aaaaa","deleted":0})
	.then(function(b) {debugger})
}

window.go3 = function() {
	var [store, actions] = createTesselBlueprint(ItemsResource, 'flows','items');
	actions.delete({"itemId":134})
	.then(function(b) {debugger})
}

window.go2 = function(){
	var [store, actions] = createTesselBlueprint(ItemsResource, 'flows','items');
	actions.update({"itemId":134,"itemName":"bbbb"})
	.then(function(b) {debugger})
}

window.go4 = function(firstResult, maxResults) {
	var [store, actions] = createTesselBlueprint(ItemsResource, 'flows','items');
	actions.findByPage({"firstResult":firstResult, "maxResults":maxResults})
	.then(function(b) {debugger})
}


var debug = require('logdown')({prefix: "FlowsStore"});

var config = require('EAPP/config');

function getField(name, fields) {
	return fields.filter(f => f.config.fieldId == name)[0]
}

class FlowsStore {

	constructor() {
		this.bindState("flows");
		this.state = {
			masterFields: [],
			flowFields: [],
			items: [],
			tas: [],
			flowTas: [],
			steps: [],
			getData: config.tables,
			categoryForFields: config.Category,
			combo1: null,
			combo2: null,
			combo3: null,
			combo4: null,

			fields: [{
				runtime: {
					value: null,
					error: false,
					fieldId: 'flowId'
				},
				config: {
					type: 'number',
					fieldId: 'flowId',
					placeholder : 'Number',
					validation : validation.number,
				}
			}]

			errors: {
				flowId: {
					'value': null,
					'placeholder' : 'Number',
					'validation' : validation.number,
					'error': false
				},
				flowName: {
					'value': null,
					'placeholder' : 'String',
					'validation' : validation.string,
					'error': false
				},
				flowDescription: {
					'value': null,
					'placeholder' : 'String',
					'validation' : validation.string,
					'error': false
				},
				filter: {
					'value': null,
					'placeholder' : 'String',
					'validation' : validation.string,
					'error': false
				}
			}

			
		}
	}

	getMasterFields() {
		return this.state.masterFields;
	}

	getItems() {
		return this.state.items;
	}

	getTas() {
		return this.state.tas;
	}

	getSteps() {
		return this.state.steps;
	}

	getTable(name){
		var datos = this.state.getData;
		var selectedTable = Object.keys(datos).filter(function(tabla){if(tabla==name){return tabla}});
		if(selectedTable.length==0){return false}else{return datos[selectedTable[0]]}
		return selectedTable;
	}

	getStepsColumns(table){
		var getData = this.getTable(table);
		if(getData){
			var data = getData.map(function(obj){
				var keys = Object.keys(obj);
				return obj[keys].displayName;
			});
			return data;
		}
	}

	getStepsAtomic(table){
		var getData = this.getTable(table);
		if(getData){
			var data = getData.map(function(obj){
				var keys = Object.keys(obj);
				return obj[keys].atomicData;
			});
			return data;
		}
	}

	getTypeOfColumn(table){
		var getData = this.getTable(table);
		if(getData){
			var ret= {};
			var data = getData.map(function(obj){
				var keys = Object.keys(obj);
				ret[keys[0]] = obj[keys].typeOfColumn;
				return ret;
			});
			return data[0];
		}
	}

	getData(){
		return this.state.getData;
	}

}

class FlowsActions {

	queryItems(payload, resolve) {
		var a = new ItemsResource();
		a.findAll({})
		.then((data) => {
			console.log("data it is fetched");
			var updated = this.set({items:data,filteredItems:data});
			resolve(data);
		})
	}

	queryMasterFields(payload, resolve) {
		var a = new MasterFieldsResource();
		a.findAll({})
		.then((data) => {
			this.set({masterFields:data});
		})
	}

	insertStep(val){
		var test = this.steps;
		test.pop().push(val);
		this.set({steps:test});
	}

	queryTas(payload, resolve) {
		var a = new TasResource();
		a.findAll({})
		.then((data) => {
			this.set({tas:data});
		})
	}

	setFlowId(text, resolve) {
		this.set({flowId:text});
		resolve(text);
	}

	setFlowName(text, resolve) {
		this.set({flowName:text});
		resolve(text);
	}

	setFlowDescription(text, resolve) {
		this.set({flowDescription:text});
		resolve(text);
	}

	setFirstId(id, resolve){
		this.set({fsid:id});
		resolve(id);
	}

	setCombo(combo, resolve) {
		this.set({combo:combo});
		resolve(combo);
	}

	setFilteredData(data, resolve) {
		this.set({filteredItems:data});
		resolve(data);
	}

	setEditStepRow(row, resolve) {
		this.set({row:row});
		resolve(row);
	}

	setCombo1(el, resolve){
		this.set({combo1:el})
		resolve(el);
	}

	setCombo2(el, resolve){
		this.set({combo2:el})
		resolve(el);
	}

	setCombo3(el, resolve){
		this.set({combo3:el})
		resolve(el);
	}

	setCombo4(el, resolve){
		this.set({combo4:el})
		resolve(el);
	}

}

export var store = state.createStore(FlowsStore);
export var actions = store.createActions(FlowsActions);