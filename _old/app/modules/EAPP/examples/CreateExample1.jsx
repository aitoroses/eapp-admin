import state from 'EAPP/Stores/app-state';
import {store as FlowsStore, actions as FlowsActions} from 'EAPP/Stores/flows-tessel';

//For Testing purposes
window.FlowsStore = FlowsStore;
window.FlowsActions = FlowsActions;

import TableComponent from './TableComponent';
import Divider from 'react/components/divider';
import Scrollable from 'EAPP/Utils/Common/Scrollable';
import Combo from 'EAPP/Utils/Common/Combo';
import TitleComponent from 'EAPP/Utils/Common/Title';

class StepsTableComponent extends React.Component {

	static propTypes = {
		flows: React.PropTypes.object.isRequired,
		add: React.PropTypes.func,
		save: React.PropTypes.func,
		delete: React.PropTypes.func
	}

	componentDidMount(){
		FlowsActions.queryItems();
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.flows !== this.props.flows
	}

	changeFSId(value){
		FlowsActions.setFirstId(value);
	}

	render(){
		var items = this.props.flows.steps || [];
		var columns = FlowsStore.getStepsColumns("StepTable2");
		var atomic = FlowsStore.getStepsAtomic("StepTable2");
		var types = FlowsStore.getTypeOfColumn("StepTable2");
		var styles = {display:'inline-block'}
		return (
			<div style={styles}>
				<button className="button blue-color" onClick={this.props.add}><span className="glyphicon glyphicon-plus-sign">Add Flow</span></button>
				<TableComponent width="1000" save={this.props.save} delete={this.props.delete} fCheck={this.changeFSId} edit={this.props.flows.row} types={types} flex={1} atomic={atomic} columns={columns} data={items} store={FlowsStore.getData().StepTable2} actions={true}/>
			</div>
			)
	}

}

class FieldsForFlow extends React.Component {

	static propTypes = {
		flows: React.PropTypes.object.isRequired
	}

	componentDidMount(){
		console.log("FieldsForFlow mounted");
	}

	shouldComponentUpdate(nextProps) {
		//debugger;
		if(Object.keys(nextProps.flows).length!=0){
			if(nextProps.flows.getData.FlowFieldsTable[1].category.value){
				nextProps.flows.flowFields[nextProps.flows.flowFields.length-1].set({category:nextProps.flows.getData.FlowFieldsTable[1].category.value});
				nextProps.flows.getData.FlowFieldsTable[1].category.set({value:null});
				/*if(nextProps.flows.flowFields[nextProps.flows.flowFields.length-2]){
					nextProps.flows.getData.FlowFieldsTable[1].category.set({value:nextProps.flows.flowFields[nextProps.flows.flowFields.length-2].category});
				}*/
			}
		}
		return nextProps.flows !== this.props.flows
	}

	toggleFieldRight(){
		console.log("right");
		if(FlowsStore.state.combo1!=undefined){
			var elem = FlowsStore.state.masterFields.filter(function(el, index){
				if(el.fieldId==FlowsStore.state.combo1){
					FlowsStore.state.masterFields.splice(index,1);
					return el;
				}
			})
			FlowsStore.state.flowFields.push(elem[0]);
			FlowsActions.setCombo1(null);
			FlowsActions.setCombo2(null);
		}
	}

	toggleFieldLeft(){
		console.log("left");
		if(FlowsStore.state.combo2!=undefined){
			var elem = FlowsStore.state.flowFields.filter(function(el, index){
				if(el.fieldId==FlowsStore.state.combo2){
					FlowsStore.state.flowFields.splice(index,1);
					return el;
				}
			})
			FlowsStore.state.masterFields.push(elem[0]);
			FlowsActions.setCombo1(null);
			FlowsActions.setCombo2(null);
		}
	}

	handleRowClick(event, index, item){
		FlowsActions.setCombo2(item.fieldId);
    }

