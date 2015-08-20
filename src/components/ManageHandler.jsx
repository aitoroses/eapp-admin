import atom from 'lib/state';
import API from 'core/API';
import {items,disclaimers,countries,itemsPermssion,tas} from 'config/tables';

class ManageHandler extends React.Component {
	render() {
		return <div>{JSON.stringify(this.props)} CONFIG: {JSON.stringify(items)}</div>
	}
}


export default ManageHandler;
