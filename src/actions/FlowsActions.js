import {store as FlowsStore} from 'stores/FlowsStore';
import ItemsActions from 'actions/ItemsActions';
import TasActions from 'actions/TasActions';
import FieldsActions from 'actions/FieldsActions';

import shallowEqual from 'react-pure-render/shallowEqual';

class FlowsActions {

	queryItems(payload, resolve) {
		ItemsActions.fetchAll({}).then((validValues) => {
			var itemList = FlowsStore.getFields().itemList
			itemList.config.set({validValues})
		})
	}

	queryTas(payload, resolve) {
		TasActions.fetchAll({}).then((validValues) => {
			var masterTas = FlowsStore.getFlowTas().masterTas
			masterTas.config.set({validValues})
		})
	}

	queryMasterFields(payload, resolve) {
		FieldsActions.fetchAll({}).then((masterFields) => {
			var fields = FlowsStore.getFlowFields();
			masterFields = masterFields.map(function(item){
				return {
					field: item,
					category: null
				}
			});
			fields.set({masterFields});
		})
	}

	setListForFlowTas({l1, l2, dir}, resolve) {
		var flowtas = FlowsStore.getCreate();
		var mutable = flowtas.flowtas.toJS();
		if(dir=="right") {
			mutable.masterTas.config.validValues = l1;
			mutable.flowtas.config.validValues = l2;
		}else {
			mutable.masterTas.config.validValues = l2;
			mutable.flowtas.config.validValues = l1;
		}
		var updated = flowtas.set({flowtas: mutable});
		resolve(updated);
	}

	setCategory({row, value}, resolve) {
		var flowFields = FlowsStore.getFlowFields();
		var categories = flowFields.categories;
		categories = categories.splice(row, 1, value);
		var updated = flowFields.set({categories});
		resolve(updated);
	}

	setFieldRuntimeError({fieldId, error}, resolve) {
		var runtime = FlowsStore.getFieldRuntime(fieldId);
		if(!runtime) {return}

		var update = () => {
			var updated = FlowsStore.getFieldRuntime(fieldId).set({error:error});
			resolve(updated);
			return updated;
		}

		if(!shallowEqual(runtime.error,error)){
			return update();
		}
		
	}

	setFieldRuntimeValue({fieldId, value}, resolve) {
		var runtime = FlowsStore.getFieldRuntime(fieldId);
		if(!runtime) {return}

		var update = () => {
			var updated = FlowsStore.getFieldRuntime(fieldId).set({value:value});
			resolve(updated);
			return updated;
		}

		if(!shallowEqual(runtime.value,value)){
			return update();
		}

	}

	setFieldRuntime({fieldId, ...nextRuntime}, resolve) {
		var runtime = FlowsStore.getFieldRuntime(fieldId)
		if (!runtime) {return}

	    var update = () => {
	    	var updated = runtime.set(nextRuntime)
			resolve(updated);
			return updated
	    }

		if (runtime.value != nextRuntime.value) {
			return update();
		}

		if (nextRuntime.error && !shallowEqual(runtime.error, nextRuntime.error)) {
			return update();
		}
	}

}


export var actions = FlowsStore.createActions(FlowsActions);

window.actions = actions;