	render(){
		//debugger;
		var columns = FlowsStore.getStepsColumns("FlowFieldsTable");
		var atomic = FlowsStore.getStepsAtomic("FlowFieldsTable");
		var types = FlowsStore.getTypeOfColumn("FlowFieldsTable");
		if(FlowsStore.state.flowFields.length!=0){
			var fieldsCombos = FlowsStore.state.flowFields.map(function(field){
				return <Combo multiple={false} width="100" saveData="name" display="name" keyData="categorySelected" comboData={(FlowsStore.state.categoryForFields) ? FlowsStore.state.categoryForFields : []} />
			});
		}
		return (
			<div>
				<Combo multiple={true} width="425" saveData="fieldId" display="fieldDisplayName" keyData="combo1" comboData={(this.props.flows) ? this.props.flows.masterFields : []} changeHandler={this.props.flows} />
				<button className="button blue-color" onClick={this.toggleFieldLeft}><span className="glyphicon glyphicon-chevron-left"></span></button>
				<button className="button blue-color" onClick={this.toggleFieldRight}><span className="glyphicon glyphicon-chevron-right"></span></button>
				{/*<div className="fieldsForFlow">
					<Combo multiple={true} width="300" saveData="fieldId" display="fieldDisplayName" keyData="combo2" comboData={(this.props.flows) ? this.props.flows.flowFields : []} changeHandler={this.props.flows} />
					<div className="vertical-align">{fieldsCombos}</div>
				</div>*/}
				<div className="fieldsForFlow">
					{this.props.flows ? this.props.flows.combo1 : ""}
					{this.props.flows ? this.props.flows.combo2 : ""}
					<TableComponent rowClickFunction={this.handleRowClick} rowHeight={25} maxHeight={112} headerHeight={30} width="300" types={types} flex={0} atomic={atomic} columns={columns} data={(this.props.flows) ? this.props.flows.flowFields : []} store={FlowsStore.getData().FlowFieldsTable} actions={false}/>
				</div>
			</div>
		)
	}

}

class TasForFlows extends React.Component {

	static propTypes = {
		flows: React.PropTypes.object.isRequired
	}

	componentDidMount(){
		console.log("TasForFlows mounted");
	}

	shouldComponentUpdate(nextProps) {
		return nextProps.flows !== this.props.flows
	}

	toggleTaRight(){
		console.log("right");
		if(FlowsStore.state.combo3!=undefined){
			var elem = FlowsStore.state.tas.filter(function(el, index){
				if(el.taId==FlowsStore.state.combo3){
					FlowsStore.state.tas.splice(index,1);
					return el;
				}
			})
			FlowsStore.state.flowTas.push(elem[0]);
			FlowsActions.setCombo3(null);
			FlowsActions.setCombo4(null);
		}
	}

	toggleTaLeft(){
		console.log("left");
		if(FlowsStore.state.combo4!=undefined){
			var elem = FlowsStore.state.flowTas.filter(function(el, index){
				if(el.taId==FlowsStore.state.combo4){
					FlowsStore.state.flowTas.splice(index,1);
					return el;
				}
			})
			FlowsStore.state.tas.push(elem[0]);
			FlowsActions.setCombo3(null);
			FlowsActions.setCombo4(null);
		}
	}

	render(){
		return (
			<div>
				<Combo multiple={true} width="200" saveData="taId" display="taName" keyData="combo3" comboData={(this.props.flows) ? this.props.flows.tas : []} changeHandler={this.props.flows} />
				<button className="button blue-color" onClick={this.toggleTaLeft}><span className="glyphicon glyphicon-chevron-left"></span></button>
				<button className="button blue-color" onClick={this.toggleTaRight}><span className="glyphicon glyphicon-chevron-right"></span></button>
				<Combo multiple={true} width="200" saveData="taId" display="taName" keyData="combo4" comboData={(this.props.flows) ? this.props.flows.flowTas : []} changeHandler={this.props.flows} />
				{this.props.flows ? this.props.flows.combo3 : ""}
				{this.props.flows ? this.props.flows.combo4 : ""}
			</div>
		)
	}

}

class AppStateWrapper extends state.Component {

	/*componentDidMount() {
      super.componentDidMount();
	}*/

	handleFlowIdChange(data){
		FlowsActions.setFlowId(data);
	}

	handleFlowNameChange(data){
		FlowsActions.setFlowName(data);
	}

	handleFlowDescriptionChange(data){
		FlowsActions.setFlowDescription(data);
	}

	handleChangeonCombo(data){
		FlowsActions.setCombo(data);
	}

	handleAddStep(){
		//console.log("insertando");
		var a = FlowsStore.getSteps();
		var num = a.length;
		a.push({});
		FlowsActions.setEditStepRow(num);
	}

