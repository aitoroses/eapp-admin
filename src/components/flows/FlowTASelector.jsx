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

	handleChange(item, key, list1, list2, dir) {
		debugger;
		var l1 = list1.toJS();
		var l2 = list2.toJS();
		var obj = l1.filter(function(i){if(i[key]==item){return i}});
		var pos = l1.map(function(a){return a[key];}).indexOf(parseInt(item));
		l1.splice(pos,1);
		l2.push(obj[0]);
		FlowActions.setListForFlowTas({l1, l2, dir});
	}

	render() {

		var left = {
			title: "A",
			list: store.getFlowTas().masterTas.config.validValues
		}

		var right = {
			title: 'B',
			list: store.getFlowTas().flowtas.config.validValues
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