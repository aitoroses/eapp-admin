import {store as FlowsStore} from 'stores/FlowsStore';
import ItemsActions from 'actions/ItemsActions';

import shallowEqual from 'react-pure-render/shallowEqual';

class FlowsActions {

	queryItems(payload, resolve) {
		ItemsActions.findAll({}).then((validValues) => {
			var itemList = store.getFields().itemList
			itemList.config.set({validValues})
		})
	}

	setFieldRuntimeError({fieldId, error}, resolve) {
		var updated = store.getFieldRuntime(fieldId).set({error:error});
		resolve(updated);
	}

	setFieldRuntimeValue({fieldId, value}, resolve) {
		var updated = store.getFieldRuntime(fieldId).set({value:value});
		resolve(updated);
	}

	setFieldRuntime({fieldId, ...nextRuntime}, resolve) {
		var runtime = store.getFieldRuntime(fieldId)
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

global.act = actions;
