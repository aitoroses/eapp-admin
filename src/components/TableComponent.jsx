import {Table, Column} from 'fixed-data-table';
import TableCellComponent from './TableCellComponent'
class TableComponent extends React.Component {

	static propTypes = {
    data: React.PropTypes.array.isRequired,
    columnsDef: React.PropTypes.array.isRequired,
    onEnterEditMode: React.PropTypes.func.isRequired,
		onExitEditMode: React.PropTypes.func.isRequired,
    selectedRow: React.PropTypes.number,
		width: React.PropTypes.number.isRequired,
		columnsWidth: React.PropTypes.array.isRequired,
		onChange: React.PropTypes.func
	}

  getRenderer(columnDef, value, column, colData, row) {
		let isEditing = (this.props.selectedRow==row);
		let val = isEditing ? this.state.safeObject[column] : value;
    return React.addons.createFragment({
      cellData: (
        <TableCellComponent
          key={row + "-" + column}
          isEditing={isEditing}
          value={val}
					columnDef={columnDef}
					onChange={this.props.onChange}
					row={row}
        />
      ),
    })
  }

  getRenderForStepActions(value, column, colData, row){
    if(this.props.selectedRow==row){
      return React.addons.createFragment({
        cellData: <div><span onClick={this.handleSave.bind(this)} className="fa fa-floppy-o fa-2x"></span><span className="fa fa-trash fa-2x"></span><span onClick={()=>this.exitEditMode()} className="fa fa-undo fa-2x"></span></div>
      })
    }else{
      return React.addons.createFragment({
        cellData: <div><span className="fa fa-pencil-square-o fa-2x" onClick={()=>this.props.onEnterEditMode(row)}></span><span className="fa fa-trash fa-2x"></span></div>
      })
    }
  }

	handleSave() {

	}

	exitEditMode(event, index, task){
		var el = document.querySelectorAll(".row-selected")[0];
		if (el) {
			el.classList.remove("row-selected");
		}
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
			if (el) {
				el.classList.remove("row-selected");
			}
			var parent = event.currentTarget.parentNode;
			parent.classList.add("row-selected");

			// Copy the current object into State
			this.setState({
				safeObject: {...this.props.data[index]}
			})

		}


	}

	render() {
    return (
      <Table
        maxHeight={440}
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
