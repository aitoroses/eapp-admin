import API from 'core/API';


class TableController extends React.Component {

	static propTypes = {
		table: React.PropTypes.string.isRequired
	}

	render() {
    var {store,actions} = API[this.props.table];
    return (
      <div>
        <h1>{store.getTableName()}</h1>
        <GenericTable store={store} actions={actions}></GenericTable>
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
    return <pre>{JSON.stringify(this.props.store.getFields(), null, 2)}</pre>
  }

}

export default TableController;
