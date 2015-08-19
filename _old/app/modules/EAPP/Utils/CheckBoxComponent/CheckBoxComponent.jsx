var react = require('angular/react');

var checkboxFactory = function CheckBoxComponent(injector, util) {

  var CheckBoxComponent = React.createClass({

    /**
     * On mount
     */
    componentDidMount() {
      console.log("CheckBoxComponent Component loaded successfully");
    },

    /**
     * Rendering method
     */
    render() {
      	return (
        	<div>
        		<input checked={this.props.selected} name="input" type="checkbox" disabled />
        	</div>
      	)
    }
  });

  return CheckBoxComponent;

}

module.exports = checkboxFactory;