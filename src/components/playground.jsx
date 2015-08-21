import atom from 'lib/state';
import {actions as FlowActions} from 'actions/FlowsActions';

import FlowTASelector from 'components/flows/FlowTASelector';
import FlowsCreator from 'components/flows/FlowsCreator';

class Playground extends atom.Component {

	render() {
		return <FlowTASelector />
	}
}


export default Playground;

