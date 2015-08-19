var react = require('angular/react');
var classnames = require('classnames');

var titleFactory = function TitleComponent(injector, util) {

  var TitleComponent = React.createClass({

    /**
     * On mount
     */
    componentDidMount() {
      console.log("Title Component loaded successfully");
    },

    /**
     * Rendering method
     */
    render() {
      return (
        <div className="title-margin">
          <div className="title-center panel-body">
            <div>Admin Tool</div>
            <div className="color_grey">{this.props.title}</div>
          </div>
        </div>
      )
    }
  });

  return TitleComponent;

}

module.exports = titleFactory;