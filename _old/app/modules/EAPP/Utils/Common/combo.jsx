class Combo extends React.Component {
	static propTypes = {
		comboData: React.PropTypes.array.isRequired,
		saveData: React.PropTypes.string.isRequired,
		display: React.PropTypes.string.isRequired,
		comboText: React.PropTypes.string,
		changeHandler: React.PropTypes.object,
		multiple: React.PropTypes.bool,
		keyData: React.PropTypes.string,
		width: React.PropTypes.number
	}

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(){
		var keyData = this.props.keyData;
  		var filtered = this.props.changeHandler.set({[keyData]:event.target.value});
	}

	render() {
		var selectStyle = {width: this.props.width, overflow: 'auto'};
		if(this.props.comboData==undefined) return (<span></span>)
    	var self = this;
		if(this.props.comboData!=null){
			var optionNodes = this.props.comboData.map(function(option){
				if(option.hasOwnProperty(self.props.display)){
			    	return <option key={option[self.props.saveData]} value={option[self.props.saveData]}>{option[self.props.display].substring(0,80)}</option>;
			  	}
			});
		}
		return (
			<div className="comboOption">
				<label>{this.props.comboText}</label>
				<select style={selectStyle} ref="combo" onChange={this.handleChange} size={(this.props.multiple) ? 8 : 1}>
					{optionNodes}
				</select>
			</div>
		)
	}

}

export default Combo;