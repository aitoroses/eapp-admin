import state from 'lib/app-state';
import Resource from 'lib/resource';

// createTesselBlueprint:: Resource -> String -> String -> [FluxClasses]
var createTesselBlueprint = _.curry(function(Resource, bindKey, dataHolderKey){

    class GenericStore {

        state = {}

    	constructor() {
    		this.bindState(bindKey);
    	}
    	findAll() {
    		return this.state[dataHolderKey]
    	}
    }

    class GenericActions {
    	findAll(payload, resolve) {
    		var resource = new Resource();
    		resource.findAll(payload, (data) => {
    			this.set({[dataHolderKey]: data})
    			resolve(data)
    		})
    	}
    	findByPage(page, resolve) {
    		var resource = new Resource();
    		resource.findByPage(page.payload, page.firstResult, page.maxResults, (data) => {
    			this.set({[dataHolderKey]: data})
    			resolve(data)
    		})
    	}
    	count(page, resolve) {
    		var resource = new Resource();
    		resource.count(page.payload, (data) => {
    			this.set({[dataHolderKey]: data})
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
    	update(payload, resolve, reject){
    		var resource = new Resource();
    		resource.update(payload, resolve).then(() => {
    			// resolve(payload)
    		}).catch((e) => {
    			reject(e)
    		})
    	}
    }

    var store = state.createStore(GenericStore);
    var actions = store.createActions(GenericActions);

    return [store, actions];
})

export default createTesselBlueprint;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
