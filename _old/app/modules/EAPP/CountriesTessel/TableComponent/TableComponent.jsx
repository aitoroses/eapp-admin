var react = require('angular/react');
var classnames = require('classnames')
import state from 'lib/app-state';
import {store, actions} from '../AppState/index';
import NewItemComponent from '../NewCountryComponent/NewCountryComponent';
import TableComponentData from '../../examples/TableComponent';

window.CountryStore = store;
window.CountryActions = actions;

class TableComponent extends React.Component {

    static propTypes = {
		countries: React.PropTypes.array.isRequired,
		dataCountries: React.PropTypes.array.isRequired,
        add: React.PropTypes.func,
		delete: React.PropTypes.func,
		row: React.PropTypes.func
	}


    /**
     * On mount
     */
    componentDidMount() {
      console.log("Table Component loaded successfully");
      actions.queryCountries();
    }

    handleRowClick(event, index, countries){
      console.log("Row seleccionada {" + countries + "}");
    }

    getColumns() {
        return this.props.dataCountries.map(
            function(i){
                //return Object.keys(i)[0];
                return i[Object.keys(i)[0]].displayName;
            });
    }
    getAtomic() {
        return this.props.dataCountries.map(
            function(i){
                return i[Object.keys(i)[0]].atomicData;
            });
    }
    getTypeOfColumn() {
        var ret= {};
		var data = this.props.dataCountries.map(function(obj){
			var keys = Object.keys(obj);
            ret[keys[0]] = obj[keys].typeOfColumn;
			//debugger;
			return ret;
		});
		//debugger;
		return data[0];
    }

    getObjectDataCountries() {
        return this.props.dataCountries.reduce(function(o, v, i) {
              o[i] = v;
              return o;
            }, {});
    }

    handleSearch() {
        actions.queryCountriesCount();
    }

    handleAdd() {
        actions.setNewCountry({id: null, name:"", code: ""});
        if(store.getClassNewCountry() == "hideNewCountry"){
            actions.setClassNewCountry("showNewCountry");
        }else{
            actions.setClassNewCountry("hideNewCountry");
        }
    }

    handleEdit(pos) {
        var countries = store.getCountries()[pos];
        actions.setNewCountry({id:countries.countryId, name: countries.countryName, code: countries.countryCode, created: countries.dateCreation, update: true});
        actions.setClassNewCountry("showNewCountry");
    }

    handleDelete(pos) {
        if(confirm("Are you sure?")){
            var countryId = store.getCountries()[pos].countryId;
            actions.deleteCountry(countryId);
            alert("Eliminated " + store.getCountries()[pos].countryId);
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
                        <button className="button blue-color" onClick={this.handleAdd}><span className="glyphicon glyphicon-plus-sign">Add Country</span></button>
                        <div className={store.getClassNewCountry()}>
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
                        <TableComponentData width="1000" delete={this.handleDelete.bind(this)} save={this.handleEdit.bind(this)} store={this.getObjectDataCountries()} types={this.getTypeOfColumn()} flex={2} atomic={this.getAtomic()} columns={this.getColumns()} data={this.props.countries} actions={true}/>
                    </div>
                </div>
            </div>)
    }


}

export default TableComponent;
