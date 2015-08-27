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