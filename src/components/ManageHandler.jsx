import atom from 'lib/state';
import TableController from './TableController';
import DomSize from './DomSize';

class ManageHandler extends React.Component {
	render() {
		return (
			<DomSize>
				{({width}) =>
					<TableController
						width={width - 100 /* because of CSS margins */}
						table={this.props.params.table} />
				}
			</DomSize>
		)
	}
}


export default ManageHandler;
