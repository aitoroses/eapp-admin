import state from 'lib/app-state';
//import {actions as Factions, store as Fstore} from 'EAPP/Stores/flows-tessel';
//import {store as FlowsStore, actions as FlowsActions} from 'EAPP/Stores/flows-tessel';
//window.FlowsStore = FlowsStore;
//window.FlowsActions = FlowsActions;

//import tessel from 'EAPP/Stores/app-state';
import Scrollable from 'EAPP/Utils/Common/Scrollable';
import Check from 'EAPP/Utils/Common/Check';
import Combo from 'EAPP/Utils/Common/Combo';

var Table = FixedDataTable.Table;
var Column = FixedDataTable.Column;

class TableComponent extends React.Component {

  static propTypes = {
    data: React.PropTypes.array.isRequired,
    columns: React.PropTypes.array.isRequired,
    atomic: React.PropTypes.array.isRequired,
    flex: React.PropTypes.number.isRequired,
    types: React.PropTypes.object.isRequired,
    edit: React.PropTypes.number,
    fCheck: React.PropTypes.func,
    delete: React.PropTypes.func,
    save: React.PropTypes.func,
    store: React.PropTypes.object.isRequired,
    actions: React.PropTypes.bool,
    width: React.PropTypes.number.isRequired,
    headerHeight: React.PropTypes.number,
    rowHeight: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
    rowClickFunction: React.PropTypes.func
  }

  changeCheck = (event) => {
    if(event.target.checked) this.props.fCheck(2);
  }

  getRenderer(value, column, colData, row){
    //debugger;
    var f;
    var e;
    var p;
    var storage;
    for (var i = 0; i < this.props.store.length; i++) {
      if(this.props.store[i].hasOwnProperty(column)){
        f=this.props.store[i][column].validation;
        e=this.props.store[i][column].error;
        p=this.props.store[i][column].placeholder;
        storage=this.props.store[i][column];
      }
    };
    if(this.props.edit==row || ((storage) ? ((storage.force) ? storage.force : false) : false)){
      if(this.props.types[column]=="input"){
        return React.addons.createFragment({
          cellData: <div><Scrollable placeholder={p} type="input" err={e} f={f} storage={storage}/></div>
        })
      }else if(this.props.types[column]=="combo"){
        //debugger;
        var a;
        var all = this.props.store;
        for (var i = 0; i < all.length; i++) {
          if(all[i].hasOwnProperty(column)){
            a = all[i][column].combo;
          }
        };
        return React.addons.createFragment({
          cellData: <div><Combo saveData={a.saveData} display={a.display} comboData={a.data} keyData={a.keyData} changeHandler={storage}/></div>
        })
      }else if(this.props.types[column]=="checkbox"){
        var a;
        var all = this.props.store;
        for (var i = 0; i < all.length; i++) {
          if(all[i].hasOwnProperty(column)){
            a = all[i][column];
          }
        };
        return React.addons.createFragment({
          cellData: <div><Check selected={a.value} editable={a.checkbox.editable} f={a.checkbox.validation} storage={storage}/></div>
        })
      }else{
        return React.addons.createFragment({
          cellData: <div>value</div>
        })
      }
    }else{
      //debugger;
      if(value==undefined && colData.length!=undefined){
        var array;
        array = colData.map(function(a){
          var v = (a[column.toString()]!=undefined) ? a[column.toString()].toString() : "";
          return v;
        });
        var temp=[];
        for(let i of array)
          i && temp.push(i);
        array=temp;
      }
      //debugger;
      //console.log(array);
      //debugger;
      //delete temp;
      //array=array.join('').split('');
      //debugger;
      return React.addons.createFragment({
        cellData: <div>{value}{(array!=undefined) ? array[0]:""}</div>
      })
    }
  }

  transform(data){
    if(data){
      var arr = [];
      var tmp = {};
      var keys = Object.keys(data);
      keys.forEach(function(element,index,array){
        tmp[element] = data[element];
        arr.push(tmp);
        tmp={};
      });
      debugger;
      return arr;
    }
  }

  print = (row) => {
    this.props.delete(row);
  }

  getRenderForStepActions(value, column, colData, row){
    if(this.props.edit==row){
      return React.addons.createFragment({
        cellData: <div><span className="glyphicon glyphicon-floppy-disk" onClick={()=>this.props.save()}></span><span className="glyphicon glyphicon-trash" onClick={()=>this.print(row)}></span></div>
      })
    }else{
      return React.addons.createFragment({
        cellData: <div><span className="glyphicon glyphicon-edit" onClick={()=>this.props.save(row)}></span><span className="glyphicon glyphicon-trash" onClick={()=>this.print(row)}></span></div>
      })
    }
    
  }

	render(){
    if(this.props.data==undefined) return (<span></span>)
		return (<Table
              maxHeight={(this.props.maxHeight) ? this.props.maxHeight : 440}
              width={this.props.width}
              rowsCount={this.props.data.length}
              rowHeight={(this.props.rowHeight) ? this.props.rowHeight : 50}
              headerHeight={(this.props.headerHeight) ? this.props.headerHeight : 40}
              onRowClick={(this.props.rowClickFunction) ? this.props.rowClickFunction : function(){console.log("Fila clicada");}}
              rowGetter={ (rowIndex) => this.props.data[rowIndex] }>
                {
                  this.props.columns.map( (col,index) =>
                    <Column isResizable={false} cellRenderer={(value, column, colData, row)=>this.getRenderer(value, column, colData, row)} dataKey={this.props.atomic[index]} width={100} flexGrow={(this.props.flex==index) ? 1:0} label={this.props.columns[index]}/>
                  )
                }
                {(this.props.actions) ? <Column isResizable={false} cellRenderer={this.getRenderForStepActions.bind(this)} width={100} label="Actions"/> : <Column isResizable={false} width={0}/>}
            </Table>)
	}
}

export default TableComponent;
