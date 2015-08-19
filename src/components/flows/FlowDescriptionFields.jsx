import {validate} from 'lib/validations';
import {actions as FlowActions} from 'actions/FlowsActions';
import {store as FlowsStore} from 'stores/FlowsStore';
import shallowEqual from 'react-pure-render/shallowEqual';
const PropTypes = React.PropTypes

/*function wrapAsync(cb) {
	setTimeout(cb, Math.random() * 50);
}*/

class FlowDescriptionFields extends React.Component {

	static propTypes = {
		flowId: PropTypes.object.isRequired,
		flowName: PropTypes.object.isRequired,
		flowDescription: PropTypes.object.isRequired,
		itemList: PropTypes.object.isRequired
	}

	handleChange(value, fieldId) {
		FlowActions.setFieldRuntimeValue({'value': value, 'fieldId': fieldId});
		//FlowActions.setFieldRuntime({'value': value, 'fieldId': fieldId});
	}

	handleValidate(error, fieldId) {
		FlowActions.setFieldRuntimeError({'error': error, 'fieldId': fieldId});
		//FlowActions.setFieldRuntime({'error': error, value: this.props[fieldId].runtime.value, 'fieldId': fieldId});
	}

	render() {

		let handleChange = this.handleChange.bind(this);
		let handleValidate = this.handleValidate.bind(this);

		return (
			<div>
				<FlowDescriptionInput {...this.props.flowId} onChange={handleChange} onValidate={handleValidate}/>
				<FlowDescriptionInput {...this.props.flowName} onChange={handleChange} onValidate={handleValidate}/>
				<FlowDescriptionInput {...this.props.flowDescription} onChange={handleChange} onValidate={handleValidate}/>
				<FlowDescriptionCombo {...this.props.itemList} onChange={handleChange} onValidate={handleValidate}/>
			</div>
		)
	}
}

class ControlledValueComponent extends React.Component {
	constructor(props) {
		super()

        this.state =  {
			value: props.runtime.value
		}

	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.runtime !== this.props.runtime) {
			this.setState({
				value: nextProps.runtime.value,
			})
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			!shallowEqual(nextProps, this.props) || !shallowEqual(nextState, this.state)
		)
	}


	handleChange(value) {
		this.setState({value});
	}
}

class FlowDescriptionInput extends ControlledValueComponent {

	static propTypes = {
		runtime: PropTypes.object.isRequired,
		config: PropTypes.object.isRequired,
		onChange: PropTypes.func,
		onValidate: PropTypes.func

	}

	constructor(props) {
		super(props);

		if (props.onValidate) {
			props.onValidate(validate(props.runtime.value, props.config.validations), props.config.fieldId);
		}
	}

	componentWillReceiveProps(props) {

		super.componentWillReceiveProps(props)

		if (this.props.onValidate) {
			this.props.onValidate(validate(props.runtime.value, props.config.validations), props.config.fieldId);
		}
	}

	handleChange(event) {

		var input = event.target.value;

		if(this.props.config.type=="number") input = parseInt(input);

		var errors = validate(input, this.props.config.validations);

		// Update local state
		super.handleChange(input)

		//if (this.props.onChange && errors.valid) {
		if (this.props.onChange) {
			this.props.onChange(input, this.props.config.fieldId);
		}

		if (this.props.onValidate) {
			this.props.onValidate(errors, this.props.config.fieldId);
		}
	}

	renderInput(){
       	const {runtime, config} = this.props;

       	let handleChange = this.handleChange.bind(this)

		switch(config.type) {

			case "text":
				return <input placeholder={config.hint} type="text" onChange={handleChange} value={this.state.value}/>

			case "number":
				return <input placeholder={config.hint} type="number" onChange={handleChange} value={this.state.value}/>

			case "textarea":
				return <textarea placeholder={config.hint} onChange={handleChange} value={this.state.value}/>

			default:
				return <span/>
		}
	}

	renderErrors() {
		return (
			<div>{JSON.stringify(this.props.runtime.error)}</div>
		)
	}

	render() {
		const {runtime, config} = this.props;

		return (
			<div>
				<label>{config.label}</label>
				{this.renderInput()}
				{this.renderErrors.call(this)}
			</div>
		)
	}
}

class FlowDescriptionCombo extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("montado");
		console.log(FlowActions)
		//FlowActions.queryItems();
	}

	renderInput() {

		const {runtime, config} = this.props;

		/*var optionNodes = this.props.comboData.map(function(option){
				if(option.hasOwnProperty(self.props.display)){
			    	return <option key={option[self.props.saveData]} value={option[self.props.saveData]}>{option[self.props.display].substring(0,80)}</option>;
			  	}
			});
		var combo = <select style={selectStyle} ref="combo" onChange={this.handleChange} size={(this.props.multiple) ? 8 : 1}>
						{optionNodes}
					</select>*/
		return <p>aaaa</p>
	}

	render() {

		const {runtime, config} = this.props;

		return (
			<div>
				<label>{config.label}</label>
				{this.renderInput()}
			</div>
		)
	}

}

export default FlowDescriptionFields;
