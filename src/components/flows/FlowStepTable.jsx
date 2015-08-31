import {actions as FlowActions} from 'actions/FlowsActions';
import {store as FlowStore} from 'stores/FlowsStore'
import TableComponent from 'components/TableComponent';

import tables from 'config/tables';
import {getNew, toObject, toArray} from 'config/tables';
import swal from 'sweetalert';

const PropTypes = React.PropTypes;

class FlowStepTable extends React.Component {

	static propTypes = {
		masterFields: PropTypes.object,
		flowfields: PropTypes.object,
		flowfieldsCategories: PropTypes.object
	}

	componentDidMount(){
		//actions.querySteps();
	}

	state = {
		selectedRow: null,
		newRow: null
	}

	calculateColumnsWidth(width, columnsDef) {
	    var columnCount =  columnsDef.length +1;
	    var singleColumn = (width)/columnCount;
	    var singlePercentage = (singleColumn/width)*100;
	    var withoutLastColumnWidth = (columnCount-1)*singleColumn;
	    var lastCol = width - withoutLastColumnWidth;
	    var lastPercentage = (lastCol/width)*100;
	    var columnArray =[];
	    for(var i=0;i<columnCount;i++) {
	      if(i==(columnCount-1)) columnArray.push({size: lastCol, percentage: lastPercentage})
	      else columnArray.push({size: singleColumn, percentage: singlePercentage});
	  	}
			return columnArray;
	}

	onEnterEditMode(row) {
		if(this.state.selectedRow!=null || this.state.newRow!=null) {
				swal('','You are already editing a row. Please save or discard changes.');
		} else {
	    this.setState({
	      selectedRow: row
	    });
		}
  	}

  	onExitEditMode() {
	    this.setState({
	      selectedRow: null
	    });
	}

	onCancelAddNewRow() {
		console.log("cancel");
		actions.cancelNew();
		setTimeout(function(){
			this.setState({
				selectedRow: null,
				newRow:null
			})}.bind(this))
	}

	onSave(arrayValue, row) {
		console.log("saving");
		let config = tables["steps"];
		let newObject = toObject.call(config, arrayValue);
		let action = {
			index: row,
			payload: newObject
		}
		actions.update(action);
		setTimeout(function(){
			this.setState({
				selectedRow: null,
				newRow: null
		})}.bind(this))
	}

	onCreate(arrayValue, row) {
		console.log("creating");
		let config = tables["steps"];
		let newObject = toObject.call(config, arrayValue);
		let action = {
			index: row,
			payload: newObject
		}
		actions.create(action);
		setTimeout(function(){
			this.setState({
				selectedRow: null,
				newRow: null
		})}.bind(this))
	}

	onAddNewRow(){
		if(this.state.selectedRow!=null || this.state.newRow!=null) {
				swal('','You are already editing a row. Please save or discard changes.');
		} else {
			let config = tables["steps"];
			let newObj = getNew.call(config);
			var id = Math.round(Math.random()*100);
			newObj.stepId = id;
			newObj.organizationalUnit = "REQUEST";
			newObj.stepType = "REV"
			actions.addNew(newObj);
			setTimeout(function(){
				this.setState({
		      newRow:0,
					selectedRow: 0
	    	})}.bind(this))
		}
	}

	getTransformedData(config, data){
		return toArray.call(config, data);
	}

	render() {
		var t = tables["steps"];
		var columnsDef = t.fields;
		var data = store.getSteps().steps;
		var p_data = this.getTransformedData(t, data)
		let width = 1000;
		let columnsWidth = this.calculateColumnsWidth(1000, columnsDef);
		let perPage = 10;

		return (
			<div>
				<button onClick={this.onAddNewRow}>Add Step</button>
				<TableComponent
					columnsWidth={columnsWidth}
					width={width}
					data={p_data}
					columnsDef={columnsDef}
					newRow={this.state.newRow}
					selectedRow={this.state.selectedRow}
					onEnterEditMode={this.onEnterEditMode}
					onExitEditMode={this.onExitEditMode}
					onCancelAddNewRow={this.onCancelAddNewRow}
					onSave={this.onSave}
					onCreate={this.onCreate}
					perPage={perPage}>
				</TableComponent>
			</div>
		)
	}
}

export default FlowStepTable;