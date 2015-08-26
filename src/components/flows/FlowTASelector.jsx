import {actions as FlowActions} from 'actions/FlowsActions';
import {store as FlowsStore} from 'stores/FlowsStore';
import DualBox from 'components/DualBox';

const PropTypes = React.PropTypes;

class FlowTASelector extends React.Component {

	static propTypes = {
		masterTas: PropTypes.object,
		flowtas: PropTypes.object
	}

	constructor(props) {
		super(props);
		FlowActions.queryTas();
	}

	handleChange(item, list1, list2) {
		debugger;
		let index = list1.indexOf(item);
		let l1 = [
			...list1.slice(0, index),
			...list1.slice(index+1, list1.length-1)
		];
		let l2 = [...list2, list1[index]];
		FlowActions.setListForFlowTas([l1, l2]);
	}

	render() {

		var left = {
			title: "A",
			list: store.getFlowTas().masterTas.list
		}

		var right = {
			title: 'B',
			list: store.getFlowTas().flowtas.list
		}

		return (
			<DualBox left={left}
			right={right}
			labelField="taName"
			valueField="taId" 
			callback={this.handleChange}/>
		)
	}

}

export default FlowTASelector;