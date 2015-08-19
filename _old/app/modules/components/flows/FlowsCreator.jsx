import FlowDescriptionFields from './FlowDescriptionFields';
import {store as FlowsStore} from 'stores/FlowsStore';

class FlowCreatorController extends React.Component {
	
	render() {

		let {flowId, flowName, flowDescription, itemList} = FlowsStore.getFields();

		return (
			<FlowDescriptionFields
				flowId={flowId} 
				flowName={flowName} 
				flowDescription={flowDescription} 
				itemList={itemList} />
		)
	}
}

export default FlowCreatorController;