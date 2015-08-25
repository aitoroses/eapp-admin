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
	}

	handleChange(item, key, list1, list2, dir) {
		var obj = list1.filter(function(i){if(i[key]==item){return i}});
		var pos = list1.map(function(a){return a[key];}).indexOf(parseInt(item));
		list1.splice(pos,1);
		list2.push(obj[0]);
		debugger;
		FlowActions.setListForFlowTas({list1, list2, dir});
	}

	render() {

		var left = {
			title: "A",
			list: store.getMasterFields()
		}

		var right = {
			title: 'B',
			list: store.getFlowFields().flowfields
		}

		return (
			<ExtendedDualBox left={left}
			right={right}
			labelField="fieldDisplayName"
			valueField="fieldId"
			callback={this.handleChange}/>
		)
	}

}

export default FlowFieldMapper;