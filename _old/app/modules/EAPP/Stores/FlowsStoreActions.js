// Import the annotations
import {
	NgStore,
	NgActions,
	Register
} from 'annotations';

// Cookies from uncompresion
import {Cookies} from 'cookies';

/* Flows Actions */

@NgActions({
	module: 'EAPP'
})
function Flows() {
	return {
		queryFlows: "ADMIN_QUERY_FLOWS",
		queryFlowsCount: "ADMIN_QUERY_FLOWS_COUNT",
		querySteps: "ADMIN_QUERY_STEPS",
		queryFields: "ADMIN_QUERY_FIELDS",
		queryMasterFields: "ADMIN_QUERY_MASTER_FIELDS",
		queryVariables: "ADMIN_QUERY_VARIABLES",
		queryTaItemFlow: "ADMIN_QUERY_TA_ITEM_FLOW",
		queryItems: "ADMIN_QUERY_ITEMS",
		setFlow: "ADMIN_SET_FLOW_FLOWS",
		setPage: "ADMIN_SET_PAGE_FLOWS",
		setSearch : "ADMIN_SET_SEARCH_FLOWS",
		setFlowId : "ADMIN_SET_FLOWID_FLOWS",
		setFlowName : "ADMIN_SET_FLOWNAME_FLOWS",
		setFlowDescription : "ADMIN_SET_FLOWDESCRIPTION_FLOWS",
		setFirstStep : "ADMIN_SET_FIRSTSTEP_FLOWS",
		setItemId : "ADMIN_SET_ITEMID_FLOWS",
		setItemDescription : "ADMIN_SET_ITEMDESCRIPTION_FLOWS",
		setItemName : "ADMIN_SET_ITEMNAME_FLOWS",
		addFlowPopup : "ADMIN_ADD_FLOWS",
		updateFlowPopup: "ADMIN_UPDATE_FLOWS_FIRST_STEP",
		addStepPopup : "ADMIN_ADD_STEPS",
		updateStepPopup: "ADMIN_UPDATE_STEPS",
		deleteStepPopup : "ADMIN_UPDATE_DELETED_STEPS",
		deleteFlowPopup : "ADMIN_DELETE_FLOWS",
		deleteSteps : "ADMIN_DELETE_STEPS_FLOWS",
		deleteFlowField : "ADMIN_DELETE_FLOWFIELD_FLOWS",
		deleteSpecificFlowField: "ADMIN_DELETE_SPECIFIC_FLOWFIELD_FLOWS",
		deleteStepForm : "ADMIN_DELETE_STEPFORM_FLOWS",
		deleteStepRule : "ADMIN_DELETE_STEPRULE_FLOWS",
		deleteStepVars : "ADMIN_DELETE_STEPVARS_FLOWS",
		deleteSpecificStepVars: "ADMIN_DELETE_SPECIFIC_STEPVARS_FLOWS",
		deleteItemFlowTa : "ADMIN_DELETE_ITEMFLOWTA_FLOWS",
		deleteSpecificItemFlowTa: "ADMIN_DELETE_SPECIFIC_ITEMFLOWTA_FLOWS",
		updateItemPopup : "ADMIN_UPDATE_FLOWS",
		setSelectedRow : "ADMIN_SET_SELECTED_ROW_FLOWS",
		savePartialSteps : "ADMIN_SAVE_PARTIALSTEPS_FLOWS"
	};
}

/**
 * Flows Store
 */
