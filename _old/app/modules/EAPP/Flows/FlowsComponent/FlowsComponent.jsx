var classnames = require('classnames');

var TitleComponent = require('../../Utils/TitleComponent/TitleComponent')();
var ButtonsComponent = require('../ButtonsComponent/ButtonsComponent')();
var TableComponent = require('../TableComponent/TableComponent')();
var PaginationComponent = require('../PaginationComponent/PaginationComponent')();

var FlowsComponent = React.createClass({

  /**
   * On mount
   */
  componentDidMount() {
    console.log("Flows Page loaded successfully");
  },

  /**
   * Rendering method
   */
  render() {
    return (
      <div className="container no-padding">
        <TitleComponent title="Flows Configuration"></TitleComponent>
        <ButtonsComponent></ButtonsComponent>
        <TableComponent></TableComponent>
        <PaginationComponent></PaginationComponent>
      </div>
    )
  }
});

module.exports = FlowsComponent;