import atom from 'lib/state';
import API from 'core/API';
import tables from 'config/tables';

class ManageHandler extends React.Component {
	render() {
		return <div> CONFIG: {JSON.stringify(tables[this.props.params.table])}</div>
	}
}


export default ManageHandler;
