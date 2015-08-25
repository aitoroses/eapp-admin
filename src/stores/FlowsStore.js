import state from 'lib/state';
import ItemsStore from 'stores/ItemsStore';
import TasStore from 'stores/TasStore';
import FieldsStore from 'stores/FieldsStore';

//var config = require('lib/config');

class FlowsStore {
	constructor() {
		var self = this;
		this.bindState("flows");

		this.state = {
			createFlow: {
				fields: {
					flowId: {
						runtime: {
							value: null,
							error: null
						},
						config: {
							type: 'number',
							label: 'Flow ID',
							fieldId: 'flowId',
							hint : 'Flow ID (number)',
							validations: ['required', 'maxlength']
						}
					},
					flowName: {
						runtime: {
							value: null,
							error: null
						},
						config: {
							type: 'text',
							label: 'Flow name',
							fieldId: 'flowName',
							hint : 'Flow name',
							validations: ['required', 'maxlength']
						}
					},
					flowDescription: {
						runtime: {
							value: null,
							error: null
						},
						config: {
							type: 'textarea',
							label: 'Flow description',
							fieldId: 'flowDescription',
							hint : 'Enter flow description',
							validations: ['required', 'maxlength']
						}
					},
					itemList: {
						runtime: {
							value: null,
							error: null
						},
						config: {
							type: 'combo',
							label: 'Item',
							fieldId: 'itemList',
							get validValues() {
								return ItemsStore.getAll() || [];
							},
							validations: ['required']
						}
					}
				},
				flowfields: {
					get masterFields() {
						return FieldsStore.getAll() || [];
					},
					get flowfields(){
						return [];
					},
					categories: []
				},
				flowtas: {
					masterTas: {
						runtime: {
							value: null,
							error: null
						},
						config: {
							type: 'combo',
							label: 'Therapeutical Areas',
							fieldId: 'masterTas',
							get validValues() {
								return TasStore.getAll() || [];
							},
							validations: ['required']
						}
					},
					flowtas: {
						runtime: {
							value: null,
							error: null
						},
						config: {
							type: 'combo',
							label: 'Therapeutical Areas Flow',
							fieldId: 'flowtas',
							get validValues() {
								return [];
							},
							validations: ['required']
						}
					}
				}
			},
			categories: [{'name':'GENERAL'},{'name': 'DETAILS'},{'name':'TABLE'}]
		}
	}

	getMasterFields() {
		return this.state.createFlow.flowfields.masterFields.map(function(element){
			return element.field;
		});
	}

	getFields() {
		return this.state.createFlow.fields;
	}

	getCategories() {
		return this.state.categories;
	}

	getFieldRuntime(fieldId) {
		return this.state.createFlow.fields[fieldId].runtime;
	}

	getFlowTas() {
		return this.state.createFlow.flowtas;
	}

	getCreate() {
		return this.state.createFlow;
	}

	getFlowFields() {
		return this.state.createFlow.flowfields;
	}

	getFlowTasRuntime(combo) {
		return this.state.createFlow.flowtas[combo].runtime;
	}

}

export var store = state.createStore(FlowsStore);

window.store = store;

store.on("update", function(state){console.log(store.getStateDescriptor().state);})