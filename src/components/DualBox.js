import Box from 'components/Box';

const PropTypes = React.PropTypes;

class DualBox extends React.Component {

	changeList = (item, list1, list2) => {
		if(item && list1.indexOf(item)>-1){
			this.props.callback(item, list1, list2);
			this.setState({targetItem: null});
		}
	}

	static propTypes = {
		left: PropTypes.object.isRequired,
		right: PropTypes.object.isRequired,
		labelField: PropTypes.string.isRequired,
		valueField: PropTypes.string.isRequired,
		callback: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);

		this.state = {
			targetItem: null
		}
	}

	handleChange(targetItem) {
		this.setState({targetItem});
	}

	render() {

		return (
			<div>
				<Box label={this.props.left.title}
					options={this.props.left.list}
					labelField={this.props.labelField}
					valueField={this.props.valueField}
					onChange={this.handleChange.bind(this)} />
				<button className="button blue-color" onClick={() => this.changeList(this.state.targetItem, this.props.right.list, this.props.left.list)}><i className="fa fa-chevron-left"></i></button>
				<button className="button blue-color" onClick={() => this.changeList(this.state.targetItem, this.props.left.list, this.props.right.list)}><i className="fa fa-chevron-right"></i></button>
				<Box label={this.props.right.title}
					options={this.props.right.list}
					labelField={this.props.labelField}
					valueField={this.props.valueField}
					onChange={this.handleChange.bind(this)} />
			</div>
		)
	}

}

export default DualBox;