	handleSaveStep(value){
		var err=0;
		FlowsStore.getData().StepTable2.map(function(a){
			if(a[Object.keys(a)[0]].error || (a[Object.keys(a)[0]].value==null && a[Object.keys(a)[0]].required)){
				err++
			}
		})
		if(err==0){
			console.log("insertando");
			/*var step = FlowsStore.getData().StepTable2.map(function(a){
				var obj = {};
				obj[Object.keys(a)[0]]=a;
				return obj[Object.keys(obj)[0]];
			})*/
			var step = FlowsStore.getData().StepTable2.map(function(b){
				var obj = {};
				var a = b[Object.keys(b)[0]];
				obj[a.atomicData]=a.value;
				return obj;
			})
			if(step[6].firstStepId){
				FlowsStore.getSteps().map(function(step, index){if(FlowsStore.getSteps().length>1 && index!=FlowsStore.getSteps().length-1) step[6].set({firstStepId:false});})
				FlowsActions.setFirstId(step[0].stepId);
			}
			FlowsActions.insertStep(step);
			FlowsActions.setEditStepRow(value);
		}else{
			console.log("Errores de validacion: "+err);
		}
	}

	handleDeleteStep(row){
		//console.log("deleteando: "+row);
		var a = FlowsStore.getSteps();
		a.splice(row,1);
		FlowsActions.setEditStepRow(-1);

	}

	filterItems(filter){
		var x = [];
		var data = FlowsStore.state.items;
		for (var i = 0; i < data.length; i++) {
			if(data[i].itemDescription.indexOf(filter)!=-1){
				x.push(data[i]);
			}
		};
		FlowsActions.setFilteredData(x);
		return true;
	}

	render(){
		var inlineStyle = {display: '-webkit-box'};
		var marginTopStyle = {'margin-top': '7px'};
		var centerStyle = {width: '1000px', margin: '0 auto'};
		var centerStyle2 = {width: '551px', margin: '0 auto'};
		return (<div>
				<TitleComponent title="Flows Configuration"></TitleComponent>
				<div className="header-buttons-admin"><div className="navigator"></div></div>
				<div className="row-fluid panel panel-default ng-scope margin-for-table">
                    <div width="100%">
                      <h1 className="black-color"><span className="glyphicon glyphicon-tasks marginRight white-color icon-radius"></span>Create Flow</h1>
                    </div>
                    <div className="margin-for-table inside">
                    	<div className="col-md-4"><Scrollable type="input" text="Flow Id" f={(this.state.flows) ? this.state.flows.flowId.validation : ""} err={(this.state.flows) ? this.state.flows.flowId.error : false} storage={(this.state.flows) ? this.state.flows.flowId : ""}/></div>
	                    <div className="col-md-4"><Scrollable type="input" text="Flow Name" f={(this.state.flows) ? this.state.flows.flowName.validation : ""} err={(this.state.flows) ? this.state.flows.flowName.error : false} storage={(this.state.flows) ? this.state.flows.flowName : ""}/></div>
	                    <div className="col-md-4"><Scrollable type="input" text="Flow Description" f={(this.state.flows) ? this.state.flows.flowDescription.validation : ""} err={(this.state.flows) ? this.state.flows.flowDescription.error : false} storage={(this.state.flows) ? this.state.flows.flowDescription : ""}/></div>
	                    <div style={inlineStyle} className="col-md-6">
	                    	<div style={marginTopStyle}><Scrollable g={this.filterItems} placeholder="Filter Items" type="input" f={(this.state.flows) ? this.state.flows.filter.validation : ""} err={(this.state.flows) ? this.state.flows.filter.error : false} storage={(this.state.flows) ? this.state.flows.filter : ""}/></div>
	                    	<Combo multiple={false} saveData="itemId" display="itemDescription" comboText="Item" keyData="combo" comboData={(this.state.flows) ? this.state.flows.filteredItems : []} changeHandler={this.state.flows}/>
	                    </div>
	                    <div className="col-md-6">
	                    	<div style={marginTopStyle}><Scrollable type="text" text="* First Step" data={this.state.flows ? this.state.flows.fsid : [] || []} /></div>
	                    </div>
	                    
	                    <StepsTableComponent delete={this.handleDeleteStep} add={this.handleAddStep} save={this.handleSaveStep} flows={this.state.flows || {} } />
	                    {this.state.flows ? this.state.flows.combo : ""}

						<div style={centerStyle}>
							<div><button className="button blue-color" onClick={FlowsActions.queryMasterFields}><span>Load Fields Data</span></button></div>
							<FieldsForFlow flows={this.state.flows || {}}/>
						</div>

						<div style={centerStyle2}>
							<div><button className="button blue-color" onClick={FlowsActions.queryTas}><span>Load Therapeutical Area Data</span></button></div>
							<TasForFlows flows={this.state.flows || {}}/>
						</div>
                    </div>
                </div>
				</div>)
	}
}

export default AppStateWrapper;
