import request from 'tessel-js/lib/request';

class Resource {
	constructor(resource){
		this._resource = resource;
	}

	findAll(payload, callback) {
		return request.post(__config.server + `/${this._resource}/selectbyexample`,payload)
		.then((req) => {
			var data = req.body;
			if(callback) callback(data);
			return data;
		})
	}

	findByPage(payload, firstResult, maxResults, callback) {
		return request.post(__config.server + `/${this._resource}/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults, payload)
		.then((req) => {
			var data = req.body;
			if(callback) callback(data);
			return data;
		})
	}

  count(payload, callback) {
      return request.post(__config.server + `/${this._resource}/count`, payload)
      .then((req) => {
          var data = req.body;
          if(callback) callback(data);
          return data;
      })
  }

	create(obj, callback) {
		return request.post(__config.server + `/${this._resource}/insert`)
		.send(obj)
		.then(({body}) => {
			callback(body);
		})
		.catch(e => {
			console.log("Error Insertando");
		})
	}

	delete(obj, callback) {
		return request.put(__config.server + `/${this._resource}/delete`)
		.send(obj)
		.then(({body}) => {
			callback(body);
		})
		.catch(e => {
			console.log("Error Eliminando");
		})
	}
	
	update(obj, callback) {
		return request.put(__config.server + `/${this._resource}/update`)
		.send(obj)
		.then(({body}) => {
			callback(body);
		})
		.catch(e => {
			console.log("Error Updateando");
		})
	}

}

export class ItemsResource extends Resource {
	constructor(){
		super("/eappservices/flowstepitem/confitem");
	}
}

export class CountriesResource extends Resource {
	constructor(){
		super("/np5services/countryandta/np5country");
	}
}

export class TasResource extends Resource {
	constructor(){
		super("/np5services/countryandta/np5therapeuticalarea");
	}
}

export class ItemsPermissionsResource extends Resource {
	constructor(){
		super("/np5services/items/np5itemspermission");
	}
}

export class DisclaimersResource extends Resource {
	constructor(){
		super("/np5services/np5confdisclaimer");
	}
}

export class FlowsResource extends Resource {
	constructor(){
		super("/eappservices/flowstepitem/confflow");
	}
}

export class StepsResource extends Resource {
	constructor(){
		super("/eappservices/flowstepitem/confstep");
	}
}

export class VariablesResource extends Resource {
	constructor(){
		super("/eappservices/varsandrules/confstepvars");
	}
}

export class MasterFieldsResource extends Resource {
	constructor(){
		super("/eappservices/fieldandform/conffield");
	}
}

export class NP5ItemsFlowsTaResource extends Resource {
	constructor(){
		super("/np5services/items/np5itemflowta");
	}
}

export default Resource;
