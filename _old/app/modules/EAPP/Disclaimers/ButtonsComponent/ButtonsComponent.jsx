var react = require('angular/react');
var classnames = require('classnames');

var ButtonFactory = function ButtonComponent(injector, util) {

	var ModalComponent = require('../../Utils/PopupComponent/modal');

	var ComboComponent = require('../../Utils/ComboComponent/ComboComponent')(injector,util);

	var DisclaimersMixin = require('../../Stores/DisclaimersMixin');

	var ButtonComponent = React.createClass({
		
		mixins: [DisclaimersMixin],

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
	        itemId: null,
	        organizationalUnit: null,
	        itemIdToInsert: null,
	        organizationalUnitToInsert: null,
	        disclaimer: null,
	        updateButtonsState: false,
	        items: [],
	        ous: this.disclaimers().store.getOus(),
	        ouFilterData: null,
	        itemFilterData: null,
	        itemVerified: null,
	        ouVerified: null,
	        disclaimerVerified: null,
	        saveButtonState: false
	      }
	    },

		/**
		 * On mount
		 */
		componentDidMount() {
			console.log("Button Component loaded successfully");
			this.disclaimers().actions.queryItems();
		},

		filterOu(){
			var x = [];
			for (var i = 0; i < this.state.ous.length; i++) {
				if(this.state.ous[i].ou.indexOf(this.refs.filterdataOu.getDOMNode().value)!=-1){
					x.push(this.state.ous[i]);
				}
			};
			this.setState({
				ous: x
			});
		},

		filterItems(){
			var x = [];
			for (var i = 0; i < this.state.items.length; i++) {
				if(this.state.items[i].itemDescription.indexOf(this.refs.filterdataItem.getDOMNode().value)!=-1){
					x.push(this.state.items[i]);
				}
			};
			this.setState({
				items: x
			});
		},

		updateStateButtons(){
			console.log("Buttons Component updateStateButtons");
			if(this.disclaimers().store.getSelectedRow()!=null){
				this.setState({
					updateButtonsState: true,
					itemIdToInsert: this.disclaimers().store.getItemId(),
					organizationalUnitToInsert: this.disclaimers().store.getOu(),
					disclaimer: this.disclaimers().store.getDisclaimer()
				});
			}else{
				this.setState({
					updateButtonsState: false
				});
			}
			this.setState({
				updateButtonsState: true,
				itemIdToInsert: this.disclaimers().store.getItemId(),
				organizationalUnitToInsert: this.disclaimers().store.getOu(),
				disclaimer: this.disclaimers().store.getDisclaimer()
			});
		},

		onItemsFetch(){
			//console.log(this.disclaimers().store.getItems());
			this.setState({
				items: this.disclaimers().store.getItems()
			});
		},

		handleChangeOnComboItem(dato){
			console.log("CAMBIO EN COMBO ITEM: "+dato);
			this.setState({
				itemId: dato
			});
			this.disclaimers().actions.setItemId(dato);
			this.getData();
		},

		handleChangeOnComboOu(dato){
			console.log("CAMBIO EN COMBO OU: "+dato);
			this.setState({
				organizationalUnit: dato
			});
			this.disclaimers().actions.setOu(dato);			
			this.getData();
		},

		handleChangeOnComboItemToInsert(dato){
			console.log("CAMBIO EN COMBO ITEM TO INSERT: "+dato);
			this.setState({
				itemIdToInsert: dato
			});
			this.verifyAdding({"item":dato});
		},

		handleChangeOnComboOuToInsert(dato){
			console.log("CAMBIO EN COMBO OU TO INSERT: "+dato);
			this.setState({
				organizationalUnitToInsert: dato
			});
			this.verifyAdding({"ou":dato});
		},

		handleAddDisclaimer() {
	      console.log("1");
	      this.setState({
				display: true
		  });
	    },

	    handleSaveDisclaimer() {
	    	console.log("saving...");
	    	this.disclaimers().actions.setItemId(this.state.itemIdToInsert);
	    	this.disclaimers().actions.setOu(this.state.organizationalUnitToInsert);
	    	this.disclaimers().actions.setDisclaimer(this.state.disclaimer);
	    	this.disclaimers().actions.addDisclaimerPopup();
	    	this.setState({
	    		display: false
	    	});
	    },

	    handleEditDisclaimer() {
	      console.log("2");
	      this.setState({
	      	display3: true
	      });
	      //this.updateRefs();
	    },

	    handleUpdateDisclaimer(){
	    	console.log("updating...");
	    	this.disclaimers().actions.setItemId(this.state.itemIdToInsert);
	    	this.disclaimers().actions.setOu(this.state.organizationalUnitToInsert);
	    	this.disclaimers().actions.setDisclaimer(this.state.disclaimer);
	    	this.disclaimers().actions.updateDisclaimerPopup();
	    	this.disclaimers().actions.setSelectedRow(null);
	    	this.setState({
	    		display3: false
	    	});
	    	//this.updateRefs();
	    },

	    handleDeleteDisclaimer() {
	      console.log("3");
	      this.setState({
			display2: true
		  });
	    },

	    handleDelete2Disclaimer() {
	      console.log("deleting...");
	      this.disclaimers().actions.deleteDisclaimerPopup();
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
	    	this.disclaimers().actions.setPage(1);
	    	this.disclaimers().actions.setSearch(this.state.search);
	    	this.updateData();
	    },

	    updateRefs(){
	    	this.refs.itemId.getDOMNode().value = this.disclaimers().store.getItemId();
	    	this.refs.organizationalUnit.getDOMNode().value = this.disclaimers().store.getOu();
	    	//this.refs.disclaimer.getDOMNode().value = this.disclaimers().store.getDisclaimer();
	    },

	    deleteRefs(){
	    	if(this.refs.itemId) this.refs.itemId.getDOMNode().value = "";
	    	if(this.refs.organizationalUnit) this.refs.organizationalUnit.getDOMNode().value = "";
	    	//this.refs.disclaimer.getDOMNode().value = "";
	    },

	    deleteDataOnStore(){
	    	this.disclaimers().actions.setItemId(null);
	    	this.disclaimers().actions.setOu(null);
	    	this.disclaimers().actions.setDisclaimer(null);
	    },

	    updateData(){
	    	//this.deleteRefs();
	    	this.deleteDataOnStore();
	    	this.setState({
	    		updateButtonsState: false
	    	});
	    	this.getData();
	    },

	    getData(){
	    	this.disclaimers().actions.queryDisclaimers();
	    	this.disclaimers().actions.queryDisclaimersCount();
	    },

	    // Validaciones
	    handleItemId(){
	    	//console.log(this.refs.itemId.getDOMNode().value);
	    	//var isnum = /^[0-9]{1,5}$|^$/.test(this.refs.itemId.getDOMNode().value);
	    	this.setState({
	    		isnum: /^[0-9]{1,5}$|^$/.test(this.refs.itemId.getDOMNode().value)
	    	})
	    },

	    handleOrganizationalUnit(e){
	    	//Change Regex
	    	//isStrMax : /^[a-zA-Z ]{1,200}$|^$/.test(e.target.value)
	    	this.setState({
	    		isStrMax : /^.{1,200}$|^$/.test(e.target.value)
	    	})
	    	this.setState({
	    		disclaimer: e.target.value
	    	});
	    	this.verifyAdding({"disclaimer":e.target.value});
	    },

	    verifyAdding(a){
	    	if(a.hasOwnProperty("item")){
	    		this.setState({
	    			itemVerified: a.item
	    		});
	    		console.log(a.item);
	    		console.log(this.state.ouVerified);
	    		console.log(this.state.disclaimerVerified);
	    		if(this.state.ouVerified!=null && this.state.disclaimerVerified!=null){
	    			this.setState({
	    				saveButtonState: true
	    			})
	    		}
	    	}
	    	if(a.hasOwnProperty("ou")){
	    		this.setState({
	    			ouVerified: a.ou
	    		});
	    		console.log(a.ou);
	    		console.log(this.state.itemVerified);
	    		console.log(this.state.disclaimerVerified);
	    		if(this.state.itemVerified!=null && this.state.disclaimerVerified!=null){
	    			this.setState({
	    				saveButtonState: true
	    			})
	    		}
	    	}
	    	if(a.hasOwnProperty("disclaimer")){
	    		if(a.disclaimer==""){
	    			this.setState({
	    				saveButtonState: false
	    			})
	    		}else{
	    			this.setState({
		    			disclaimerVerified: a.disclaimer
		    		});
		    		console.log(a.disclaimer);
		    		console.log(this.state.itemVerified);
		    		console.log(this.state.ouVerified);
		    		if(this.state.ouVerified!=null && this.state.itemVerified!=null){
		    			this.setState({
		    				saveButtonState: true
		    			})
		    		}
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
		 	var header = <div>Add Disclaimer Dialog</div>
		    var body = <div className="container-table">
		    				<form name="form" noValidate>
						        <div>
						        	<ComboComponent saveData="itemId" display="itemDescription" comboText="Item Name" comboData={this.state.items} changeHandler={this.handleChangeOnComboItemToInsert}/>
						        </div>
						        <div>
						        	<ComboComponent saveData="ou" display="ou" comboText="Organizational Unit" comboData={this.state.ous} changeHandler={this.handleChangeOnComboOuToInsert}/>
						        </div>
						        <div>
						        	<div className="column">Disclaimer : </div>
						        	<div className="column"><textarea className={(this.state.isStrMax) ? '' : 'error'} value={this.state.disclaimer} onChange={this.handleOrganizationalUnit} placeholder="Introduce a Disclaimer" name="inputdesc" type="text" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer = <div><button disabled={this.state.saveButtonState ? '' : 'disabled'} className={this.state.saveButtonState ? 'popup-button black-color' : 'popup-button gray-color'} onClick={this.handleSaveDisclaimer}>SAVE</button></div>

		    var modalProps = {
		      header: header,
		      body: body,
		      footer: footer
		    }

		    //Edit Popup
		 	var header3 = <div>Edit Disclaimer Dialog</div>
		    var body3 = <div className="container-table">
		    				<form name="form" noValidate>
		    					<div className="row">
		    						<div className="column">Item Id : </div>
		    						<div className="column"><input value={this.state.itemIdToInsert} name="inputdesc" type="text" disabled /></div>
		    					</div>
		    					<div className="row">
		    						<div className="column">Organizational Unit : </div>
		    						<div className="column"><input value={this.state.organizationalUnitToInsert} name="inputdesc" type="text" disabled /></div>
		    					</div>
						        <div className="row">
						        	<div className="column">Disclaimer : </div>
						        	<div className="column"><textarea className={(this.state.isStrMax) ? '' : 'error'} value={this.state.disclaimer} onChange={this.handleOrganizationalUnit} placeholder="Introduce a Disclaimer" name="inputdesc" type="text" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer3 = <div><button className="popup-button black-color" onClick={this.handleUpdateDisclaimer}>SAVE</button></div>

		    var modalProps3 = {
		      header: header3,
		      body: body3,
		      footer: footer3
		    }

		    //Delete Popup
		    var header2 = <div>Delete Disclaimer Dialog</div>
		    var body2 = <div>Are you sure?</div>
		    var footer2 = <div><button className="popup-button black-color" onClick={this.handleDelete2Disclaimer}>OK</button></div>

		    var modalProps2 = {
		      header: header2,
		      body: body2,
		      footer: footer2
		    }

		    //Error Inserting Popup
		    var header4 = <div>Error Item Dialog</div>
		    var body4 = <div>Error Inserting disclaimer: The disclaimer already exists in database</div>
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
		 		  	  Filter: <input value={this.state.itemFilterData} ref="filterdataItem" name="filterdataItem" onChange={this.filterItems} type="text"/>
			 		  <ComboComponent saveData="itemId" display="itemDescription" comboText="Item" comboData={this.state.items} changeHandler={this.handleChangeOnComboItem}/>
			 		  Filter: <input value={this.state.ouFilterData} ref="filterdataOu" name="filterdataOu" onChange={this.filterOu} type="text"/>
			 		  <ComboComponent saveData="ou" display="ou" comboText="Organizational Unit" comboData={this.state.ous} changeHandler={this.handleChangeOnComboOu}/>
		 		  </div>
			      <div className="navigator">
			        <button className="button blue-color" onClick={this.handleAddDisclaimer}><span className="glyphicon glyphicon-plus-sign">Add Disclaimer</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button black-color' : 'button gray-color'} onClick={this.handleEditDisclaimer}><span className="glyphicon glyphicon-pencil">Edit Disclaimer</span></button>
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button red-color' : 'button gray-color'} onClick={this.handleDeleteDisclaimer}><span className="glyphicon glyphicon-remove">Delete Disclaimer</span></button>
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
