import FlowDescriptionFields from '../Flows/components/FlowDescriptionFields';


function getFieldFn(fields) {
	return function (name) {
		return fields.filter(f => f.config.fieldId == name)[0]
	}
}


class FlowCreatorController extends React.Component {
	
	render() {
       var flowDescriptionFields = store.getFlowDescriptionFields()
       var getField = getFieldFn(flowDescriptionFields);

		return (
			<FlowDescriptionFields 
				flowId={{}} />
		)
	}
}

export default FlowCreatorController;