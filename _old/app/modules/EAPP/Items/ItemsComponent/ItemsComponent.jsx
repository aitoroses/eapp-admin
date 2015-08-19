var classnames = require('classnames');

var TitleComponent = require('../../Utils/TitleComponent/TitleComponent')();
var ButtonsComponent = require('../ButtonsComponent/ButtonsComponent')();
var TableComponent = require('../TableComponent/TableComponent')();
var PaginationComponent = require('../PaginationComponent/PaginationComponent')();

var ItemsComponent = React.createClass({

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
        <TitleComponent title="Items Configuration"></TitleComponent>
        <ButtonsComponent></ButtonsComponent>
        <TableComponent></TableComponent>
        <PaginationComponent></PaginationComponent>
      </div>
    )
  }
});

module.exports = ItemsComponent;