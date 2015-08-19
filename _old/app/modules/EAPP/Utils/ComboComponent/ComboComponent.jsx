var react = require('angular/react');
var classnames = require('classnames');

var comboFactory = function ComboComponent(injector, util) {

  var ComboComponent = React.createClass({

  	/**
  	 * Initial State
  	 */
  	getInitialState() {
  		return {
  			selected: 0
  		}
  	},

  	handleChange() {
  		var newValue = this.refs.combo.getDOMNode().value;
  		this.setState({
  			selected: newValue
  		});
  		this.props.changeHandler(newValue);
  	},

    /**
     * On mount
     */
    componentDidMount() {
      console.log("Combo Component loaded successfully");
    },

    /**
     * Rendering method
     */
    render() {
    	var self = this;
      if(this.props.comboData!=null){
        var optionNodes = this.props.comboData.map(function(option){
          if(option.hasOwnProperty(self.props.display)){
            //console.log(option[self.props.display]);
            //console.log(option[self.props.saveData]);
            return <option key={option[self.props.saveData]} value={option[self.props.saveData]}>{option[self.props.display]}</option>;
          }
        });
      }
      	return (
        	<div className="comboOption">
        		<label>{this.props.comboText}</label>
        		<select ref="combo" onChange={this.handleChange}>
        			{optionNodes}
        		</select>
        	</div>
      	)
    }
  });

  return ComboComponent;

}

module.exports = comboFactory;