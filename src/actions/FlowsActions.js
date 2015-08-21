import {store as FlowsStore} from 'stores/FlowsStore';
import ItemsActions from 'actions/ItemsActions';
import TasActions from 'actions/TasActions';

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
