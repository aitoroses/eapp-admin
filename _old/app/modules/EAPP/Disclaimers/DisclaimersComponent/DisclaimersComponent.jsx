var classnames = require('classnames');

var TitleComponent = require('../../Utils/TitleComponent/TitleComponent')();
var ButtonsComponent = require('../ButtonsComponent/ButtonsComponent')();
var TableComponent = require('../TableComponent/TableComponent')();
var PaginationComponent = require('../PaginationComponent/PaginationComponent')();

var DisclaimersComponent = React.createClass({

  /**
   * On mount
   */
  componentDidMount() {
    console.log("Items Page loaded successfully");
  },

  /**
   * Rendering method
   */
  render() {
    return (
      <div className="container no-padding">
        <TitleComponent title="Disclaimers Configuration"></TitleComponent>
        <ButtonsComponent></ButtonsComponent>
        <TableComponent></TableComponent>
        <PaginationComponent></PaginationComponent>
      </div>
    )
  }
});

module.exports = DisclaimersComponent;