var react = require('angular/react');
var classnames = require('classnames')
import state from 'lib/app-state';
import {store, actions} from '../AppState/index';
import NewItemComponent from '../NewItemComponent/NewItemComponent';
import TableComponentData from '../../examples/TableComponent';

window.ItemsStore = store;
window.ItemsActions = actions;

class TableComponent extends React.Component {

    static propTypes = {
		items: React.PropTypes.array.isRequired,
		dataItems: React.PropTypes.array.isRequired,
        add: React.PropTypes.func,
		delete: React.PropTypes.func,
		row: React.PropTypes.func
	}


    /**
     * On mount
     */
    componentDidMount() {
      console.log("Table Component loaded successfully");
      actions.queryItems();
    }

    handleRowClick(event, index, item){
      console.log("Row seleccionada {" + item + "}");
    }

    getColumns() {
        return this.props.dataItems.map(
            function(i){
                //return Object.keys(i)[0];
                return i[Object.keys(i)[0]].displayName;
            });
    }
    getAtomic() {
        return this.props.dataItems.map(
            function(i){
                return i[Object.keys(i)[0]].atomicData;
            });
    }
    getTypeOfColumn() {
        var ret= {};
		var data = this.props.dataItems.map(function(obj){
			var keys = Object.keys(obj);
            ret[keys[0]] = obj[keys].typeOfColumn;
			//debugger;
			return ret;
		});
		//debugger;
		return data[0];
    }

    getObjectDataItems() {
        return this.props.dataItems.reduce(function(o, v, i) {
              o[i] = v;
              return o;
            }, {});
    }

    handleSearch() {
        actions.queryItemsCount();
    }

    handleAdd() {
        actions.setNewItem({id: null, name:"", description: ""});
        if(store.getClassNewItem() == "hideNewItem"){
            actions.setClassNewItem("showNewItem");
        }else{
            actions.setClassNewItem("hideNewItem");
        }
    }

    handleEdit(pos) {
        var item = store.getItems()[pos];
        actions.setNewItem({id:item.itemId, name: item.itemName, description: item.itemDescription, created: item.dateCreation, update: true});
        actions.setClassNewItem("showNewItem");
    }

    handleDelete(pos) {
        if(confirm("Are you sure?")){
            var itemId = store.getItems()[pos].itemId;
            actions.deleteItem(itemId);
            alert("Eliminated " + store.getItems()[pos].itemId);
        }
    }

    /*setClass(){
      //var shadowness = this.state.selectedRow ? 'background-color: #FFF3E0!important' : "";
      var shadowness = this.state.selectedRow ? 'shadowness' : "";
      console.log(shadowness);
      return shadowness;
    },*/

    /**
     * Rendering method
     */
    render() {
        return (
            <div>
                <div className="header-buttons-admin">
                    <div className="navigator">
                        <button className="button blue-color" onClick={this.handleAdd}><span className="glyphicon glyphicon-plus-sign">Add Item</span></button>
                        <div className={store.getClassNewItem()}>
                            <NewItemComponent />
                        </div>
                        <div className="input-group search">
                            <span>
                                <button className="btn btn-default" onClick={this.handleSearch} type="button">SEARCH</button>
                             </span>
                         </div>
                         <div className="search">
                            <input type="text" ref="search" onChange={(s)=>{actions.setSearch(s.currentTarget.value)}} value={store.getSearch()} className="form-control" placeholder="Search for..."/>
                        </div>
                    </div>
                </div>
                <div ref="itemsContainer" className="row-fluid panel panel-default ng-scope margin-for-table">
                    <div width="100%">
                      <h1 className="black-color"><span className="glyphicon glyphicon-align-left marginRight white-color icon-radius"></span>Results</h1>
                    </div>
                    <div className="margin-for-table">
                        <TableComponentData width="1000" delete={this.handleDelete.bind(this)} save={this.handleEdit.bind(this)} store={this.getObjectDataItems()} types={this.getTypeOfColumn()} flex={2} atomic={this.getAtomic()} columns={this.getColumns()} data={this.props.items} actions={true}/>
                    </div>
                </div>
            </div>)
    }


}

export default TableComponent;
