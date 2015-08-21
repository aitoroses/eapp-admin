import state from 'lib/state';
import ItemsStore from 'stores/ItemsStore';
import TasStore from 'stores/TasStore';

//var config = require('lib/config');

class FlowsStore {
	constructor() {
		var self = this;
		this.bindState("flows");

		this.state = {
			createFlow: {
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
				},
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
				}
			}
		}
	}

	getFields() {
		return this.state.createFlow.fields;
	}

	getFieldRuntime(fieldId) {
		return this.state.createFlow.fields[fieldId].runtime;
	}

	getFlowTas() {
		return this.state.createFlow.flowtas;
	}

	getFlowTasRuntime(combo) {
		return this.state.createFlow.flowtas[combo].runtime;
	}

}

export var store = state.createStore(FlowsStore);

window.store = store;
