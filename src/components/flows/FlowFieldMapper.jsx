import {actions as FlowActions} from 'actions/FlowsActions';
import ExtendedDualBox from 'components/ExtendedDualBox';

const PropTypes = React.PropTypes;

class FlowFieldMapper extends React.Component {

	static propTypes = {
		masterFields: PropTypes.object,
		flowfields: PropTypes.object,
		flowfieldsCategories: PropTypes.object
	}

	constructor(props) {
		super(props);
		FlowActions.queryMasterFields();
	}

	handleChange(item, list1, list2) {
		var swapped = false;

		let index = list1.indexOf(item);

		// Swap lists
		if(index==-1){
			index = list2.indexOf(item);
			let aux = list1;
			list1 = list2;
			list2 = aux;
			swapped = true;
		}

		let l1 = [
			...list1.slice(0, index),
			...list1.slice(index+1, list1.length)
		];
		let l2 = [...list2, list1[index]];

		// Return list to initial state before being swapped
		if(swapped) {
			let aux = l1;
			l1 = l2;
			l2 = aux;
		}

		FlowActions.setListForFlowFields([l1, l2]);
	}

	render() {

		var left = {
			list: store.getMasterFields()
		}

		var right = {
			list: store.getFlowFieldsAssign()
		}

		return (
			<ExtendedDualBox left={left.list}
			right={right.list}
			labelField="fieldDisplayName"
			valueField="fieldId"
			callback={this.handleChange}/>
		)
	}

}

export default FlowFieldMapper;