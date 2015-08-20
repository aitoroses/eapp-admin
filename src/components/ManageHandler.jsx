import atom from 'lib/state';
import TableController from './TableController';

class ManageHandler extends React.Component {
	render() {
		return <TableController table={this.props.params.table}></TableController>
	}
}


export default ManageHandler;
