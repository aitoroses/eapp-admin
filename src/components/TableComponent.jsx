import {Table, Column} from 'fixed-data-table';
import TableCellComponent from './TableCellComponent'
class TableComponent extends React.Component {

	static propTypes = {
    data: React.PropTypes.array.isRequired,
    columnsDef: React.PropTypes.array.isRequired,
    onEnterEditMode: React.PropTypes.func.isRequired,
    selectedRow: React.PropTypes.number.isRequired
	}

  getRenderer(value, column, colData, row) {
    return React.addons.createFragment({
      cellData: (
        <TableCellComponent
          key={row + "-" + column}
          isEditing={this.props.selectedRow==row}
          value={value}
        />
      ),
    })
  }

  getRenderForStepActions(value, column, colData, row){
    if(this.props.selectedRow==row){
      return React.addons.createFragment({
        cellData: <div><span className="fa fa-floppy-o"></span><span className="fa fa-trash"></span></div>
      })
    }else{
      return React.addons.createFragment({
        cellData: <div><span className="fa fa-pencil-square-o" onClick={()=>this.props.onEnterEditMode(row)}></span><span className="fa fa-trash"></span></div>
      })
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
        onRowClick={function(){console.log("Fila clicada")}}
        rowGetter={ (rowIndex) => this.props.data[rowIndex] }>
          {
            this.props.columnsDef.map( (col,index) =>
              <Column key={index} isResizable={false} cellRenderer={this.getRenderer} dataKey={index} width={100} label={col.label}/>
            )
          }
          <Column dataKey={'Actions'} cellRenderer={this.getRenderForStepActions.bind(this)} width={100} label="Actions"/>
      </Table>

    )
	}
}

export default TableComponent;
