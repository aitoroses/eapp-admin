import Box from 'components/Box';

const PropTypes = React.PropTypes;

class DualBox extends React.Component {

	changeList = (item, key, list1, list2, dir) => {
		if(item){
			/*var l1 = list1.toJS();
			var l2 = list2.toJS();
			var obj = l1.filter(function(i){if(i[key]==item){return i}});
			var pos = l1.map(function(a){return a[key];}).indexOf(parseInt(item));
			l1.splice(pos,1);
			l2.push(obj[0]);
			this.props.callback(l1, l2, dir);*/
			this.props.callback(item, key, list1, list2, dir);
			this.handleChange(null);
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
			i: null
		}
	}

	handleChange(i) {
		this.setState({i});
	}

	render() {

		return (
			<div>
				<Box label={this.props.left.title}
					options={this.props.left.list}
					labelField={this.props.labelField}
					valueField={this.props.valueField}
					onChange={this.handleChange.bind(this)} />
				<button className="button blue-color" onClick={() => this.changeList(this.state.i, this.props.valueField, this.props.right.list, this.props.left.list, "left")}><i className="fa fa-chevron-left"></i></button>
				<button className="button blue-color" onClick={() => this.changeList(this.state.i, this.props.valueField, this.props.left.list, this.props.right.list, "right")}><i className="fa fa-chevron-right"></i></button>
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