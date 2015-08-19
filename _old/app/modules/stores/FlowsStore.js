import state from 'lib/state';

//var config = require('lib/config');

class FlowsStore {
	constructor() {
		var self = this;
		this.bindState("flows");

		this.state = {
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
							return self.state.items;
						},
						validations: ['required']
					}
				}
			},

			items: []
		}
	}

	getFields() {
		return this.state.fields;
	}

	getItems() {
		this.state.items;
	}

	getFieldRuntime(fieldId) {
		return this.state.fields[fieldId];
	}

}

export var store = state.createStore(FlowsStore);

window.store = store;
