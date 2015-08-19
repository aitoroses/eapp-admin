var react = require('angular/react');
var classnames = require('classnames');

var ButtonFactory = function ButtonComponent(injector, util) {

	var ModalComponent = require('../../Utils/PopupComponent/modal');

	var ComboComponent = require('../../Utils/ComboComponent/ComboComponent')(injector,util);

	var TasMixin = require('../../Stores/TasMixin');

	var ButtonComponent = React.createClass({
		
		mixins: [TasMixin],

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
	        taId: null,
	        taName: null,
	        country: null,
	        division: null,
	        ou: null,
	        isBu: false,
	        isBf: false,
	        isBuInserted: false,
	        isBfInserted: false,
	        updateButtonsState: false,
	        ous: this.tas().store.getOus(),
	        saveButtonState: false,
	        organizationalUnitToInsert: null,
	        flag: false
	      }
	    },

		/**
		 * On mount
		 */
		componentDidMount() {
			console.log("Button Component loaded successfully");
		},

		updateStateButtons(){
			console.log("Buttons Component updateStateButtons");
			this.setState({
				updateButtonsState: true
			});
		},

		handleAddTa() {
	      console.log("1");
	      this.setState({
				display: true
		  });
	    },

	    handleSaveTa() {
	    	console.log("saving...");
	    	this.tas().actions.setTaId(this.refs.taIdToInsert.getDOMNode().value);
	    	this.tas().actions.setTaName(this.refs.taNameToInsert.getDOMNode().value);
	    	this.tas().actions.setCountry("AT");
	    	this.tas().actions.setDivision("PH");
	    	this.tas().actions.setOu("AUSTRIA_PH");
	    	this.tas().actions.addTaPopup();
	    	this.setState({
	    		display: false
	    	});
	    },

	    handleEditTa() {
	      console.log("2");
	      this.setState({
	      	display3: true
	      });
	      this.updateRefs();
	    },

	    handleUpdateTa(){
	    	console.log("updating...");
	    	this.tas().actions.setTaId(this.refs.taId.getDOMNode().value);
	    	this.tas().actions.setTaName(this.refs.taName.getDOMNode().value);
	    	this.tas().actions.setCountry("AT");
	    	this.tas().actions.setDivision("PH");
	    	this.tas().actions.setOu("AUSTRIA_PH");
	    	this.tas().actions.updateTaPopup();
	    	this.setState({
	    		display3: false
	    	});
	    	this.updateRefs();
	    },

	    handleDeleteTa() {
	      console.log("3");
	      this.setState({
			display2: true
		  });
	    },

	    handleDelete2Ta() {
	      console.log("deleting...");
	      this.tas().actions.deleteTaPopup();
	      this.setState({
	      	display2: false
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
	    	this.tas().actions.setPage(1);
	    	this.tas().actions.setSearch(this.state.search);
	    	this.updateData();
	    },

	    updateRefs(){
	    	this.refs.taId.getDOMNode().value = this.tas().store.getTaId();
	    	this.refs.taName.getDOMNode().value = this.tas().store.getTaName();
	    	this.refs.country.getDOMNode().value = this.tas().store.getTaCountry();
	    	this.refs.division.getDOMNode().value = this.tas().store.getTaDivision();
	    	//this.refs.ou.getDOMNode().value = this.tas().store.getTaOu();
	    	(this.tas().store.getTaIsBu()==1) ? this.state.isBu = true : this.state.isBu = false;
	    	(this.tas().store.getTaIsBf()==1) ? this.state.isBf = true : this.state.isBf = false;
	    },

	    deleteRefs(){
	    	this.refs.taIdToInsert.getDOMNode().value = "";
	    	this.refs.taNameToInsert.getDOMNode().value = "";
	    	//this.refs.country.getDOMNode().value = "";
	    	//this.refs.division.getDOMNode().value = "";
	    	//this.refs.ou.getDOMNode().value = "";
	    	//this.refs.isBu.getDOMNode().value = "";
	    	//this.refs.isBf.getDOMNode().value = "";
	    },

	    deleteDataOnStore(){
	    	this.tas().actions.setTaId(null);
	    	this.tas().actions.setTaName(null);
	    	//this.tas().actions.setCountry(null);
	    	//this.tas().actions.setDivision(null);
	    	//this.tas().actions.setOu(null);
	    	//this.tas().actions.setIsBu(null);
	    	//this.tas().actions.setIsBf(null);
	    },

	    updateData(){
	    	this.deleteRefs();
	    	this.deleteDataOnStore();
	    	this.setState({
	    		updateButtonsState: false
	    	});
	    	this.getData();
	    },

	    // Validaciones
	    handleTaId(){
	    	//console.log(this.refs.taId.getDOMNode().value);
	    	//var isnum = /^[0-9]{1,5}$|^$/.test(this.refs.taId.getDOMNode().value);
	    	this.setState({
	    		isnum: /^[0-9]{1,5}$|^$/.test(this.refs.taIdToInsert.getDOMNode().value)
	    	})
	    	this.verifyAdding();
	    },

	    handleTaName(){
	    	this.setState({
	    		isStrMax : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.taNameToInsert.getDOMNode().value)
	    	})
	    	this.verifyAdding();
	    },

	    handleChangeOnComboOu(dato){
	    	console.log("change: "+dato);
	    	this.tas().actions.setOu(dato);
	    	this.getData();
	    },

	    verifyAdding(a){
	    	if(a!=undefined){
	    		if(this.refs.taIdToInsert.getDOMNode().value!="" && this.refs.taNameToInsert.getDOMNode().value!=""){
		    		if(/^[0-9]{1,5}$|^$/.test(this.refs.taIdToInsert.getDOMNode().value) && /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.taNameToInsert.getDOMNode().value)){
		    			this.setState({
				    		saveButtonState: true,
				    		flag: true
				    	});
		    		}else{
		    			this.setState({
				    		saveButtonState: false
				    	});
		    		}
		    	}else{
		    		this.setState({
			    		saveButtonState: false
			    	});
		    	}
	    	}else if(this.state.flag){
	    		if(this.refs.taIdToInsert.getDOMNode().value!="" && this.refs.taNameToInsert.getDOMNode().value!=""){
		    		if(/^[0-9]{1,5}$|^$/.test(this.refs.taIdToInsert.getDOMNode().value) && /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.taNameToInsert.getDOMNode().value)){
		    			this.setState({
				    		saveButtonState: true
				    	});
		    		}else{
		    			this.setState({
				    		saveButtonState: false
				    	});
		    		}
		    	}else{
		    		this.setState({
			    		saveButtonState: false
			    	});
		    	}
	    	}
	    },

	    getData(){
	    	this.tas().actions.queryTas();
	    	this.tas().actions.queryTasCount();
	    },

	    handleChangeOnComboOuForPopup(dato){
	    	console.log("change on popup: "+dato);
	    	this.setState({
				organizationalUnitToInsert: dato
			});
			this.verifyAdding({"ou":dato});
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

	    errorInserting(){
	    	this.setState({
	    		display4: true
	    	});
	    },

	    handleCheckBoxes(){
	    	var c1, c2;
	    	this.setState({
	    		isBu: this.refs.isBu.getDOMNode().checked,
	    		isBf: this.refs.isBf.getDOMNode().checked
	    	});
	    	(this.refs.isBu.getDOMNode().checked) ? c1=1 : c1=0;
	    	(this.refs.isBf.getDOMNode().checked) ? c2=1 : c2=0;
	    	this.tas().actions.setIsBu(c1);
	    	this.tas().actions.setIsBf(c2);
	    },

	    handleCheckBoxes2(){
	    	var c1, c2;
	    	this.setState({
	    		isBuInserted: this.refs.isBuInserted.getDOMNode().checked,
	    		isBfInserted: this.refs.isBfInserted.getDOMNode().checked
	    	});
	    	(this.refs.isBuInserted.getDOMNode().checked) ? c1=1 : c1=0;
	    	(this.refs.isBfInserted.getDOMNode().checked) ? c2=1 : c2=0;
	    	this.tas().actions.setIsBu(c1);
	    	this.tas().actions.setIsBf(c2);
	    },

		/**
		 * Rendering method
		 */
		 render() {
		 	//Add Popup
		 	var header = <div>Add Ta Dialog</div>
		    var body = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Ta Id : </div>
						        	<div className="column"><input className={(this.state.isnum) ? '' : 'error'} value={this.state.taId} id="readonly" ref="taIdToInsert" onChange={this.handleTaId} placeholder="Introduce a number" name="taid" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Ta Name : </div>
						        	<div className="column"><input className={(this.state.isStrMax) ? '' : 'error'} value={this.state.taName} ref="taNameToInsert" onChange={this.handleTaName} placeholder="Introduce a name" name="taname" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Organizational Unit : </div>
						        	<ComboComponent saveData="ou" display="ou" comboData={this.state.ous} changeHandler={this.handleChangeOnComboOuForPopup}/>
						        </div>
						        <div className="row">
						        	<div className="column">Country : </div>
						        	<div className="column"><input value={this.state.country} name="country" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Division : </div>
						        	<div className="column"><input value={this.state.division} name="division" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is Bu : </div>
						        	<div className="column"><input checked={this.state.isBuInserted} ref="isBuInserted" onChange={this.handleCheckBoxes2} name="isBuInserted" type="checkbox" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is Bf : </div>
						        	<div className="column"><input checked={this.state.isBfInserted} ref="isBfInserted" onChange={this.handleCheckBoxes2} name="isBfInserted" type="checkbox" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer = <div><button disabled={this.state.saveButtonState ? '' : 'disabled'} className={this.state.saveButtonState ? 'popup-button black-color' : 'popup-button gray-button'} onClick={this.handleSaveTa}>SAVE</button></div>

		    var modalProps = {
		      header: header,
		      body: body,
		      footer: footer
		    }

		    //Edit Popup
		 	var header3 = <div>Edit Ta Dialog</div>
		    var body3 = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Ta Id : </div>
						        	<div className="column"><input value={this.state.taId} ref="taId" name="inputid" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Ta Name : </div>
						        	<div className="column"><input className={(this.state.isStrMax) ? '' : 'error'} ref="taName" value={this.state.taName} onChange={this.handleTaName} placeholder="Introduce a name" name="inputname" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Organizational Unit : </div>
						        	<ComboComponent saveData="ou" display="ou" comboData={this.state.ous} changeHandler={this.handleChangeOnComboOuForPopup}/>
						        </div>
						        <div className="row">
						        	<div className="column">Country : </div>
						        	<div className="column"><input value={this.state.country} ref="country" name="inputdesc" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Division : </div>
						        	<div className="column"><input value={this.state.division} ref="division" name="inputdesc" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is Bu : </div>
						        	<div className="column"><input checked={this.state.isBu} ref="isBu" onChange={this.handleCheckBoxes} type="checkbox" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is Bf : </div>
						        	<div className="column"><input checked={this.state.isBf} ref="isBf" onChange={this.handleCheckBoxes} type="checkbox" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer3 = <div><button className="popup-button black-color" onClick={this.handleUpdateTa}>SAVE</button></div>

		    var modalProps3 = {
		      header: header3,
		      body: body3,
		      footer: footer3
		    }

		    //Delete Popup
		    var header2 = <div>Delete Ta Dialog</div>
		    var body2 = <div>Are you sure?</div>
		    var footer2 = <div><button className="popup-button black-color" onClick={this.handleDelete2Ta}>OK</button></div>

		    var modalProps2 = {
		      header: header2,
		      body: body2,
		      footer: footer2
		    }

		    //Error Inserting Popup
		    var header4 = <div>Error Therapeutical Area Dialog</div>
		    var body4 = <div>Error Inserting a Therapeutical Area: The ta id already exists in database</div>
		    var footer4 = <div></div>

		    var modalProps4 = {
		      header: header4,
		      body: body4,
		      footer: footer4
		    }

		 	return (
		 		<div className="header-buttons-admin">
		 		  <div className="combos">
		 		  	<div>
		 		  		<img width="20px" src="http://www.clker.com/cliparts/Q/l/L/B/F/a/search-icon-md.png"/>
		 		  	</div>
		 		  	<ComboComponent saveData="ou" display="ou" comboText="Organizational Unit" comboData={this.state.ous} changeHandler={this.handleChangeOnComboOu}/>
		 		  </div>
			      <div className="navigator">
			        <button className="button blue-color" onClick={this.handleAddTa}><span className="glyphicon glyphicon-plus-sign">Add Therapeutical Area</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button black-color' : 'button gray-color'} onClick={this.handleEditTa}><span className="glyphicon glyphicon-pencil">Edit Therapeutical Area</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button red-color' : 'button gray-color'} onClick={this.handleDeleteTa}><span className="glyphicon glyphicon-remove">Delete Therapeutical Area</span></button>
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
