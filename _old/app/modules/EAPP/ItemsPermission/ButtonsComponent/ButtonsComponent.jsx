var react = require('angular/react');
var classnames = require('classnames');

var ButtonFactory = function ButtonComponent(injector, util) {

	var ModalComponent = require('../../Utils/PopupComponent/modal');

	var ComboComponent = require('../../Utils/ComboComponent/ComboComponent')(injector,util);

	var ItemsPermissionMixin = require('../../Stores/ItemsPermissionMixin');

	var ButtonComponent = React.createClass({
		
		mixins: [ItemsPermissionMixin],

		/**
	     * Get the initial state for the component
	     */
	    getInitialState(){
	      return {
	        search: "",
	        display: false,
	        isnum: true,
	        isStrMax: true,
	        itemId: null,
	        itemName: null,
	        itemDescription: null,
	        updateButtonsState: false,
	        items: [],
	        ous: this.ItemsPermission().store.getOus(),
	        ouFilterData: null,
	        itemFilterData: null,
	        country: null,
	        division: null,
	        businessRole: null,
	        isForMarketing: false,
	        isForMedical: false,
	        isForSales: false,
	        everybody: false
	      }
	    },

		/**
		 * On mount
		 */
		componentDidMount() {
			console.log("Button Component loaded successfully");
			this.ItemsPermission().actions.queryItems();
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
			if(this.ItemsPermission().store.getSelectedRow()!=null){
				this.setState({
					updateButtonsState: true
				});
			}else{
				this.setState({
					updateButtonsState: false
				});
			}
		},

		onItemsFetch(){
			this.setState({
				items: this.ItemsPermission().store.getItems()
			});
		},

		handleChangeOnComboItem(dato){
			console.log("CAMBIO EN COMBO ITEM: "+dato);
			this.setState({
				itemid: dato
			});
			this.ItemsPermission().actions.setItemId(dato);
			this.getData();
		},

		handleChangeOnComboOu(dato){
			console.log("CAMBIO EN COMBO OU: "+dato);
			this.setState({
				organizationalUnit: dato
			});
			this.ItemsPermission().actions.setOu(dato);
			this.getData();
		},

		handleChangeOnComboOuPopup(dato){
			console.log("CAMBIO EN COMBO OU 2: "+dato);
			var value = dato.lastIndexOf("_");
			var name_for_country = dato.substring(0,value);
			this.ItemsPermission().actions.setItemNameForCombo(name_for_country);
			//this.ItemsPermission().actions.queryCountries();
			//var name_for_division = dato.substring(value+1);
		},

		onItemNameFetchForCombo(){
			console.log("aaaa");
			this.ItemsPermission().actions.queryCountries();
		},

		onCountriesFetch(){
			console.log("bbbb");
		},

	    handleEditItem() {
	      console.log("2");
	      this.setState({
	      	display: true
	      });
	      this.updateRefs();
	    },

	    handleUpdateItemsPermission(){
	    	console.log("updating...");
	    	this.ItemsPermission().actions.updateItemPermissionPopup();
	    	this.setState({
	    		display: false
	    	});
	    	//this.updateRefs();
	    },

	    handleChange(){
	    	var search = this.refs.search.getDOMNode().value;
	    	this.setState({
        		search: search
      		});
	    },

	    handleSearch(){
	    	console.log("button-->"+this.state.search);
	    	this.ItemsPermission().actions.setPage(1);
	    	this.ItemsPermission().actions.setSearch(this.state.search);
	    	this.updateData();
	    },

	    updateRefs(){
	    	this.refs.itemId.getDOMNode().value = this.ItemsPermission().store.getItemId();
	    	//this.refs.itemName.getDOMNode().value = this.ItemsPermission().store.getItemName();
	    	//this.refs.itemDescription.getDOMNode().value = this.ItemsPermission().store.getItemDescription();
	    	this.refs.country.getDOMNode().value = this.ItemsPermission().store.getCountry();
	    	this.refs.division.getDOMNode().value = this.ItemsPermission().store.getDivision();
	    	this.refs.businessRole.getDOMNode().value = this.ItemsPermission().store.getBusinessRole();
	    	(this.ItemsPermission().store.getIsForMedical()==1) ? this.state.isForMedical = true : this.state.isForMedical = false;
	    	(this.ItemsPermission().store.getIsForMarketing()==1) ? this.state.isForMarketing = true : this.state.isForMarketing = false;
	    	(this.ItemsPermission().store.getIsForSales()==1) ? this.state.isForSales = true : this.state.isForSales = false;
	    	(this.ItemsPermission().store.getEverybody()==1) ? this.state.everybody = true : this.state.everybody = false;
	    	/*(this.ItemsPermission().store.getIsForMedical()==0) ? this.refs.isForMedical.getDOMNode().value = true : this.refs.isForMedical.getDOMNode().value = false;
	    	(this.ItemsPermission().store.getIsForMarketing()==0) ? this.refs.isForMarketing.getDOMNode().value = true : this.refs.isForMarketing.getDOMNode().value = false;
	    	(this.ItemsPermission().store.getIsForSales()==0) ? this.refs.isForSales.getDOMNode().value = true : this.refs.isForSales.getDOMNode().value = false;
	    	(this.ItemsPermission().store.getEverybody()==0) ? this.refs.everybody.getDOMNode().value = true : this.refs.everybody.getDOMNode().value = false;*/
	    	/*this.refs.isForMedical.getDOMNode().value = this.ItemsPermission().store.getIsForMedical();
	    	this.refs.isForMarketing.getDOMNode().value = this.ItemsPermission().store.getIsForMarketing();
	    	this.refs.isForSales.getDOMNode().value = this.ItemsPermission().store.getIsForSales();
	    	this.refs.everybody.getDOMNode().value = this.ItemsPermission().store.getEverybody();*/
	    },

	    deleteRefs(){
	    	this.refs.itemId.getDOMNode().value = "";
	    	//this.refs.itemName.getDOMNode().value = "";
	    	//this.refs.itemDescription.getDOMNode().value = "";
	    	this.refs.country.getDOMNode().value = "";
	    	this.refs.division.getDOMNode().value = "";
	    	this.refs.businessRole.getDOMNode().value = "";
	    },

	    deleteDataOnStore(){
	    	this.ItemsPermission().actions.setItemId(null);
	    	this.ItemsPermission().actions.setItemName(null);
	    	this.ItemsPermission().actions.setCountry(null);
	        this.ItemsPermission().actions.setDivision(null);
	        this.ItemsPermission().actions.setOu(null);
	        this.ItemsPermission().actions.setBusinessRole(null);
	        this.ItemsPermission().actions.setIsForMedical(null);
	        this.ItemsPermission().actions.setIsForMarketing(null);
	        this.ItemsPermission().actions.setIsForSales(null);
	        this.ItemsPermission().actions.setEverybody(null);
	    },

	    updateData(){
	    	this.deleteRefs();
	    	this.deleteDataOnStore();
	    	this.setState({
	    		updateButtonsState: false
	    	});
	    	this.getData();
	    },

	    getData(){
	    	this.ItemsPermission().actions.queryItemsPermission();
	    	this.ItemsPermission().actions.queryItemsPermissionCount();
	    },

	    // Validaciones
	    handleItemId(){
	    	//console.log(this.refs.itemId.getDOMNode().value);
	    	//var isnum = /^[0-9]{1,5}$|^$/.test(this.refs.itemId.getDOMNode().value);
	    	this.setState({
	    		isnum: /^[0-9]{1,5}$|^$/.test(this.refs.itemId.getDOMNode().value)
	    	})
	    },

	    handleBusinessRole(){
	    	var value = /^[a-zA-Z0-9_]{1,200}$|^$/.test(this.refs.businessRole.getDOMNode().value);
	    	if(value) this.ItemsPermission().actions.setBusinessRole(this.refs.businessRole.getDOMNode().value);
	    	this.setState({
	    		isStrMax : value
	    	})
	    },

	    handleCheckBoxes(){
	    	var c1, c2, c3, c4;
	    	this.setState({
	    		isForMedical : this.refs.isForMedical.getDOMNode().checked,
	    		isForMarketing: this.refs.isForMarketing.getDOMNode().checked,
	    		isForSales: this.refs.isForSales.getDOMNode().checked,
	    		everybody: this.refs.everybody.getDOMNode().checked
	    	});
	    	(this.refs.isForMedical.getDOMNode().checked) ? c1=1 : c1=0;
	    	(this.refs.isForMarketing.getDOMNode().checked) ? c2=1 : c2=0;
	    	(this.refs.isForSales.getDOMNode().checked) ? c3=1 : c3=0;
	    	(this.refs.everybody.getDOMNode().checked) ? c4=1 : c4=0;
	    	this.ItemsPermission().actions.setIsForMedical(c1);
	    	this.ItemsPermission().actions.setIsForMarketing(c2);
	    	this.ItemsPermission().actions.setIsForSales(c3);
	    	this.ItemsPermission().actions.setEverybody(c4);
	    },

	    closeEditPopup(){
	    	this.setState({
	    		display: false
	    	});
	    },

		/**
		 * Rendering method
		 */
		 render() {
		 	//Edit Popup
		 	var header = <div>Edit Item Dialog</div>
		    var body = <div className="container-table">
		    				<form name="form" noValidate>
						        <div className="row">
						        	<div className="column">Item Id : </div>
						        	<div className="column"><input value={this.state.itemId} ref="itemId" name="itemid" type="text" disabled /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Organizational Unit : </div>
						        	<ComboComponent saveData="ou" display="ou" comboData={this.state.ous} changeHandler={this.handleChangeOnComboOuPopup}/>
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
						        	<div className="column">Business Role : </div>
						        	<div className="column"><input className={(this.state.isStrMax) ? '' : 'error'} ref="businessRole" value={this.state.businessRole} onChange={this.handleBusinessRole} placeholder="Introduce a Business Role" name="inputdesc" type="text" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is For Medical : </div>
						        	<div className="column"><input ref="isForMedical" checked={this.state.isForMedical} onChange={this.handleCheckBoxes} name="inputdesc" type="checkbox" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is For Marketing : </div>
						        	<div className="column"><input ref="isForMarketing"checked={this.state.isForMarketing} onChange={this.handleCheckBoxes} name="inputdesc" type="checkbox" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Is For Sales : </div>
						        	<div className="column"><input ref="isForSales" checked={this.state.isForSales} onChange={this.handleCheckBoxes} name="inputdesc" type="checkbox" required /></div>
						        </div>
						        <div className="row">
						        	<div className="column">Everybody : </div>
						        	<div className="column"><input ref="everybody" checked={this.state.everybody} onChange={this.handleCheckBoxes} name="inputdesc" type="checkbox" required /></div>
						        </div>
						    </form>
		    			</div>
		    var footer = <div><button className="popup-button black-color" onClick={this.handleUpdateItemsPermission}>SAVE</button></div>

		    var modalProps = {
		      header: header,
		      body: body,
		      footer: footer
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
			        <button disabled={this.state.updateButtonsState ? '' : 'disabled'} className={this.state.updateButtonsState ? 'button black-color' : 'button gray-color'} onClick={this.handleEditItem}><span className="glyphicon glyphicon-pencil">Edit Item Permission</span></button>
			      </div>
			      <ModalComponent {...modalProps} display={this.state.display} update={this.closeEditPopup}/>
			    </div>
		 	)
		 }
	});

	return ButtonComponent;

}

module.exports = ButtonFactory;
