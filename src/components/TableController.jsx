import API from 'core/API';
import TableComponent from './TableComponent';

class TableController extends React.Component {

	static propTypes = {
		table: React.PropTypes.string.isRequired
	}

	render() {
    var {store,actions} = API[this.props.table];
    return (
      <div>
        <TitleHeader tableName={store.getTableName()}></TitleHeader>
        <GenericTable store={store} actions={actions}></GenericTable>
      </div>

    )
	}
}

class TitleHeader extends React.Component {

  static propTypes = {
		tableName: React.PropTypes.string.isRequired
	}

  static styles = {
    backgroundColor: 'rgb(254, 82, 82)',
    color: 'white'
  }

  render() {
    return (
        <div style={TitleHeader.styles}>
          Manage Table: {this.props.tableName}
        </div>
    )
  }
}

class GenericTable extends React.Component {

  static propTypes = {
		store: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
	}

  render() {
    var columnsDef = this.props.store.getFields();
    return (
      <div>
        <FiltersComponent></FiltersComponent>
        <TableComponent data={[]} columnsDef={columnsDef}></TableComponent>
      </div>
    )
  }

}

class FiltersComponent extends React.Component {
  render() {
    return <div>Aquí irán los filtros</div>
  }
}

export default TableController;
