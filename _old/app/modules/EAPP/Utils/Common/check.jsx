class Check extends React.Component {
	static propTypes = {
		selected: React.PropTypes.bool.isRequired,
		editable: React.PropTypes.bool.isRequired,
		f: React.PropTypes.func,
		storage: React.object
	}

	constructor(props) {
		super(props);
	}

	change = (event) => {
		var updated = this.props.storage.set({"value":event.target.checked});
		//this.props.f(event.target.value);
	}

	render(){
		var result;
		if(!this.props.editable){
			result = (<input checked={this.props.selected} name="input" type="checkbox" disabled />)
		}else{
			result = (<input checked={this.props.selected} onClick={this.change} name="input" type="checkbox"/>)
		}
		return result;
	}

}

export default Check;