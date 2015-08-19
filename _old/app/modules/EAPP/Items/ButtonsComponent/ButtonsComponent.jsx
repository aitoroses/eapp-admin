var react = require('angular/react');
var classnames = require('classnames');

var ButtonFactory = function ButtonComponent(injector, util) {

	var ModalComponent = require('../../Utils/PopupComponent/modal');

	var ItemsMixin = require('../../Stores/ItemsMixin');

	var ButtonComponent = React.createClass({
		
		mixins: [ItemsMixin],

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
	        itemId: null,
	        itemName: null,
	        itemDescription: null,
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

		handleAddItem() {
	      console.log("1");
	      this.setState({
				display: true
		  });
	    },

	    handleSaveItem() {
	    	console.log("saving...");
	    	this.items().actions.setItemId(this.refs.itemIdToInsert.getDOMNode().value);
	    	this.items().actions.setItemName(this.refs.itemNameToInsert.getDOMNode().value);
	    	this.items().actions.setItemDescription(this.refs.itemDescriptionToInsert.getDOMNode().value);
	    	this.items().actions.addItemPopup();
	    	this.setState({
	    		display: false
	    	});
	    },

	    handleEditItem() {
	      console.log("2");
	      this.setState({
	      	display3: true
	      });
	      this.updateRefs();
	    },

	    handleUpdateItem(){
	    	console.log("updating...");
	    	this.items().actions.setItemId(this.refs.itemId.getDOMNode().value);
	    	this.items().actions.setItemName(this.refs.itemName.getDOMNode().value);
	    	this.items().actions.setItemDescription(this.refs.itemDescription.getDOMNode().value);
	    	this.items().actions.updateItemPopup();
	    	this.setState({
	    		display3: false
	    	});
	    	this.updateRefs();
	    },

	    handleDeleteItem() {
	      console.log("3");
	      this.setState({
			display2: true
		  });
	    },

	    handleDelete2Item() {
	      console.log("deleting...");
	      this.items().actions.deleteItemPopup();
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
	    	this.items().actions.setPage(1);
	    	this.items().actions.setSearch(this.state.search);
	    	this.updateData();
	    },

	    updateRefs(){
	    	this.refs.itemId.getDOMNode().value = this.items().store.getItemId();
	    	this.refs.itemName.getDOMNode().value = this.items().store.getItemName();
	    	this.refs.itemDescription.getDOMNode().value = this.items().store.getItemDescription();
	    },

	    deleteRefs(){
	    	this.refs.itemId.getDOMNode().value = "";
	    	this.refs.itemName.getDOMNode().value = "";
	    	this.refs.itemDescription.getDOMNode().value = "";
	    },

	    deleteDataOnStore(){
	    	this.items().actions.setItemId(null);
	    	this.items().actions.setItemName(null);
	    	this.items().actions.setItemDescription(null);
	    },

	    updateData(){
	    	this.deleteRefs();
	    	this.deleteDataOnStore();
	    	this.setState({
	    		updateButtonsState: false
	    	});
	    	this.items().actions.queryItems();
	    	this.items().actions.queryItemsCount();
	    },

	    // Validaciones
	    handleItemId(){
	    	//console.log(this.refs.itemId.getDOMNode().value);
	    	//var isnum = /^[0-9]{1,5}$|^$/.test(this.refs.itemId.getDOMNode().value);
	    	this.setState({
	    		isnum: /^[0-9]{1,5}$|^$/.test(this.refs.itemId.getDOMNode().value),
	    		isnumToInsert: /^[0-9]{1,5}$|^$/.test(this.refs.itemIdToInsert.getDOMNode().value)
	    	})
	    	this.verifyAdding();
	    },

	    handleItemNameAndDescription(){
	    	//debugger;
	    	this.setState({
	    		isStrMax : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.itemName.getDOMNode().value),
	    		isStrMax2 : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.itemDescription.getDOMNode().value),
	    		isStrMaxToInsert : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.itemNameToInsert.getDOMNode().value),
	    		isStrMax2ToInsert : /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.itemDescriptionToInsert.getDOMNode().value)
	    	})
	    	this.verifyAdding();
	    },

	    verifyAdding(){
	    	if(this.refs.itemIdToInsert.getDOMNode().value!="" && this.refs.itemNameToInsert.getDOMNode().value!="" && this.refs.itemDescriptionToInsert.getDOMNode().value!=""){
	    		if(/^[0-9]{1,5}$|^$/.test(this.refs.itemIdToInsert.getDOMNode().value) && /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.itemNameToInsert.getDOMNode().value) && /^[a-zA-Z ]{1,200}$|^$/.test(this.refs.itemDescriptionToInsert.getDOMNode().value)){
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
	    	//console.log("Error Componente");
	    	this.setState({
	    		display4: true
	    	});
	    },

		/**
		 * Rendering method
		 */
		 render() {
		 	//Add Popup
		 	var header = <div>Add Item Dialog</div>
		    var body = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Item Id : </div>
						        	<div className="column"><input className={(this.state.isnumToInsert) ? '' : 'error'} value={this.state.itemId} id="readonly" ref="itemIdToInsert" onChange={this.handleItemId} placeholder="Introduce a number" name="itemid" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Item Name : </div>
						        	<div className="column"><input className={(this.state.isStrMaxToInsert) ? '' : 'error'} value={this.state.itemName} ref="itemNameToInsert" onChange={this.handleItemNameAndDescription} placeholder="Introduce a name" name="inputname" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Item Description : </div>
						        	<div className="column"><input className={(this.state.isStrMax2ToInsert) ? '' : 'error'} value={this.state.itemDescription} ref="itemDescriptionToInsert" onChange={this.handleItemNameAndDescription} placeholder="Introduce a description" name="inputdesc" type="text" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer = <div><button disabled={this.state.saveButtonState ? '' : 'disabled'} className={this.state.saveButtonState ? 'popup-button black-color' : 'popup-button gray-color'} onClick={this.handleSaveItem}>SAVE</button></div>

		    var modalProps = {
		      header: header,
		      body: body,
		      footer: footer
		    }

		    //Edit Popup
		 	var header3 = <div>Edit Item Dialog</div>
		    var body3 = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Item Id : </div>
						        	<div className="column"><input className={(this.state.isnum) ? '' : 'error'} value={this.state.itemId} id="readonly" ref="itemId" onChange={this.handleItemId} placeholder="Introduce a number" name="itemid" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Item Name : </div>
						        	<div className="column"><input className={(this.state.isStrMax) ? '' : 'error'} value={this.state.itemName} ref="itemName" onChange={this.handleItemNameAndDescription} placeholder="Introduce a name" name="inputname" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Item Description : </div>
						        	<div className="column"><input className={(this.state.isStrMax2) ? '' : 'error'} value={this.state.itemDescription} ref="itemDescription" onChange={this.handleItemNameAndDescription} placeholder="Introduce a description" name="inputdesc" type="text" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer3 = <div><button className="popup-button black-color" onClick={this.handleUpdateItem}>SAVE</button></div>

		    var modalProps3 = {
		      header: header3,
		      body: body3,
		      footer: footer3
		    }

		    //Delete Popup
		    var header2 = <div>Delete Item Dialog</div>
		    var body2 = <div>Are you sure?</div>
		    var footer2 = <div><button className="popup-button black-color" onClick={this.handleDelete2Item}>OK</button></div>

		    var modalProps2 = {
		      header: header2,
		      body: body2,
		      footer: footer2
		    }

		     //Error Inserting Popup
		    var header4 = <div>Error Item Dialog</div>
		    var body4 = <div>Error Inserting Item: The item id already exists in database</div>
		    var footer4 = <div></div>

		    var modalProps4 = {
		      header: header4,
		      body: body4,
		      footer: footer4
		    }

		 	return (
		 		<div className="header-buttons-admin">
			      <div className="navigator">
			        <button className="button blue-color" onClick={this.handleAddItem}><span className="glyphicon glyphicon-plus-sign">Add Item</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button black-color' : 'button gray-color'} onClick={this.handleEditItem}><span className="glyphicon glyphicon-pencil">Edit Item</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button red-color' : 'button gray-color'} onClick={this.handleDeleteItem}><span className="glyphicon glyphicon-remove">Delete Item</span></button>
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
