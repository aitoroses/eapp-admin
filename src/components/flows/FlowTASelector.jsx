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
			valueField="taId" />
		)
	}

}

export default FlowTASelector;