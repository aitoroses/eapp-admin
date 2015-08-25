import DualBox from 'components/DualBox';
import {store as FlowsStore} from 'stores/FlowsStore';
import {actions as FlowActions} from 'actions/FlowsActions';

const PropTypes = React.PropTypes;

class ExtendedDualBox extends DualBox {

	constructor(props) {
		super(props);
	}

	handleChangeCategory(row, event) {
		actions.setCategory({'row': row, 'value': event.target.value});
	}

	renderSelectBox() {

		if(this.props.right.list.length==0) return

		let handleChangeCategory = this.handleChangeCategory.bind(this);

		var categories = store.getCategories();

		if(categories.length>0){
			var self = this;
			var optionNodes = categories.map(function(option){
				return <option key={option["name"]} value={option["name"]}>{option["name"]}</option>
			})
		}

		var selectBox = this.props.right.list.map(function(option, index){
			return <select key={index} onChange={handleChangeCategory.bind(this, index)}>{optionNodes}</select>;
		})

		return <div>{selectBox}</div>
	}

	render() {
		var a = super.render();
		return (
			<div>
				{a}
				{this.renderSelectBox()}
			</div>
		)
	}

}

export default ExtendedDualBox;