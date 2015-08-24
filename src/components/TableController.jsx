import API from 'core/API';
import TableComponent from './TableComponent';

const {PropTypes: {string, func, number, object, bool}, Component} = React;

class TableController extends Component {

	static propTypes = {
		table: string.isRequired,
		width: number.isRequired
	}

	render() {
    var {store,actions} = API[this.props.table];
    return (
      <div>
        <AdminToolHeader>{store.getTableName() + " Table Administration"}</AdminToolHeader>
        <GenericTable width={this.props.width} store={store} actions={actions}></GenericTable>
      </div>

    )
	}
}

class AdminToolHeader extends React.Component {
  render() {
    return (
      <div className="title-margin">
        <div className="title-center panel-body">
          <div>Admin Tool</div>
          <div className="color_grey">{this.props.children}</div>
        </div>
      </div>
    )
  }
}

class GenericTable extends React.Component {

  static propTypes = {
		store: object.isRequired,
    actions: object.isRequired,
		width: number.isRequired

	}

  state = {
    selectedRow:null
  }

	onChange(value, key, row){
		let currentObj = this.props.store.getAll()[row].toJS();
		let action = {
			onServer: true,
			index:row,
			payload: {...currentObj, [key]: value}
		}
		this.props.actions.update(action);
	}

  onEnterEditMode(row) {
    this.setState({
      selectedRow: row
    });
    console.log('Entrando a modo edicion')
  }

	onExitEditMode() {
    this.setState({
      selectedRow: null
    });
    console.log('Saliendo de modo edicion')
  }

	getTransformedData(){
		let config = this.props.store.getDefinition();
		return config.normalize(this.props.store.getAll());
	}

	calculateColumnsWidth(columnsDef) {
    var columnCount =  columnsDef.length +1;
    var singleColumn = (this.props.width)/columnCount;
    var singlePercentage = (singleColumn/this.props.width)*100;
    var withoutLastColumnWidth = (columnCount-1)*singleColumn;
    var lastCol = this.props.width - withoutLastColumnWidth;
    var lastPercentage = (lastCol/this.props.width)*100;
    var columnArray =[];
    for(var i=0;i<columnCount;i++) {
      if(i==(columnCount-1)) columnArray.push({size: lastCol, percentage: lastPercentage})
      else columnArray.push({size: singleColumn, percentage: singlePercentage});
  	}
		return columnArray;
	}

  render() {
    var columnsDef = this.props.store.getFields();
    var data = this.getTransformedData() || [];
		var columnsWidth = this.props.width==0 ? [] : this.calculateColumnsWidth(columnsDef);
		var width = this.props.width || 0;

    return (
      <div style={{marginLeft:'50px', marginTop:'50px'}} >
        <FiltersComponent  width={width}></FiltersComponent>
        <TableComponent columnsWidth={columnsWidth} width={width} data={data} columnsDef={columnsDef} selectedRow={this.state.selectedRow} onEnterEditMode={this.onEnterEditMode} onExitEditMode={this.onExitEditMode} onChange={this.onChange}></TableComponent>
				<FooterComponent  width={width}></FooterComponent>
      </div>
    )
  }

}

class FiltersComponent extends React.Component {

	static propTypes = {
		width: number.isRequired
	}

  render() {
		var widthStyle = {width: this.props.width} || {width: '0px'};
    return (
			<div className="search-toolbar" style={widthStyle}>
	      <input className="search-input" type="text" ref="searchText"/>
	      <i className="fa fa-search fa-lg" onClick={function(){console.log('filtrando')}}></i>
	      <span className="search-results">Items Found: 5</span>
	      <i className="fa fa-spinner fa-lg"></i>
      </div>
		)
  }
}

class FooterComponent extends React.Component {

	static propTypes = {
		width: number.isRequired
	}

	handleAddRow(){
		console.log("Añadir Fila");
	}

  render() {
		var widthStyle = {width: this.props.width} || {width: '0px'};
    return (
			<div className="footer-toolbar" style={widthStyle}>
	      <button onClick={this.handleAddRow}><i className="fa fa-plus"></i> Add</button>
      </div>
		)
  }
}

export default TableController;
