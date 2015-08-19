class Flipper extends React.Component {
	static propTypes = {
		cond: React.PropTypes.bool.isRequired,
		left: React.PropTypes.object.isRequired,
		right: React.PropTypes.object.isRequired
	}
	render() {
		if (this.props.cond) {
			return this.props.right
		} else {
			return this.props.left
		}
	}
}

class Scrollable extends React.Component {
	static propTypes = {
		data: React.PropTypes.array,
		f: React.PropTypes.func,
		err: React.PropTypes.bool,
		text: React.PropTypes.string,
		type: React.PropTypes.string.isRequired,
		placeholder: React.PropTypes.string,
		storage: React.object,
		g: React.PropTypes.func
	}

	constructor(props) {
		super(props);
		this.change = this.change.bind(this);
	}

	change(){
		var updated = this.props.storage.set({"error":!this.props.f(event.target.value),"value":event.target.value});
		if(this.props.g) this.props.g(event.target.value);
	}

	render(){

		var isEditable = this.props.type == "input";

		var text = (
			<div>
				{this.props.text}
				{this.props.data}
			</div>
		)

		var input = (
			<div>
				{this.props.text}
				<input placeholder={this.props.placeholder} className={this.props.err ? 'error' :''} type="text" onChange={this.change}/>
			</div>
		)

		return <Flipper cond={isEditable} left={text} right={input} />
	}

}

export default Scrollable;