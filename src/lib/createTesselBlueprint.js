import state from 'lib/state';
import Resource from 'lib/Resource';
import tables from 'config/tables';

// createTesselBlueprint:: Resource -> String -> String -> [FluxClasses]
var createTesselBlueprint = _.curry(function(Resource, bindKey, dataHolderKey){

    class GenericStore {

      state = {
        [dataHolderKey]: []
      }

    	constructor() {
    		this.bindState(bindKey);
    	}

    	getAll() {
    		return this.state[dataHolderKey]
    	}

      getCount() {
        return this.state.count
      }

      getDefinition() {
        var t = tables;
        if (!t) return {}
        Object.freeze(t);
        return t[bindKey];
      }

      getFields() {
        return this.getDefinition().fields;
      }

      getTableName() {
        return this.getDefinition().tableName;
      }

      getErrors() {

      }
    }

    class GenericActions {

    	fetchAll(payload, resolve) {
    		var resource = new Resource();
    		resource.findAll(payload, (data) => {
    			this.set({[dataHolderKey]: data})
    			resolve(data)
    		})
    	}

    	fetchByPage(page, resolve) {
    		var resource = new Resource();
    		resource.findByPage(page.payload, page.firstResult, page.maxResults, (data) => {
    			this.set({[dataHolderKey]: data})
    			resolve(data)
    		})
    	}

    	fetchCount(page, resolve) {
    		var resource = new Resource();
    		resource.count(page.payload, (data) => {
    			this.set({count: data})
    			resolve(data)
    		})
    	}

    	create(payload, resolve, reject){
    		var resource = new Resource();
    		resource.create(payload, resolve).then(() => {
    			// resolve(payload)
    		}).catch((e) => {
    			reject(e)
    		})
    	}

    	delete(payload, resolve, reject){
    		var resource = new Resource();
    		resource.delete(payload, resolve).then(() => {
    			// resolve(payload)
    		}).catch((e) => {
    			reject(e)
    		})
    	}

    	update(action, resolve, reject){
        let {onServer, index, payload} = action;
        this[dataHolderKey].set({[index]: payload});
        if (onServer) {
          var resource = new Resource();
      		resource.update(payload, resolve).then(() => {
      			// resolve(payload)
      		}).catch((e) => {
      			reject(e)
      		})
      	}
    	}

      executeValidation() {

      }
    }

    var store = state.createStore(GenericStore);
    var actions = store.createActions(GenericActions);

    return [store, actions];
})

export default createTesselBlueprint;
