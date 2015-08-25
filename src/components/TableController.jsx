import API from 'core/API';
import TableComponent from './TableComponent';
import swal from 'sweetalert';

const {PropTypes: {string, func, number, object, bool}, Component} = React;

class TableController extends Component {

	static propTypes = {
		table: string.isRequired,
		width: number.isRequired
	}

	constructor(props) {
		super();
		var {store,actions} = API[props.table];
		this.store = store;
		this.actions = actions;
	}

	render() {
    return (
      <div>
        <AdminToolHeader>{this.store.getTableName() + " Table Administration"}</AdminToolHeader>
        <GenericTable width={this.props.width} store={this.store} actions={this.actions}></GenericTable>
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
    selectedRow:null,
		newRow:null
  }

	onSave(arrayValue, row){
		let config = this.props.store.getDefinition();
		let newObject = config.toObject(arrayValue);
		let action = {
			onServer: true,
			index:row,
			payload: newObject
		}
		this.props.actions.update(action);
	}

	onAddNewRow(){
		if(this.state.selectedRow!=null || this.state.newRow!=null) {
				swal('','You are already editing a row. Please save or discard changes.');
		} else {
			let config = this.props.store.getDefinition();
			let newObj = config.getNew();
			this.props.actions.addNew(newObj);
			setTimeout(function(){
				this.setState({
		      newRow:0,
					selectedRow: 0
	    	})}.bind(this))
		}

	}

	onCancelAddNewRow() {
		this.props.actions.cancelNew();
		setTimeout(function(){
			this.setState({
				selectedRow: null,
				newRow:null
			})}.bind(this))
	}

  onEnterEditMode(row) {
		if(this.state.selectedRow!=null || this.state.newRow!=null) {
				swal('','You are already editing a row. Please save or discard changes.');
		} else {
	    this.setState({
	      selectedRow: row
	    });
	    console.log('Entrando a modo edicion')
		}
  }

	onExitEditMode() {
    this.setState({
      selectedRow: null
    });
    console.log('Saliendo de modo edicion')
  }

	getTransformedData(){
		let config = this.props.store.getDefinition();
		return config.toArray(this.props.store.getAll());
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
        <FiltersComponent  store={this.props.store} actions={this.props.actions} width={width}></FiltersComponent>
        <TableComponent columnsWidth={columnsWidth} width={width} data={data} columnsDef={columnsDef} newRow={this.state.newRow} selectedRow={this.state.selectedRow} onEnterEditMode={this.onEnterEditMode} onExitEditMode={this.onExitEditMode} onCancelAddNewRow={this.onCancelAddNewRow} onSave={this.onSave}></TableComponent>
				<FooterComponent  addRowFunc={this.onAddNewRow} width={width}></FooterComponent>
      </div>
    )
  }

}

class FiltersComponent extends React.Component {

	static propTypes = {
		width: number.isRequired,
		store: object.isRequired,
		actions: object.isRequired
	}

	state = {
		loading: true
	}

	handleRefresh() {
		this.setState({
			loading: true
		});
		this.props.actions.fetchCount().then(() => this.setState({ loading: false }));
	}

	componentDidMount() {
		this.props.actions.fetchCount().then(
			() => {

				this.setState({
					loading: false
				})

			}

		);
		let query = {
			payload: {},
			skip: 0,
			limit: this.props.store.getMaxResultsPerPage()
		}
		this.props.actions.fetchByPage(query)
	}

  render() {
		var widthStyle = {width: this.props.width} || {width: '0px'};
		var count = this.props.store.getCount();
    return (
			<div className="search-toolbar" style={widthStyle}>
	      <input className="search-input" type="text" ref="searchText"/>
	      <i className="fa fa-search fa-lg" onClick={function(){console.log('filtrando')}}></i>
	      {!this.state.loading?
					<span className="search-results" onClick={this.handleRefresh}>Items Found: {count}</span> :
	      	<i className="fa fa-spinner fa-lg"></i>
				}
      </div>
		)
  }
}

class FooterComponent extends React.Component {

	static propTypes = {
		width: number.isRequired,
		addRowFunc: func
	}

	handleAddRow(){
		this.props.addRowFunc();
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
