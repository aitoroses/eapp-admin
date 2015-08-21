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
        <AdminToolHeader>{store.getTableName() + " Table Administration"}</AdminToolHeader>
        <GenericTable store={store} actions={actions}></GenericTable>
      </div>

    )
	}
}

class AdminToolHeader extends React.Component {
  render() {
    return (
      <div className="title-margin">
        <div className="title-center panel-body">
          <div>Admin Tool</div>
          <div className="color_grey">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

class GenericTable extends React.Component {

  static propTypes = {
		store: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
	}

  state = {
    selectedRow:-1
  }

  onEnterEditMode(row) {
    this.setState({
      selectedRow: row
    });
    console.log('Entrando a modo edicion')
  }

  render() {
    var columnsDef = this.props.store.getFields();
    var data = [['a','b','c','d','e','f','g','h'], ['a','b','c','d','e','f','g','h'], ['a','b','c','d','e','f','g','h']];
    return (
      <div>
        <FiltersComponent></FiltersComponent>
        <TableComponent data={data} columnsDef={columnsDef} selectedRow={this.state.selectedRow} onEnterEditMode={this.onEnterEditMode}></TableComponent>
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
