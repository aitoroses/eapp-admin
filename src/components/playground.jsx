import atom from 'lib/state';
import {actions as FlowActions} from 'actions/FlowsActions';
import {store as FlowStore} from 'stores/FlowsStore'

import FlowTASelector from 'components/flows/FlowTASelector';
import FlowsCreator from 'components/flows/FlowsCreator';
import FlowsVisualizer from 'components/flows/FlowsVisualizer';
import FlowFieldMapper from 'components/flows/FlowFieldMapper';
import FlowStepVarAssign from 'components/flows/FlowStepVarAssign';

class Playground extends atom.Component {

	componentDidMount(){
		actions.queryMasterFields();
	}

	render() {
		return (
			<div>
			<FlowTASelector />
			</div>
		)
	}
}


export default Playground;
