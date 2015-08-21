import {Table, Column} from 'fixed-data-table';
import TableCellComponent from './TableCellComponent'
class TableComponent extends React.Component {

	static propTypes = {
    data: React.PropTypes.array.isRequired,
    columnsDef: React.PropTypes.array.isRequired,
    onEnterEditMode: React.PropTypes.func.isRequired,
    selectedRow: React.PropTypes.number
	}

  getRenderer(columnDef, value, column, colData, row) {
    return React.addons.createFragment({
      cellData: (
        <TableCellComponent
          key={row + "-" + column}
          isEditing={this.props.selectedRow==row}
          value={value}
					columnDef={columnDef}
        />
      ),
    })
  }

  getRenderForStepActions(value, column, colData, row){
    if(this.props.selectedRow==row){
      return React.addons.createFragment({
        cellData: <div><span className="fa fa-floppy-o fa-2x"></span><span className="fa fa-trash fa-2x"></span></div>
      })
    }else{
      return React.addons.createFragment({
        cellData: <div><span className="fa fa-pencil-square-o fa-2x" onClick={()=>this.props.onEnterEditMode(row)}></span><span className="fa fa-trash fa-2x"></span></div>
      })
    }

  }

	handleRowClick(event, index, task){
		if(event.target.className=="fa fa-pencil-square-o fa-2x") {
			$('.row-selected',event.currentTarget.parentNode.parentNode).removeClass('row-selected');
			$(event.currentTarget.parentNode).addClass("row-selected");
		}
	}

	render() {

    return (
      <Table
        maxHeight={440}
        width={1400}
        rowsCount={this.props.data.length}
        rowHeight={50}
        headerHeight={40}
        onRowClick={this.handleRowClick}
        rowGetter={ (rowIndex) => this.props.data[rowIndex] }>
          {
            this.props.columnsDef.map( (col,index) =>
              <Column key={index} isResizable={false} cellRenderer={this.getRenderer.bind(this, col)} dataKey={index} width={100} label={col.label}/>
            )
          }
          <Column dataKey={'Actions'} cellRenderer={this.getRenderForStepActions.bind(this)} width={100} label="Actions"/>
      </Table>

    )
	}
}

export default TableComponent;
