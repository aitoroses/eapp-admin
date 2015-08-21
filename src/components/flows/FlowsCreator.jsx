import FlowDescriptionFields from './FlowDescriptionFields';
import FlowTASelector from './FlowTASelector';
import {store as FlowsStore} from 'stores/FlowsStore';

class FlowCreatorController extends React.Component {
	
	render() {

		let {flowId, flowName, flowDescription, itemList} = FlowsStore.getFields();

		let {masterTas, flowtas} = FlowsStore.getFlowTas();

		return (<div>
					<FlowDescriptionFields
						flowId={flowId} 
						flowName={flowName} 
						flowDescription={flowDescription} 
						itemList={itemList} />
					<FlowTASelector
						masterTas={masterTas}
						flowtas={flowtas} />
				</div>
		)
	}
}

export default FlowCreatorController;