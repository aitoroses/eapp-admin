import {Table, Column} from 'fixed-data-table';
import TableCellComponent from './TableCellComponent'
import PureComponent from 'react-pure-render/Component'

class TableComponent extends PureComponent {

	static propTypes = {
    data: React.PropTypes.array.isRequired,
    columnsDef: React.PropTypes.array.isRequired,
    onEnterEditMode: React.PropTypes.func.isRequired,
		onExitEditMode: React.PropTypes.func.isRequired,
		onCancelAddNewRow: React.PropTypes.func,
    selectedRow: React.PropTypes.number,
		newRow: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		columnsWidth: React.PropTypes.array.isRequired,
		onSave: React.PropTypes.func
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.newRow != this.props.newRow && nextProps.newRow!=null){
			//New ROW Added
			this.setState({
				safeObject: [...nextProps.data[nextProps.newRow]]
			})
			//Change Style to represent a 'new' row
			setTimeout(function(){
				let el = document.querySelectorAll(".fixedDataTableRow_rowWrapper")[1];
				if(el){
					el.classList.add("new-row-selected");
				}
			}.bind(this))
		}
	}

  getRenderer(columnDef, value, column, colData, row) {
		let isEditing = (this.props.selectedRow==row || this.props.newRow==row);
		let val = isEditing ? this.state.safeObject[column] : value;
		return <TableCellComponent
          key={row + "-" + column}
          isEditing={isEditing}
          value={val}
					columnDef={columnDef}
					onChange={this.onChange}
					row={row}
					column={column}
        />
  }

  getRenderForStepActions(value, column, colData, row){
    if(this.props.selectedRow==row){
			if(this.props.newRow==null){
				return React.addons.createFragment({
	        cellData: <div><span onClick={this.handleSave.bind(this)} className="fa fa-floppy-o fa-2x"></span><span className="fa fa-trash fa-2x"></span><span onClick={()=>this.exitEditMode()} className="fa fa-undo fa-2x"></span></div>
	      })
			} else {
				return React.addons.createFragment({
	        cellData: <div><span onClick={this.handleSave.bind(this)} className="fa fa-floppy-o fa-2x"></span><span onClick={()=>this.onCancelAddNewRow()} className="fa fa-trash fa-2x"></span></div>
	      })
			}


    }else{
      return React.addons.createFragment({
        cellData: <div><span className="fa fa-pencil-square-o fa-2x" onClick={()=>this.props.onEnterEditMode(row)}></span><span className="fa fa-trash fa-2x"></span></div>
      })
    }
  }

	handleSave() {
		this.props.onSave(this.state.safeObject, this.props.selectedRow);
	}

	onCancelAddNewRow(event, index, task) {
		var el = document.querySelectorAll(".new-row-selected")[0];
		if (el) {
			el.classList.remove("new-row-selected");
		}
		this.setState({
			safeObject: []
		})
		this.props.onCancelAddNewRow();
	}

	exitEditMode(event, index, task) {
		var el = document.querySelectorAll(".row-selected")[0];
		if (el) {
			el.classList.remove("row-selected");
		}
		this.setState({
			safeObject: []
		})
		this.props.onExitEditMode();
	}

	getColumnWidth(index){
		return this.props.columnsWidth.length > 0 ? this.props.columnsWidth[index].size || 0 : 0;
	}

	getLastColumnWidth(){
		return this.props.columnsWidth.length > 0 ? this.props.columnsWidth[(this.props.columnsWidth.length-1)].size || 0 : 0;
	}

	handleRowClick(event, index, task){
		if(event.target.className=="fa fa-pencil-square-o fa-2x") {
			var el = document.querySelectorAll(".row-selected", event.currentTarget.parentNode.parentNode)[0];
			if (el && this.props.newRow==null && this.props.selectedRow==null) {
				el.classList.remove("row-selected");
			}
			if(this.props.newRow==null && this.props.selectedRow==null) {
				var parent = event.currentTarget.parentNode;
				parent.classList.add("row-selected");

				// Copy the current object into State
				this.setState({
					safeObject: [...this.props.data[index]]
				})
			}

		}
	}

	onChange(value, key){
		let auxSafeObject = {...this.state.safeObject};
		auxSafeObject[key] = value;
		this.setState({
			safeObject: auxSafeObject
		})
	}

	render() {
    return (
      <Table
        maxHeight={540}
        width={this.props.width}
        rowsCount={this.props.data.length}
        rowHeight={50}
        headerHeight={40}
        onRowClick={this.handleRowClick}
        rowGetter={ (rowIndex) => this.props.data[rowIndex] }>
          {
            this.props.columnsDef.map( (col,index) =>
              <Column key={index} isResizable={false} cellRenderer={this.getRenderer.bind(this, col)} dataKey={index} width={this.getColumnWidth(index)} label={col.label}/>
            )
          }
          <Column dataKey={'Actions'} cellRenderer={this.getRenderForStepActions.bind(this)} width={this.getLastColumnWidth()} label="Actions"/>
      </Table>

    )
	}
}

export default TableComponent;
