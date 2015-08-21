import {actions as FlowActions} from 'actions/FlowsActions';
import {store as FlowsStore} from 'stores/FlowsStore';
import {decorate as Mixin} from 'react-mixin';

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

function ScrollMixinFactory(scrollTargetRef) {
	var ScrollMixin = {

        getScrollTarget() {
        	return React.findDOMNode(this.refs[scrollTargetRef]);
        },

		componentDidMount () {

			// Listener
			var node = this.getScrollTarget()
			var $node = $(node);
			if (this.props.onScroll) {
				$node.on('scroll', () => {
					var value = $node.scrollTop()
					this.props.onScroll(value)
				})
			}

			// Set scroll
			var setScroll = () => {
				var scroll = this.props.scrollTop || 0;
				$node.scrollTop(scroll);
			}

			var id = setInterval(() => {
				var hasChildren = $node.children().length > 0;
				if (!hasChildren) {
					return
				} else {
					setScroll()
					clearInterval(id);
				}
			}, 200)
			
		},

		componentDidUpdate() {
			var node = this.getScrollTarget()
			var $node = $(node);
			var scroll = this.props.scrollTop;
			if (!scroll) return
			if ($node.scrollTop != scroll) {
				$node.scrollTop(scroll);
			}
		},

		componentWillUnmount() {
			var node = this.getScrollTarget()
			var $node = $(node);
			$node.unbind();
		}
	}
	return ScrollMixin;
}



class DualBox extends React.Component {

	changeList = (item, key, list1, list2) => {
		if(item){
			var obj = list1.filter(function(i){if(i[key]==item){return i}});
			var pos = list1.map(function(a){return a[key];}).indexOf(parseInt(item));
			list1.splice(pos,1);
			list2.push(obj[0]);
			this.handleChange(null);
		}
	}

	static propTypes = {
		left: PropTypes.object.isRequired,
		right: PropTypes.object.isRequired,
		labelField: PropTypes.string.isRequired,
		valueField: PropTypes.string.isRequired
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
				<button className="button blue-color" onClick={() => this.changeList(this.state.i, this.props.valueField, this.props.right.list, this.props.left.list)}><i className="fa fa-chevron-left"></i></button>
				<button className="button blue-color" onClick={() => this.changeList(this.state.i, this.props.valueField, this.props.left.list, this.props.right.list)}><i className="fa fa-chevron-right"></i></button>
				<Box label={this.props.right.title}
					options={this.props.right.list}
					labelField={this.props.labelField}
					valueField={this.props.valueField}
					onChange={this.handleChange.bind(this)} />
			</div>
		)
	}

}

@Mixin(ScrollMixinFactory('scrollTarget'))
class Box extends React.Component {

	static propTypes = {
		label: PropTypes.string,
		options: PropTypes.array.isRequired,
		labelField: PropTypes.string.isRequired,
		valueField: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired
	}

	constructor(props) {
		super(props);
	}

	handleChange(e) {
		this.props.onChange(e.target.value);
	}

	renderInput() {

		if(this.props.options.length>0){
			var self = this;
			var optionNodes = this.props.options.map(function(option){
				return <option key={option[self.props.valueField]} value={option[self.props.valueField]}>{option[self.props.labelField]}</option>
			})
		}

		var selectStyle = {width: 300};

		return <select ref="scrollTarget" onChange={this.handleChange.bind(this)} size="8" style={selectStyle}>{optionNodes}</select>
	}

	render() {

		var labelStyle = {'marginLeft': '75px'};

		var divStyle = {display: 'table-caption', overflow: 'auto'};

		return (
			<div style={divStyle}>
				<label style={labelStyle}>{this.props.label}</label>
				{this.renderInput()}
			</div>
		)
	}

}

export default FlowTASelector;