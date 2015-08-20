import atom from 'lib/state';
import API from 'core/API';
import tables from 'config/tables';

class ManageHandler extends React.Component {
	render() {
		return <pre> CONFIG: {JSON.stringify(tables[this.props.params.table], null, 4)}</pre>
	}
}


export default ManageHandler;
