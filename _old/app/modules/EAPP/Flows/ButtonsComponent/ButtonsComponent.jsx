var react = require('angular/react');
var classnames = require('classnames');
var Panel = require('react-bootstrap/lib/Panel');

var ButtonFactory = function ButtonComponent(injector, util) {

	var ModalComponent = require('../../Utils/PopupComponent/modal');

	var ComboComponent = require('../../Utils/ComboComponent/ComboComponent')(injector,util);

	var CheckBoxComponent = require('../../Utils/CheckBoxComponent/CheckBoxComponent')(injector,util);

	var FlowsMixin = require('../../Stores/FlowsMixin');

	var Table = FixedDataTable.Table;
  	var Column = FixedDataTable.Column;

	var ButtonComponent = React.createClass({
		
		mixins: [FlowsMixin],

		/**
	     * Get the initial state for the component
	     */
	    getInitialState(){
	      return {
	        search: "",
	        display: false,
	        display2: false,
	        display3: false,
	        display4: false,
	        isnum: true,
	        isStrMax: true,
	        isStrMax2: true,
	        isnumToInsert: true,
	        isStrMaxToInsert: true,
	        isStrMax2ToInsert: true,
	        countryId: null,
	        countryCode: null,
	        countryName: null,
	        updateButtonsState: false,
	        saveButtonState: false,
	        viewFlows: false,
	        viewSteps: false,
	        viewFields: false,
	        viewTas: false,
	        viewVars: false,
	        flowId: null,
	        stepId: null,
	        stepDescription: null,
	        isFlowIdToInsert: true,
	        isStepIdToInsert: null,
	        isReminderToInsert: null,
	        isDeadlineToInsert: null,
	        isStepDescriptionToInsert: null,
	        isDefaultNextStepIdToInsert: null,
	        isRejectedNextStepIdToInsert: null,
	        flowName: null,
	        isFlowNameToInsert: true,
	        itemIdToInsert: null,
	        reminderToInsert: null,
	        deadlineToInsert: null,
	        defaultNextStepId: null,
	        rejectedNextStepId: null,
	        stepTypeToInsert: null,
	        isFlowDescriptionToInsert: null,
	        steps: [],
	        datosComboStepType: [{name:'APP'},{name:'REV'}],
	        firstStep: false,
	        identifier: 0,
	        firstStepRow: null
	      }
	    },

		/**
		 * On mount
		 */
		componentDidMount() {
			console.log("Button Component loaded successfully");
			this.flows().actions.queryItems();
		},

		onItemsFetch(){
			this.setState({
				items: this.flows().store.getItems()
			});
		},

		updateStateButtons(){
			console.log("Buttons Component updateStateButtons");
			if(this.flows().store.getSelectedRow()==null){
				this.setState({
					updateButtonsState: false
				});
			}else{
				this.setState({
					updateButtonsState: true
				});
			}
		},

		handleAddFlow() {
	      this.setState({
	      		viewFlows: true,
	      		viewSteps: false,
	      		viewFields: false,
	      		viewTas: false,
	      		viewVars: false,
	      		viewNothing: false,
				display: true,
				isFlowIdToInsert: null,
				isFlowNameToInsert: null,
				isFlowDescriptionToInsert: null
		  });
	    },

	    handleSaveFlow() {
	    	console.log("saving...");
	    	if(this.testing(this.state.steps)){
	    		console.log("Secuencia bien realizada");
	    		//Salvar datos en BD
	    		this.flows().actions.setFlowId(this.refs.flowIdToInsert.getDOMNode().value);
		    	this.flows().actions.setFlowName(this.refs.flowNameToInsert.getDOMNode().value);
		    	this.flows().actions.setFlowDescription(this.refs.flowDescriptionToInsert.getDOMNode().value);
		    	this.flows().actions.setItemId(this.state.itemIdToInsert);
		    	this.flows().actions.setFirstStep(this.state.firstStepRow);
		    	this.flows().actions.addFlowPopup();

		    	this.setState({
		    		display: false
		    	});
	    	}else{
	    		console.log("Secuencia mal realizada");
	    		// Mostrar popup de error
	    		return;
	    	}
	    },

	    onFlowInserted(){
	    	//Adding Steps
	    	for (var i = 0; i < this.state.steps.length; i++) {
	    		console.log(this.state.steps[i]);
	    		this.flows().actions.addStepPopup(this.state.steps[i]);
	    	};
	    },

	    onErrorWhileInserting(){
	    	console.log("Error While Inserting");
	    	this.setState({
	    		display4: true
	    	})
	    },

		testing(data){
			var aux = this.state.firstStepRow;
			var num = 0;
			var exit=true;
			var flag;

			while(exit){
				flag=false;
				for (var i = 0; i < data.length; i++) {
					if(data[i][0]!=aux[0]){
						if((aux[6]==data[i][1] && flag==false)||(aux[6]==-1 && flag==false)){
							flag=true;
							num++;
							if(aux[6]!=-1){
								aux=data[i];
							}else{
								exit=false;
							}
						}
					}
				};
				if(flag==false) return false;
			}
			if(aux[6]==-1 && num==data.length){
				return true;
			}else{
				return false;
			}
		},    

	    handleEditCountry() {
	      console.log("2");
	      this.setState({
	      	display3: true
	      });
	      this.updateRefs();
	    },

	    handleUpdateFlow(){
	    	console.log("updating...");
	    	this.flows().actions.setCountryId(this.refs.countryId.getDOMNode().value);
	    	this.flows().actions.setCountryCode(this.refs.countryCode.getDOMNode().value);
	    	this.flows().actions.setCountryName(this.refs.countryName.getDOMNode().value);
	    	this.flows().actions.updateCountryPopup();
	    	this.setState({
	    		display3: false
	    	});
	    	this.updateRefs();
	    },

	    handleDeleteFlow() {
	      console.log("3");
	      this.setState({
			display2: true
		  });
	    },

	    handleDeleteFlow2() {
	      console.log("deleting...");
	      if(this.flows().store.getSelectedRow()){
	      	console.log("borrando");
	      	this.flows().actions.deleteSteps();
	      }else{
	      	console.log("Select a flow");
	      }
	      //this.flows().actions.deleteFlowPopup();
	      this.setState({
	      	display2: false
	      });
	    },

	    deleteFlowField(){
	    	this.flows().actions.deleteFlowField();
	    },

	    deleteStepForm(){
	    	this.flows().actions.deleteStepForm();
	    },

	    deleteStepRule(){
	    	this.flows().actions.deleteStepRule();
	    },

	    deleteStepVars(){
	    	this.flows().actions.deleteStepVars();
	    },

	    deleteItemFlowTa(){
	    	this.flows().actions.deleteItemFlowTa();
	    },

	    deleteFlow(){
	    	this.flows().actions.deleteFlowPopup();
	    	this.setState({
				updateButtonsState: false
			});
	    },

	    handleChange(){
	    	var search = this.refs.search.getDOMNode().value;
	    	this.setState({
        		search: search
      		});
	    },

	    handleSearch(){
	    	console.log("button-->"+this.state.search);
	    	this.flows().actions.setPage(1);
	    	this.flows().actions.setSearch(this.state.search);
	    	this.updateData();
	    },

	    updateRefs(){
	    	this.refs.countryId.getDOMNode().value = this.flows().store.getCountryId();
	    	this.refs.countryCode.getDOMNode().value = this.flows().store.getCountryCode();
	    	this.refs.countryName.getDOMNode().value = this.flows().store.getCountryName();
	    },

	    deleteRefs(){
	    	this.refs.stepIdToInsert.getDOMNode().value = "";
	    	this.refs.stepDescriptionToInsert.getDOMNode().value = "";
	    	this.refs.stepTypeToInsert = null;
	    	this.refs.reminderToInsert.getDOMNode().value = "";
	    	this.refs.deadlineToInsert.getDOMNode().value = "";
	    	this.refs.defaultNextStepIdToInsert.getDOMNode().value = "";
	    	this.refs.rejectedNextStepIdToInsert.getDOMNode().value = "";
	    	this.refs.firstStep = false;
	    	this.setState({
	    		firstStep: false
	    	});
	    },

	    deleteDataOnStore(){
	    	this.flows().actions.setCountryId(null);
	    	this.flows().actions.setCountryCode(null);
	    	this.flows().actions.setCountryName(null);
	    },

	    updateData(){
	    	//this.deleteRefs();
	    	//this.deleteDataOnStore();
	    	this.setState({
	    		updateButtonsState: false
	    	});
	    	this.flows().actions.queryFlows();
	    	this.flows().actions.queryFlowsCount();
	    },

	    // Validaciones
	    handleCountryId(){
	    	//console.log(this.refs.countryId.getDOMNode().value);
	    	//var isnum = /^[0-9]{1,5}$|^$/.test(this.refs.countryId.getDOMNode().value);
	    	this.setState({
	    		isnum: /^[0-9]{1,5}$|^$/.test(this.refs.countryId.getDOMNode().value),
	    		isnumToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.countryIdToInsert.getDOMNode().value)
	    	})
	    	this.verifyAdding();
	    },

	    handleCountryCodeAndName(){
	    	this.setState({
	    		isStrMax : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.countryCode.getDOMNode().value),
	    		isStrMax2 : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.countryName.getDOMNode().value),
	    		isStrMaxToInsert : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.countryCodeToInsert.getDOMNode().value),
	    		isStrMax2ToInsert : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.countryNameToInsert.getDOMNode().value)
	    	})
	    	this.verifyAdding();
	    },

	    verifyAdding(){
	    	if(this.refs.countryIdToInsert.getDOMNode().value!="" && this.refs.countryCodeToInsert.getDOMNode().value!="" && this.refs.countryNameToInsert.getDOMNode().value!=""){
	    		if(/^[0-9]{1,5}$|^$/.test(this.refs.countryIdToInsert.getDOMNode().value) && /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.countryCodeToInsert.getDOMNode().value) && /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.countryNameToInsert.getDOMNode().value)){
	    			this.setState({
			    		saveButtonState: true
			    	});
	    		}else{
	    			this.setState({
			    		saveButtonState: false
			    	});
	    		}
	    	}
	    },

	    closeAddPopup(){
	    	this.setState({
	    		display: false
	    	});
	    },

	    closeEditPopup(){
	    	this.setState({
	    		display3: false
	    	});
	    },

	    closeDeletePopup(){
	    	this.setState({
	    		display2: false
	    	});
	    },

	    closeErrorPopup(){
	    	this.setState({
	    		display4: false
	    	});
	    },

	    viewFlows(){
	    	this.setState({
	    		viewFlows: true,
	    		viewSteps: false,
	    		viewFields: false,
	    		viewTas: false,
	    		viewVars: false,
	    		viewNothing: false
	    	});
	    },

	    viewSteps(){
	    	this.setState({
	    		viewFlows: true,
	    		viewSteps: true,
	    		viewFields: false,
	    		viewTas: false,
	    		viewVars: false,
	    		viewNothing: false
	    	});
	    },

	    viewFields(){
	    	this.setState({
	    		viewFlows: false,
	    		viewSteps: false,
	    		viewFields: true,
	    		viewTas: false,
	    		viewVars: false,
	    		viewNothing: false
	    	});
	    },

	    viewTas(){
	    	this.setState({
	    		viewFlows: false,
	    		viewSteps: false,
	    		viewFields: false,
	    		viewTas: true,
	    		viewVars: false,
	    		viewNothing: false
	    	});
	    },

	    viewVars(){
	    	this.setState({
	    		viewFlows: false,
	    		viewSteps: false,
	    		viewFields: false,
	    		viewTas: false,
	    		viewVars: true,
	    		viewNothing: false
	    	});
	    },

	    viewNothing(){
	    	this.setState({
	    		viewFlows: false,
	    		viewSteps: false,
	    		viewFields: false,
	    		viewTas: false,
	    		viewVars: false,
	    		viewNothing: true
	    	});
	    },

	    handleCheckBoxes(){
	    	this.setState({
	    		firstStep: this.refs.firstStep.getDOMNode().checked
	    	});
	    },

	    handleFlowId(){
	    	if(this.refs.flowIdToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isFlowIdToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isFlowIdToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.flowIdToInsert.getDOMNode().value)
		    	});
	    	}
	    },

	    handleReminder(){
	    	if(this.refs.reminderToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isReminderToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isReminderToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.reminderToInsert.getDOMNode().value),
		    		reminder: this.refs.reminderToInsert.getDOMNode().value
		    	});
	    	}
	    },

	    handleDeadline(){
	    	if(this.refs.deadlineToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isDeadlineToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isDeadlineToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.deadlineToInsert.getDOMNode().value),
		    		deadline: this.refs.deadlineToInsert.getDOMNode().value
		    	});
	    	}
	    },

	    handleDefaultNextStepId(){
	    	if(this.refs.defaultNextStepIdToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isDefaultNextStepIdToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isDefaultNextStepIdToInsert: /^[-]?[0-9]{1,5}$|^$/.test(this.refs.defaultNextStepIdToInsert.getDOMNode().value),
		    		defaultNextStepId: this.refs.defaultNextStepIdToInsert.getDOMNode().value
		    	});
	    	}
	    },

	    handleRejectedNextStepId(){
	    	if(this.refs.rejectedNextStepIdToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isRejectedNextStepIdToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isRejectedNextStepIdToInsert: /^[-]?[0-9]{1,5}$|^$/.test(this.refs.rejectedNextStepIdToInsert.getDOMNode().value),
		    		rejectedNextStepId: this.refs.rejectedNextStepIdToInsert.getDOMNode().value
		    	});
	    	}
	    },

	    handleStepId(){
	    	if(this.refs.stepIdToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isStepIdToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isStepIdToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.stepIdToInsert.getDOMNode().value),
		    		stepId: this.refs.stepIdToInsert.getDOMNode().value
		    	});
	    	}
	    },

	    handleFlowName(){
	    	if(this.refs.flowNameToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isFlowNameToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isFlowNameToInsert: /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.flowNameToInsert.getDOMNode().value)
		    	});
	    	}
	    },

	    handleStepDescription(){
	    	if(this.refs.stepDescriptionToInsert.getDOMNode().value==""){
	    		this.setState({
		    		isStepDescriptionToInsert: false
		    	});
	    	}else{
	    		this.setState({
		    		isStepDescriptionToInsert: /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.stepDescriptionToInsert.getDOMNode().value),
		    		stepDescription: this.refs.stepDescriptionToInsert.getDOMNode().value
		    	});
	    	}
	    },

	    handleFlowDescription(){
	    	if(this.refs.flowDescriptionToInsert.getDOMNode().value!=""){
	    		this.setState({
		    		isFlowDescriptionToInsert: true
		    	});
	    	}
	    },

	    handleChangeOnComboItemToInsert(dato){
			console.log("CAMBIO EN COMBO ITEM TO INSERT: "+dato);
			this.setState({
				itemIdToInsert: dato
			});
		},

		handleChangeOnComboStepTypeToInsert(dato){
			console.log("CAMBIO EN COMBO STEP TYPE TO INSERT: "+dato);
			this.setState({
				stepTypeToInsert: dato
			});
		},

		filterItems(){
			var x = [];
			var itemsRecovered = this.flows().store.getItems();
			for (var i = 0; i < itemsRecovered.length; i++) {
				if(itemsRecovered[i].itemDescription.indexOf(this.refs.filterdataItem.getDOMNode().value)!=-1){
					x.push(itemsRecovered[i]);
				}
			};
			this.setState({
				items: x
			});
		},

		a(){
			console.log("test breadcrumbs");
		},

		addSteps(){
			this.deleteRefs();
			var steps = this.state.steps;
			(this.state.reminder==undefined) ? this.state.reminder=72 : "";
			(this.state.deadline==undefined) ? this.state.deadline=24 : "";
			(this.state.defaultNextStepId==undefined) ? this.state.defaultNextStepId=-1 : "";
			(this.state.rejectedNextStepId==undefined) ? this.state.rejectedNextStepId=-1 : "";
			var row = [this.state.identifier, this.state.stepId, this.state.stepDescription, this.state.stepTypeToInsert, this.state.reminder, this.state.deadline, this.state.defaultNextStepId, this.state.firstStep, this.state.rejectedNextStepId];
			steps.push(row);
			this.setState({
				steps: steps,
				identifier: this.state.identifier+1,
				stepId: null,
				stepDescription: null,
				stepTypeToInsert: null,
				reminder: null,
				deadline: null,
				defaultNextStepId: null,
				rejectedNextStepId: null
			});
			if(this.state.firstStep){
				this.setState({
					firstStepRow: row
				});
			}
		},

		getRenderer(value, column, colData, row){
	      return React.addons.createFragment({
	        cellData: <CheckBoxComponent selected={value}/>
	      })
	    },

	    handleRowClick(event, index, step){
	      console.log("Row seleccionada {" + step + "}");
	      var steps = this.state.steps;
	      steps.splice(step[0],1);
	      this.setState({
	      	steps: steps
	      });
	      /*this.flows().actions.setSelectedRow(flow);
	      this.setState({
	        selectedRow: flow
	      });
	      this.flows().actions.setFlow(flow[1]);
	      this.flows().actions.querySteps();*/
	    },

		/**
		 * Rendering method
		 */
		 render() {
		 	//Add Popup
		 	var header = <div>Add Flow Dialog</div>
		    var body = <div className="container-table">
		    				<div>
		    				{this.state.viewFlows ? <a onClick={this.viewFlows}>Flows</a> : ""}
		    				{this.state.viewSteps ? <span>&nbsp;&gt;&nbsp;<a onClick={this.viewSteps}>Steps</a></span> : ""}
		    				{this.state.viewFields ? <span><a onClick={this.viewFlows}>Flows</a>&nbsp;&gt;&nbsp;<a onClick={this.viewSteps}>Steps</a>&nbsp;&gt;&nbsp;<a onClick={this.viewFields}>Fields</a></span> : ""}
		    				{this.state.viewTas ? <span><a onClick={this.viewFlows}>Flows</a>&nbsp;&gt;&nbsp;<a onClick={this.viewSteps}>Steps</a>&nbsp;&gt;&nbsp;<a onClick={this.viewFields}>Fields</a>&nbsp;&gt;&nbsp;<a onClick={this.viewTas}>Therapeutical Areas</a></span> : ""}
		    				{this.state.viewVars ? <span><a onClick={this.viewFlows}>Flows</a>&nbsp;&gt;&nbsp;<a onClick={this.viewSteps}>Steps</a>&nbsp;&gt;&nbsp;<a onClick={this.viewFields}>Fields</a>&nbsp;&gt;&nbsp;<a onClick={this.viewTas}>Therapeutical Areas</a>&nbsp;&gt;&nbsp;<a onClick={this.viewVars}>Variables</a></span> : ""}
		    				{this.state.viewFlows ? <Panel header='Flow'>
		    					<div className="one">
		    						<span>*Flow id</span><input className={(this.state.isFlowIdToInsert) ? 'smallBox' : 'smallBox error'} value={this.state.flowId} ref="flowIdToInsert" onChange={this.handleFlowId} required/>
		    						<span>*Flow Name</span><input className={(this.state.isFlowNameToInsert) ? '' : 'error'} value={this.state.flowName} ref="flowNameToInsert" onChange={this.handleFlowName} required/>
		    						<span>Flow Description</span><input value={this.state.flowDescription} ref="flowDescriptionToInsert" onChange={this.handleFlowDescription}/>
		    					</div>
		    					<div className="two">
		    						<span>Search by Item</span><input className="smallBox" value={this.state.itemFilterData} ref="filterdataItem" name="filterdataItem" onChange={this.filterItems}/><ComboComponent saveData="itemId" display="itemDescription" comboText="*Item" comboData={this.state.items} changeHandler={this.handleChangeOnComboItemToInsert}/><span>*First Step: fStp.stpDesc</span>
		    					</div>
							    {this.state.viewSteps ? <Panel header='Steps'>
							    	<div className="one">
							    		<span>*Step id</span><input className={(this.state.isStepIdToInsert) ? 'smallBox' : 'smallBox error'} ref="stepIdToInsert" onChange={this.handleStepId} required/>
		    							<span>*Step Description</span><input className={(this.state.isStepDescriptionToInsert) ? '' : 'error'} ref="stepDescriptionToInsert" onChange={this.handleStepDescription} required/>
							    	</div>
							    	<div className="two">
		    							<ComboComponent saveData="name" display="name" comboText="*Step Type" comboData={this.state.datosComboStepType} changeHandler={this.handleChangeOnComboStepTypeToInsert}/>
		    							<input ref="firstStep" checked={this.state.firstStep} onChange={this.handleCheckBoxes} name="inputdesc" type="checkbox" required />
		    						</div>
		    						<div className="one">
							    		<span>Reminder</span><input className={(this.state.isReminderToInsert) ? 'smallBox' : 'smallBox error'} ref="reminderToInsert" onChange={this.handleReminder}/>
		    							<span>Deadline</span><input className={(this.state.isDeadlineToInsert) ? '' : 'error'} ref="deadlineToInsert" onChange={this.handleDeadline}/>
		    							<span>Default Next Step Id</span><input className={(this.state.isDefaultNextStepIdToInsert) ? 'smallBox' : 'smallBox error'} ref="defaultNextStepIdToInsert" onChange={this.handleDefaultNextStepId}/>
		    							<span>Rejected Next Step Id</span><input className={(this.state.isRejectedNextStepIdToInsert) ? '' : 'error'} ref="rejectedNextStepIdToInsert" onChange={this.handleRejectedNextStepId}/>
							    	</div>
							    	<div className="row">
							    		<button disabled={!(this.state.isStepIdToInsert && this.state.isStepDescriptionToInsert && this.state.stepTypeToInsert)} className={this.state.isStepIdToInsert && this.state.isStepDescriptionToInsert && this.state.stepTypeToInsert ? "popup-button black-color" : "popup-button gray-color"} onClick={this.addSteps}>Add Step</button>
							    		<button disabled={this.state.steps.length==0} className={this.state.steps.length==0 ? "popup-button gray-color" : "popup-button black-color"} onClick={this.viewFields}>Delete Step</button>
							    	</div>
							    	<Table
						              maxHeight={440}
						              width={500}
						              rowsCount={this.state.steps.length}
						              rowHeight={50}
						              headerHeight={40}
						              onRowClick={this.handleRowClick}
						              rowGetter={function(rowIndex) {return this.state.steps[rowIndex]; }.bind(this)}>
						                <Column isResizable={false} dataKey={1} width={50} label="Step Id"/>
						                <Column isResizable={false} dataKey={2} width={50} flexGrow={1} label="Step Description"/>
						                <Column isResizable={false} dataKey={3} width={50} label="Step Type"/>
						                <Column isResizable={false} dataKey={4} width={50} label="Reminder"/>
						                <Column isResizable={false} dataKey={5} width={50} label="Deadline"/>
						                <Column isResizable={false} dataKey={6} width={50} label="Next Step Id"/>
						                <Column isResizable={false} cellRenderer={this.getRenderer} dataKey={7} width={50} label="First Step"/>
						                <Column isResizable={false} dataKey={8} width={50} label="Rejected Next Step Id"/>
						            </Table>
								  </Panel> : <div className="row"><button disabled={!(this.state.isFlowIdToInsert && this.state.isFlowNameToInsert && this.state.isFlowDescriptionToInsert)} className={this.state.isFlowIdToInsert && this.state.isFlowNameToInsert && this.state.isFlowDescriptionToInsert ? "popup-button black-color" : "popup-button gray-color"} onClick={this.viewSteps}>Add Steps</button></div>}
							  </Panel> : ""}
							 {this.state.viewFields ? <Panel header='Fields'>
							    <div className="row"><button className="popup-button black-color" onClick={this.viewTas}>B</button></div>
							  </Panel> : ""}
							 {this.state.viewTas ? <Panel header='Therapeutical Areas'>
							    <div className="row"><button className="popup-button black-color" onClick={this.viewVars}>B</button></div>
							  </Panel> : ""}
							 {this.state.viewVars ? <Panel header='Variables'>
							    <div className="row"><button className="popup-button black-color" onClick={this.viewNothing}>B</button></div>
							    <div className="row">{this.state.viewSteps ?  "bbb" : ""}</div>
							  </Panel> : ""}
							</div>
		    			</div>
            
		    var footer = <div><button disabled={this.state.steps.length>1 ? '' : 'disabled'} className={this.state.steps.length>1 ? 'popup-button black-color' : 'popup-button gray-color'} onClick={this.handleSaveFlow}>SAVE</button></div>

		    var modalProps = {
		      header: header,
		      body: body,
		      footer: footer
		    }

		    //Edit Popup
		 	var header3 = <div>Edit Flow Dialog</div>
		    var body3 = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Country Id : </div>
						        	<div className="column"><input className={(this.state.isnum) ? '' : 'error'} value={this.state.countryId} id="readonly" ref="countryId" onChange={this.handleCountryId} placeholder="Introduce a number" name="countryid" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Country Code : </div>
						        	<div className="column"><input className={(this.state.isStrMax) ? '' : 'error'} value={this.state.countryCode} ref="countryCode" onChange={this.handleCountryCodeAndName} placeholder="Introduce a code" name="inputname" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Country Name : </div>
						        	<div className="column"><input className={(this.state.isStrMax2) ? '' : 'error'} value={this.state.countryName} ref="countryName" onChange={this.handleCountryCodeAndName} placeholder="Introduce a name" name="inputdesc" type="text" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer3 = <div><button className="popup-button black-color" onClick={this.handleUpdateFlow}>SAVE</button></div>

		    var modalProps3 = {
		      header: header3,
		      body: body3,
		      footer: footer3
		    }

		    //Delete Popup
		    var header2 = <div>Delete Flow Dialog</div>
		    var body2 = <div>Are you sure?</div>
		    var footer2 = <div><button className="popup-button black-color" onClick={this.handleDeleteFlow2}>OK</button></div>

		    var modalProps2 = {
		      header: header2,
		      body: body2,
		      footer: footer2
		    }

			//Error Inserting Popup
		    var header4 = <div>Error Flow Dialog</div>
		    var body4 = <div>Error Inserting Flow: The flow id already exists in database</div>
		    var footer4 = <div></div>

		    var modalProps4 = {
		      header: header4,
		      body: body4,
		      footer: footer4
		    }

		 	return (
		 		<div className="header-buttons-admin">
			      <div className="navigator">
			        <button className="button blue-color" onClick={this.handleAddFlow}><span className="glyphicon glyphicon-plus-sign">Add Flow</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button red-color' : 'button gray-color'} onClick={this.handleDeleteFlow}>Delete Flow</button>
			        <div className="input-group search">
			        	<span>
			        		<button className="btn btn-default" onClick={this.handleSearch} type="button">SEARCH</button>
			        	</span>
		            </div>
		            <div className="search">
		            	<input type="text" ref="search" value={this.state.search} onChange={this.handleChange} className="form-control" placeholder="Search for..."/>
		            </div>
			      </div>
			      <ModalComponent {...modalProps} display={this.state.display} update={this.closeAddPopup}/>
			      <ModalComponent {...modalProps2} display={this.state.display2} update={this.closeDeletePopup}/>
			      <ModalComponent {...modalProps3} display={this.state.display3} update={this.closeEditPopup}/>
			      <ModalComponent {...modalProps4} display={this.state.display4} update={this.closeErrorPopup}/>
			    </div>
		 	)
		 }
	});

	return ButtonComponent;

}

module.exports = ButtonFactory;
