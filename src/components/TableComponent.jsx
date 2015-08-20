import {Table, Column} from 'fixed-data-table';

class TableComponent extends React.Component {

	static propTypes = {
    data: React.PropTypes.array.isRequired,
    columnsDef: React.PropTypes.array.isRequired
	}


	render() {

    return (
      <Table
        maxHeight={440}
        width={800}
        rowsCount={this.props.data.length}
        rowHeight={50}
        headerHeight={40}
        onRowClick={function(){console.log("Fila clicada")}}
        rowGetter={ (rowIndex) => this.props.data[rowIndex] }>
          {
            this.props.columnsDef.map( (col,index) =>
              <Column key={index} isResizable={false} cellRenderer={ value => value} dataKey={col.label} width={100} label={col.label}/>
            )
          }
      </Table>

    )
	}
}

export default TableComponent;
