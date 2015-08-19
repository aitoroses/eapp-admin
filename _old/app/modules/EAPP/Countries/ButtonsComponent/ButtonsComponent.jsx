var react = require('angular/react');
var classnames = require('classnames');

var ButtonFactory = function ButtonComponent(injector, util) {

	var ModalComponent = require('../../Utils/PopupComponent/modal');

	var CountriesMixin = require('../../Stores/CountriesMixin');

	var ButtonComponent = React.createClass({
		
		mixins: [CountriesMixin],

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
	        saveButtonState: false
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

		handleAddCountry() {
	      console.log("1");
	      this.setState({
				display: true
		  });
	    },

	    handleSaveCountry() {
	    	console.log("saving...");
	    	this.countries().actions.setCountryId(this.refs.countryIdToInsert.getDOMNode().value);
	    	this.countries().actions.setCountryCode(this.refs.countryCodeToInsert.getDOMNode().value);
	    	this.countries().actions.setCountryName(this.refs.countryNameToInsert.getDOMNode().value);
	    	this.countries().actions.addCountryPopup();
	    	this.setState({
	    		display: false
	    	});
	    },

	    handleEditCountry() {
	      console.log("2");
	      this.setState({
	      	display3: true
	      });
	      this.updateRefs();
	    },

	    handleUpdateCountry(){
	    	console.log("updating...");
	    	this.countries().actions.setCountryId(this.refs.countryId.getDOMNode().value);
	    	this.countries().actions.setCountryCode(this.refs.countryCode.getDOMNode().value);
	    	this.countries().actions.setCountryName(this.refs.countryName.getDOMNode().value);
	    	this.countries().actions.updateCountryPopup();
	    	this.setState({
	    		display3: false
	    	});
	    	this.updateRefs();
	    },

	    handleDeleteCountry() {
	      console.log("3");
	      this.setState({
			display2: true
		  });
	    },

	    handleDelete2Country() {
	      console.log("deleting...");
	      this.countries().actions.deleteCountryPopup();
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
	    	this.countries().actions.setPage(1);
	    	this.countries().actions.setSearch(this.state.search);
	    	this.updateData();
	    },

	    updateRefs(){
	    	this.refs.countryId.getDOMNode().value = this.countries().store.getCountryId();
	    	this.refs.countryCode.getDOMNode().value = this.countries().store.getCountryCode();
	    	this.refs.countryName.getDOMNode().value = this.countries().store.getCountryName();
	    },

	    deleteRefs(){
	    	this.refs.countryId.getDOMNode().value = "";
	    	this.refs.countryCode.getDOMNode().value = "";
	    	this.refs.countryName.getDOMNode().value = "";
	    },

	    deleteDataOnStore(){
	    	this.countries().actions.setCountryId(null);
	    	this.countries().actions.setCountryCode(null);
	    	this.countries().actions.setCountryName(null);
	    },

	    updateData(){
	    	this.deleteRefs();
	    	this.deleteDataOnStore();
	    	this.setState({
	    		updateButtonsState: false
	    	});
	    	this.countries().actions.queryCountries();
	    	this.countries().actions.queryCountriesCount();
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

	    errorInserting(){
	    	this.setState({
	    		display4: true
	    	});
	    },

		/**
		 * Rendering method
		 */
		 render() {
		 	//Add Popup
		 	var header = <div>Add Country Dialog</div>
		    var body = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Country Id : </div>
						        	<div className="column"><input className={(this.state.isnumToInsert) ? '' : 'error'} value={this.state.countryId} id="readonly" ref="countryIdToInsert" onChange={this.handleCountryId} placeholder="Introduce a number" name="countryid" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Country Code : </div>
						        	<div className="column"><input className={(this.state.isStrMaxToInsert) ? '' : 'error'} value={this.state.countryCode} ref="countryCodeToInsert" onChange={this.handleCountryCodeAndName} placeholder="Introduce a code" name="inputname" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Country Name : </div>
						        	<div className="column"><input className={(this.state.isStrMax2ToInsert) ? '' : 'error'} value={this.state.countryName} ref="countryNameToInsert" onChange={this.handleCountryCodeAndName} placeholder="Introduce a name" name="inputdesc" type="text" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer = <div><button disabled={this.state.saveButtonState ? '' : 'disabled'} className={this.state.saveButtonState ? 'popup-button black-color' : 'popup-button gray-color'} onClick={this.handleSaveCountry}>SAVE</button></div>

		    var modalProps = {
		      header: header,
		      body: body,
		      footer: footer
		    }

		    //Edit Popup
		 	var header3 = <div>Edit Country Dialog</div>
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
		    var footer3 = <div><button className="popup-button black-color" onClick={this.handleUpdateCountry}>SAVE</button></div>

		    var modalProps3 = {
		      header: header3,
		      body: body3,
		      footer: footer3
		    }

		    //Delete Popup
		    var header2 = <div>Delete Country Dialog</div>
		    var body2 = <div>Are you sure?</div>
		    var footer2 = <div><button className="popup-button black-color" onClick={this.handleDelete2Country}>OK</button></div>

		    var modalProps2 = {
		      header: header2,
		      body: body2,
		      footer: footer2
		    }

			//Error Inserting Popup
		    var header4 = <div>Error Country Dialog</div>
		    var body4 = <div>Error Inserting Country: The country id already exists in database</div>
		    var footer4 = <div></div>

		    var modalProps4 = {
		      header: header4,
		      body: body4,
		      footer: footer4
		    }

		 	return (
		 		<div className="header-buttons-admin">
			      <div className="navigator">
			        <button className="button blue-color" onClick={this.handleAddCountry}><span className="glyphicon glyphicon-plus-sign">Add Country</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button black-color' : 'button gray-color'} onClick={this.handleEditCountry}><span className="glyphicon glyphicon-pencil">Edit Country</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button red-color' : 'button gray-color'} onClick={this.handleDeleteCountry}><span className="glyphicon glyphicon-remove">Delete Country</span></button>
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