@NgStore({
	module: 'EAPP',
	inject: ['FlowsDomain',"$http", "Global", 'AppState', '$location']
})
function FlowsStore() {
	var handlers = this.FlowsDomain.handlers;
	var $http = this.$http;
	var Global = this.Global;
	var debug = this.debug('FlowsStore');
	var $location = this.$location;
	var AppState = this.AppState;

	var DEFAULT_OPTIONS = {
		"rows":8,
		"maximumPages":10
	}

	// Initial app state
	var state = this.AppState.state.flows = {};
	state.flows = [];
	state.flowsLength = null;
	state.steps = [];
	state.selectedRow = null;
	state.page = 1;
	state.search = "";
	state.itemId = null;
	state.itemDescription = null;
	state.itemName = null;
	state.items = [];
	state.flowId = null;
	state.flowName = null;
	state.flowDescription = null;
	state.firstStep = null;
	state.partialSteps = null;
	state.fields = [];
	state.variables = [];
	state.taItemFlow = [];
	state.masterFields = [];

	return {

		handlers: handlers,

		queryFlows: function() {
			var ctx = this;
			var firstResult = state.page*DEFAULT_OPTIONS.rows-(DEFAULT_OPTIONS.rows);
			var maxResults = DEFAULT_OPTIONS.rows;
			if(state.search==""){
				$http.post(Global.Server + `/eappservices/flowstepitem/confflow/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{})
				.success(function(data){
				debug(`Found ${data.length} flows.`)
				state.flows = data || [];
				ctx.emit('flows.fetched');
			})
			}else{
				$http.post(Global.Server + `/eappservices/flowstepitem/confflow/selectbyexample?firstResult=` + firstResult + `&maxResults=` + maxResults ,{
					'flowName' : state.search
				})
				.success(function(data){
				debug(`Found ${data.length} flows.`)
				state.flows = data || [];
				ctx.emit('flows.fetched');
			})
			}
		},

		queryFlowsCount: function(a,b) {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confitem/count`,{
				'flowName' : state.search
			}).success(function(data){
				debug(`Found ${data} flows.`)
				state.flowsLength = data || [];
				ctx.emit('flows.length.fetched');
			})
		},

		querySteps: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confstep/selectbyexample`,{
				'flowId' : state.filterStep
			}).success(function(data){
				debug(`Found ${data.length} steps.`);
				state.steps = data || [];
				ctx.emit('flows.steps.fetched');
			})
		},

		queryFields: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/fieldandform/fieldConfigSelect?itemId=` + state.selectedRow[4] + `&flowId=` + state.selectedRow[1] ,{}).success(function(data){
				debug(`Found ${data.length} fields.`);
				state.fields = data || [];
				ctx.emit('flows.fields.fetched');
			})
		},

		/*queryFields: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/fieldandform/confflowfield/selectbyexample`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(data){
				debug(`Found ${data.length} fields.`);
				state.fields = data || [];
				ctx.emit('flows.fields.fetched');
			})
		},*/

		queryMasterFields: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/fieldandform/conffield/selectbyexample`,{}).success(function(data){
				debug(`Found ${data.length} master fields`);
				state.masterFields = data || [];
				ctx.emit('flows.master.fields.fetched');
			})
		},

		queryVariables: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/varsandrules/confstepvars/selectbyexample`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(data){
				debug(`Found ${data.length} variables`);
				state.variables = data || [];
				ctx.emit('flows.variables.fetched');
			})
		},

		queryTaItemFlow: function() {
			var ctx = this;
			$http.post(Global.Server + `/np5services/items/np5itemflowta/selectbyexample`,{
				'flowId': state.selectedRow[1],
				'itemId': state.selectedRow[4]
			}).success(function(data){
				debug(`Found ${data.length} Therapeutical Areas`);
				state.taItemFlow = data || [];
				ctx.emit('flows.taItemFlow.fetched');
			})
		},

		queryItems: function() {
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confitem/selectbyexample`,{}).success(function(data){
				debug(`Found ${data.length} items.`);
				state.items = data || [];
				ctx.emit('flows.items.fetched');
			})
		},

		setFlow: function(f){
			state.filterStep = f;
			debug("filterStep was updated");
			this.emit('flows.filterStep.updated');
		},

		addFlowPopup: function(){
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confflow/insert`,{
				'flowId' : state.flowId,
				'itemId' : state.itemId,
				'flowName' : state.flowName,
				'flowDescription' : state.flowDescription,
				'firstStepId' : state.firstStep[1],
				'deleted' : 0
			}).success(function(){
				debug(`Inserted flow`);
				ctx.emit('flows.flow.inserted');
			}).error(function(){
				debug(`Error inserting flows`);
				ctx.emit('flows.flow.inserted.error');
			})
		},

		updateFlowPopup: function(data){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confflow/update`,{
				'flowId' : data.flow[1],
				'flowName' : data.flow[2],
				'itemId' : data.flow[4],
				'firstStepId' : data.firstStep
			}).success(function(){
				debug(`Updated Flow`);
				ctx.emit('flows.flow.updated');
			}).error(function(){
				debug(`Error updating flow`);
				ctx.emit('flows.flow.updated.error');
			})
		},

		addStepPopup: function(step){
			var ctx = this;
			$http.post(Global.Server + `/eappservices/flowstepitem/confstep/insert`,{
				'stepId' : step[1],
				'flowId' : state.flowId,
				'itemId' : state.itemId,
				'stepDescription' : step[2],
				'stepType' : step[3],
				'stepSubtype' : "None",
				'stepDeadline' : step[5],
				'stepReminder' : step[4],
				'defaultNextStepId' : step[6],
				'rejectedNextStepId' : step[8],
				'organizationalUnit' : "",
				'deleted' : 0
			}).success(function(){
				debug(`Inserted Step`);
				ctx.emit('flows.step.inserted');
			}).error(function(){
				debug(`Error inserting steps`);
				ctx.emit('flows.step.inserted.error');
			})
		},

		updateStepPopup: function(data){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confstep/update`,{
				'flowId' : data.flow[1],
				'itemId' : data.flow[4],
				'stepId' : data.step[1],
				'stepDescription' : data.step[2],
				'stepType' : data.step[4],
				'stepReminder' : data.step[5],
				'stepDeadline' : data.step[6],
				'defaultNextStepId' : data.step[7],
				'rejectedNextStepId' : data.step[8]
			}).success(function(){
				debug(`Updated Step`);
				ctx.emit('flows.step.updated');
			}).error(function(){
				debug(`Error updating step`);
				ctx.emit('flows.step.updated.error');
			})
		},

		deleteStepPopup: function(data){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confstep/delete`,{
				'flowId' : data.flow[1],
				'itemId' : data.flow[4],
				'stepId' : data.step[1]
			}).success(function(){
				debug(`Updated Deleted Step`);
				ctx.emit('flows.step.deleted');
			}).error(function(){
				debug(`Error updating Deleted step`);
				ctx.emit('flows.step.deleted.error');
			})
		},

		updateItemPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confitem/update`,{
				'itemId' : state.itemId,
				'itemDescription' : state.itemDescription,
				'itemName' : state.itemName
			}).success(function(){
				debug(`Updated flows`);
				ctx.emit('flows.item.updated');
			})
		},

		deleteFlowPopup: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confflow/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted flows`);
				ctx.emit('flows.item.deleted');
			})
		},

		deleteSteps: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/flowstepitem/confstep/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted Steps`);
				ctx.emit('flows.steps.deleted');
			});
		},

		deleteFlowField: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/fieldandform/confflowfield/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted Flow Fields`);
				ctx.emit('flows.flowfields.deleted');
			});
		},

		deleteSpecificFlowField: function(flowfield){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/fieldandform/confflowfield/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4],
				'fieldId' : flowfield[1]
			}).success(function(){
				debug(`Deleted Flow Field`);
				ctx.emit('flows.specific.flowfields.deleted');
			});
		},

		deleteStepForm: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/fieldandform/confstepform/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted Step Form`);
				ctx.emit('flows.stepform.deleted');
			});
		},

		deleteStepRule: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/varsandrules/confsteprule/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted Step Rule`);
				ctx.emit('flows.steprule.deleted');
			});
		},

		deleteStepVars: function(){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/varsandrules/confstepvars/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted Step Vars`);
				ctx.emit('flows.stepvars.deleted');
			});
		},

		deleteSpecificStepVars: function(variable){
			var ctx = this;
			$http.put(Global.Server + `/eappservices/varsandrules/confstepvars/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4],
				'stepId' : variable[1],
				'varName' : variable[3]
			}).success(function(){
				debug(`Deleted Step Var`);
				ctx.emit('flows.specific.stepvars.deleted');
			});
		},

		deleteItemFlowTa: function(){
			var ctx = this;
			$http.put(Global.Server + `/np5services/items/np5itemflowta/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4]
			}).success(function(){
				debug(`Deleted Item Flow Ta`);
				ctx.emit('flows.itemflowta.deleted');
			});
		},

		deleteSpecificItemFlowTa: function(ta){
			var ctx = this;
			debugger;
			$http.put(Global.Server + `/np5services/items/np5itemflowta/delete`,{
				'flowId' : state.selectedRow[1],
				'itemId' : state.selectedRow[4],
				'taId' : ta[1]
			}).success(function(){
				debug(`Deleted Specific Item Flow Ta`);
				ctx.emit('flows.specific.itemflowta.deleted');
			});
		},

		setSelectedRow: function(r) {
			state.selectedRow = r;
			debug("selectedRow was updated");
			this.emit('flows.selectedRow.updated');
		},

		setPage: function(p) {
			state.page = p;
			debug("page was updated");
			this.emit('flows.page.updated');
		},

		setSearch: function(s) {
			state.search = s;
			debug("search was updated");
			this.emit('flows.search.updated');
		},

		setItemId: function(i) {
			state.itemId = i;
			debug("itemId was updated");
			if(i!=null){
				this.emit('flows.itemId.updated');
			}
		},

		setItemDescription: function(i) {
			state.itemDescription = i;
			debug("itemDescription was updated");
			this.emit('flows.itemDescription.updated');
		},

		setItemName: function(i) {
			state.itemName = i;
			debug("itemName was updated");
			this.emit('flows.itemName.updated');
		},

		setFlowId: function(i) {
			state.flowId = i;
			debug("flowid was updated");
			this.emit('flows.flowId.updated');
		},

		setFlowName: function(i) {
			state.flowName = i;
			debug("flowName was updated");
			this.emit('flows.flowName.updated');
		},

		setFlowDescription: function(i) {
			state.flowDescription = i;
			debug("flowDescription was updated");
			this.emit('flows.flowDescription.updated');
		},

		setFirstStep: function(i) {
			state.firstStep = i;
			debug("firstStep was updated");
			this.emit('flows.firstStep.updated');
		},

		savePartialSteps: function(i) {
			state.partialSteps = i;
			debug("partialSteps was updated");
			this.emit('flows.partialSteps.updated');
		},

		// Public API
		exports: {
			getFlows: function() {
				return state.flows;
			},
			getFlowsCount: function() {
				return state.flowsLength;
			},
			getTotalRows: function() {
				return DEFAULT_OPTIONS.rows;
			},
			getMaxPages: function() {
				return DEFAULT_OPTIONS.maximumPages;
			},
			getItemId: function(){
				return state.itemId;
			},
			getItemDescription: function(){
				return state.itemDescription;
			},
			getItemName: function(){
				return state.itemName;
			},
			getPage: function(){
				return state.page;
			},
			getSelectedRow: function(){
				return state.selectedRow;
			},
			getSteps: function(){
				return state.steps;
			},
			getFields: function(){
				return state.fields;
			},
			getMasterFields: function(){
				return state.masterFields;
			},
			getVariables: function(){
				return state.variables;
			},
			getTaItemFlow: function(){
				return state.taItemFlow;
			},
			getItems: function(){
				return state.items;
			},
			getPartialSteps: function(){
				return state.partialSteps;
			},
			getFirstStep: function(){
				return state.firstStep;
			}
		}
	};
}
Register(FlowsStore);
Register(Flows);