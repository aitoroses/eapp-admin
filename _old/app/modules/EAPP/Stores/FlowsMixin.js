import {Injector} from 'di';

var injector = new Injector();

var listen = require('angular/react/helpers/listen');



// FlowsMixin needed by JSX components
var FlowsMixin = module.exports = {
	flows() {
		var {
			FlowsDomain: {
				actions, events, handlers
			},
			FlowsStore: store,
		} = injector.get(['FlowsDomain','FlowsStore']);
		return {
			actions: actions,
			store: store
		}
	},

	// When mounted, add event listeners
	componentDidMount() {
		var store = injector.get('FlowsStore');
		listen.bind(this)(store, {
			'flows.fetched' : this.onFlowsFetch,
			'flows.length.fetched' : this.onItemsLengthFetch,
			'flows.steps.fetched' : this.onStepsFetch,
			'flows.fields.fetched' : this.onFieldsFetch,
			'flows.variables.fetched' : this.onVariablesFetch,
			'flows.taItemFlow.fetched' : this.onTaItemFlowFetch,
			'flows.selectedRow.updated' : this.updateStateButtons,
			'flows.steps.deleted' : this.deleteFlowField,
			'flows.flowfields.deleted' : this.deleteStepForm,
			'flows.stepform.deleted' : this.deleteStepRule,
			'flows.steprule.deleted' : this.deleteStepVars,
			'flows.stepvars.deleted' : this.deleteItemFlowTa,
			'flows.itemflowta.deleted' : this.deleteFlow,
			'flows.item.deleted' : this.updateTable,
			'flows.items.fetched' : this.onItemsFetch,
			'flows.flow.inserted' : this.onFlowInserted,
			'flows.partialSteps.updated' : this.updateSteps,
			'flows.flow.updated' : this.onFlowsUpdated,
			'flows.flow.inserted.error' : this.onErrorWhileInserting,
			'flows.flow.updated.error' : this.onErrorWhileUpdating,
			'flows.step.inserted.error' : this.onErrorWhileInsertingStep,
			'flows.master.fields.fetched' : this.onMasterFieldsFetch,
		});
	}
}