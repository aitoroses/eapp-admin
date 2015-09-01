import API from 'core/API'
import {getNew, toObject, toArray, getSearchFilter} from 'config/tables'
import TableComponent from './TableComponent'
import swal from 'sweetalert'
import PureComponent from 'react-pure-render/Component'
import {decorate} from 'react-mixin'
import {getElementArray, PaginationNumber, PaginationDecrease, PaginationIncrease} from 'lib/paginationUtils'

const {PropTypes: {string, func, number, object, bool}, Component} = React

function mapIterator(fn, xs) {
  let result = []
  let i = 0
  for (let x of xs) {
    result = [...result, fn(x, i)]
    i++
  }

  return result
}

var debounce = function(func, threshold, execAsap) {
  var timeout

  return function debounced() {
    var _this = this
    var args = arguments
    function delayed() {
      if (!execAsap)
          func.apply(_this, args)
      timeout = null
    }

    if (timeout)
        clearTimeout(timeout)
    else if (execAsap)
        func.apply(_this, args)

    timeout = setTimeout(delayed, threshold || 100)
  }
}

let externalReosurceMixin = {
  componentWillMount() {
    this.dependantStores = {}
    this.dependantActions = {}
    let dependencies = this.props.store.getDefinition().resolve
    if (dependencies) {
      dependencies.forEach((depName) => {
        let {store,actions} = API[depName]
        this.dependantStores[depName] = store
        this.dependantActions[depName] = actions
      })
    }
  },

  resolveDependencyData() {
    Object.keys(this.dependantActions).forEach((key) => {
      this.dependantActions[key].fetchAll()
    })
  },

  getDependencyData(dataSource, valueField, labelField) {
    return this.dependantStores[dataSource].getAll().map((ele) => {
      return {id: ele[valueField], label: ele[labelField], source: dataSource, key: valueField}
    })
  },

  getDependencyElement({id, key, source}) {
    return this.dependantStores[source].getAll().filter((ele) => {
      return ele[key] == id
    })[0]
  }
}

class TableController extends Component {

  static propTypes = {
    table: string.isRequired,
    width: number.isRequired
  }

  constructor(props) {
    super()
    var {store,actions} = API[props.table]
    this.store = store
    this.actions = actions
  }

  render() {
    return (
      <div>
        <AdminToolHeader>{this.store.getTableName() + ' Table Administration'}</AdminToolHeader>
        <GenericTable width={this.props.width} store={this.store} actions={this.actions}></GenericTable>
      </div>

    )
  }
}

class AdminToolHeader extends React.Component {
  render() {
    return (
      <div className='title-margin'>
        <div className='title-center panel-body'>
          <div>Admin Tool</div>
          <div className='color_grey'>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

@decorate(externalReosurceMixin)
class GenericTable extends React.Component {

  static propTypes = {
    store: object.isRequired,
    actions: object.isRequired,
    width: number.isRequired

  }

  constructor() {
    super()
    this.errorMap = new Map()
  }

  state = {
    selectedRow:null,
    newRow:null,
    error:false,
    loading: true,
    filter: {}
  }

  componentDidMount() {
    this.resolveDependencyData()
  }

  handleValidateCell(evaluation, colId) {
    let currentObj = this.props.store.getAll()[this.state.selectedRow]
    let objErrors = this.errorMap.get(currentObj)
    if (!objErrors) {
      objErrors = {}
      this.errorMap.set(currentObj, objErrors)
    }

    objErrors[colId] = evaluation
    this.forceUpdate()
  }

  getErrorForRow(row) {
    let currentObj = this.props.store.getAll()[row]
    let config = this.props.store.getDefinition()
    let errors = this.errorMap.get(currentObj)
    if (!errors) return []
    return toArray.call(config, [errors])[0]
  }

  onFilterChange(value) {
    let config = this.props.store.getDefinition()
    let filter
    if (value != null && value != '') {
      this.setState({
        filter: getSearchFilter.call(config, value)
      })
    } else {
      //Reset filter
      this.setState({
        filter: {}
      })
    }
  }

  onError() {
    this.setState({
    error:true,
    loading:false
  })
  }

  onSuccess() {
    this.setState({
    error:false,
    loading:false
  })
  }

  onErrorUpdate() {
    swal('', 'Error while updating the database')
  }

  onCreateUpdateSuccess() {
    this.removeSelectedRowStyles()
    this.onExitEditMode()
  }

  onCreate(arrayValue, row) {
    let config = this.props.store.getDefinition()
    let newObject = toObject.call(config, arrayValue)
    let action = {
    onServer: true,
    index:row,
    payload: newObject
  }
    this.props.actions.create(action)
    .then(this.onCreateUpdateSuccess)
    .catch(this.onErrorUpdate)
  }

  onSave(arrayValue, row) {
    let config = this.props.store.getDefinition()
    let newObject = toObject.call(config, arrayValue)
    let action = {
    onServer: true,
    index:row,
    payload: newObject
  }
    this.props.actions.update(action)
    .then(this.onCreateUpdateSuccess)
    .catch(this.onErrorUpdate)
  }

  onAddNewRow() {
    if (this.state.selectedRow != null || this.state.newRow != null) {
      swal('', 'You are already editing a row. Please save or discard changes.')
    } else {
      let config = this.props.store.getDefinition()
      let newObj = getNew.call(config)
      this.props.actions.addNew(newObj)
      setTimeout(function() {
        this.setState({
        newRow:0,
        selectedRow: 0
      })}.bind(this))
    }
  }

  onCancelAddNewRow() {
    this.props.actions.cancelNew()
    setTimeout(function() {
      this.setState({
      selectedRow: null,
      newRow:null
    })}.bind(this))
    this.errorMap.clear()
  }

  onEnterEditMode(row) {
    if (this.state.selectedRow != null || this.state.newRow != null) {
      swal('', 'You are already editing a row. Please save or discard changes.')
    } else {
      this.setState({
        selectedRow: row
      })
    }
  }

  onExitEditMode() {
    this.setState({
      selectedRow: null,
      newRow: null
    })
    this.errorMap.clear()
  }

  getTransformedData() {
    let config = this.props.store.getDefinition()
    return toArray.call(config, this.props.store.getAll())
  }

  calculateColumnsWidth(columnsDef) {
    var columnCount =  columnsDef.length + 1
    var singleColumn = (this.props.width) / columnCount
    var singlePercentage = (singleColumn / this.props.width) * 100
    var withoutLastColumnWidth = (columnCount - 1) * singleColumn
    var lastCol = this.props.width - withoutLastColumnWidth
    var lastPercentage = (lastCol / this.props.width) * 100
    var columnArray = []
    for (var i = 0; i < columnCount; i++) {
      if (i == (columnCount - 1)) {
        columnArray.push({size: lastCol, percentage: lastPercentage})
      } else {
        columnArray.push({size: singleColumn, percentage: singlePercentage})
      }
    }

    return columnArray
  }

  removeSelectedRowStyles() {
    var el = document.querySelectorAll('.row-selected')[0]
    if (el) {
      el.classList.remove('row-selected')
    }

    el = document.querySelectorAll('.new-row-selected')[0]
    if (el) {
      el.classList.remove('new-row-selected')
    }
  }

  fetchItemsByPage(skip, filters) {
    if (skip != 0) {
      this.state.newRow != null ? this.onCancelAddNewRow() : this.onExitEditMode()
      this.removeSelectedRowStyles()
    }

    let query = {
    payload: filters ? filters : {},
    skip: skip,
    limit: this.props.store.getMaxResultsPerPage()
  }
    return this.props.actions.fetchByPage(query)
  }

  fetchCount(filters) {
    return this.props.actions.fetchCount(filters)
  }

  fetchCountAndItems(skip, payload) {
    this.setState({
      loading: true
    })
    this.state.newRow != null ? this.onCancelAddNewRow() : this.onExitEditMode()
    this.removeSelectedRowStyles()
    let filters = payload ? payload : {}
    return this.fetchCount(filters)
    .then(this.fetchItemsByPage.bind(this, skip, filters))
    .then(this.onSuccess.bind(this))
    .catch(this.onError.bind(this))
  }

  render() {
    let columnsDef = this.props.store.getFields()
    let data = this.getTransformedData() || []
    let columnsWidth = this.props.width == 0 ? [] : this.calculateColumnsWidth(columnsDef)
    let width = this.props.width || 0
    let perPage = this.props.store.getMaxResultsPerPage()
    let isError = this.state.error
    let isLoading = this.state.loading
    let filter = this.state.filter
    let fetchCountAndItems = this.fetchCountAndItems
    return (
      <div style={{marginLeft:'50px', marginTop:'50px'}} >
        <FiltersComponent
          filter= {filter}
          onFilterChange={this.onFilterChange}
          store={this.props.store}
          actions={this.props.actions}
          width={width}
          loading={isLoading}
          error={isError}
          fetchItemsByPage={this.fetchItemsByPage}
          fetchCountAndItems={this.fetchCountAndItems}/>
        <TableComponent
          columnsWidth={columnsWidth}
          width={width}
          data={data}
          columnsDef={columnsDef}
          newRow={this.state.newRow}
          selectedRow={this.state.selectedRow}
          onEnterEditMode={this.onEnterEditMode}
          onExitEditMode={this.onExitEditMode}
          onCancelAddNewRow={this.onCancelAddNewRow}
          onSave={this.onSave}
          onCreate={this.onCreate}
          perPage={perPage}
          onValidateCell={this.handleValidateCell.bind(this)}
          errorGetter={this.getErrorForRow.bind(this)}
          errorMap={this.errorMap}
          dependencyDataGetter={this.getDependencyData}
          />
        <FooterComponent
          isLoading={isLoading}
          isError={isError}
          perPage={perPage}
          addRowFunc={this.onAddNewRow}
          width={width}
          errorMap={this.errorMap}/>
      </div>
    )
  }

  }

class FiltersComponent extends React.Component {

  static propTypes = {
    width: number.isRequired,
    store: object.isRequired,
    fetchItemsByPage: func,
    fetchCountAndItems: func,
    loading: bool,
    error:bool,
    filter: object,
    onFilterChange: func
  }

  constructor(props) {
    super()
    this.debouncedFilterChange = debounce(props.onFilterChange, 150)
  }

  state = {
    searchText: ''
  }

  onFilter() {
    this.props.fetchCountAndItems(0, this.props.filter)
  }

  handleKeyDown(e) {
    if (e.keyCode == 13)
    {
      e.preventDefault()
      this.props.fetchCountAndItems(0, this.props.filter)
    }
  }

  handleChange() {
    this.setState({
      searchText: this.refs.searchText.getDOMNode().value
    })
    this.debouncedFilterChange(this.refs.searchText.getDOMNode().value)
  }

  handleRefresh() {
    this.setState({
      searchText: ''
    })
    this.props.onFilterChange('')
    this.props.fetchCountAndItems(0)
  }

  componentDidMount() {
    this.props.fetchCountAndItems(0)
  }

  render() {
    let widthStyle = {width: this.props.width} || {width: '0px'}
    let count = this.props.store.getCount() || 0
    let perPage = this.props.store.getMaxResultsPerPage()
    let isLoading = this.props.loading
    let isError = this.props.error
    let fetchItemsByPage = this.props.fetchItemsByPage
    let filter = this.props.filter
    let refreshStyle = { marginLeft: '0 !important', marginRight: '10px !important'}
    return (
      <div className='search-toolbar' style={widthStyle}>
        <input className='search-input' type='text' ref='searchText' value={this.state.searchText} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
        <i className='fa fa-search fa-lg' onClick={this.onFilter}></i>
        {!isLoading ?
          <span className='search-results'>
            <i style={refreshStyle} className='fa fa-refresh fa-lg' onClick={this.handleRefresh} title='Refresh'></i>
            {isError ? <span style={{color:'red'}}><i style={{fontSize: '12px', lineHeight: '14px'}} className='fa fa-exclamation-triangle'></i> Error while retrieving information from database</span> : <span>Items Found: {count}</span>}
          </span> :
          <i className='fa fa-spinner fa-lg'></i>
        }
        <PaginationComponent filter={filter} isError={isError} isLoading={isLoading} perPage={perPage} visible={5} count={count} fetchItemsByPage={fetchItemsByPage}></PaginationComponent>
      </div>
    )
  }
}

class FooterComponent extends React.Component {

  static propTypes = {
    width: number.isRequired,
    addRowFunc: func,
    perPage: number,
    isError: bool,
    isLoading: bool,
    errorMap: object
  }

  handleAddRow() {
    this.props.addRowFunc()
  }

  renderErrors() {
    return (
      <div style={{color: 'red', fontWeight: 'bold'}}>
      {mapIterator((value, i) => {
        return (Object.keys(value).map((key) => {
          let errors = value[key].errors
          if (errors) {
            return errors.map((e, j) =>
              <div
                key={i + '_' + j}>
                Error in column {key} -> {e.errorId}
              </div>)
          }
        }))
      }, this.props.errorMap.values())}
      </div>
    )
  }

  render() {
    let widthStyle = {width: this.props.width} || {width: 0}
    let itemsCount = this.props.perPage || '...'
    this.props.isError || this.props.isLoading ? widthStyle.display = 'none' : widthStyle.display = 'block'
    return (
      <div className='footer-toolbar' style={widthStyle}>
        <div style={{marginBottom: 10}}>Items per Page: {itemsCount}</div>
        <div style={{position: 'absolute', right: 0, top: 0}}><button onClick={this.handleAddRow}><i className='fa fa-plus'></i> Add</button></div>
        {this.props.errorMap.size > 0 ? this.renderErrors() : null}
      </div>
    )
  }
}

class PaginationComponent extends PureComponent {

  static propTypes = {
    perPage: number.isRequired,
    count: number,
    fetchItemsByPage: func,
    isLoading: bool.isRequired,
    isError: bool.isRequired,
    filter: object
  }

  static contextTypes = {
    router: func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
    current: 1
  }

    this.state.pageArray = this.getElementArray()
  }

  getElementArray(more) {
    return getElementArray({...this.state, ...this.props, ...more})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.count != this.props.count) {
      this.setState({
        pageArray: this.getElementArray(nextProps)
      })
    }

    if (nextProps.isLoading != this.props.isLoading) {
      this.setState({
        current: 1
      })
    }
  }

  setPage(p) {
    let page = (
    p.target.innerText == '<' ? (this.state.current - 1) :
    p.target.innerText == '>' ? (this.state.current + 1) : parseInt(p.target.innerText)
    )
    if (page != this.state.current) {
      let auxState = {...this.state}
      auxState.current = page
      this.setState({
        current: page
      })

      //Hacer el fetch para la pagina P
      let skip = (page * this.props.perPage) - this.props.perPage

      this.props.fetchItemsByPage(skip, this.props.filter).then(() => {
        this.setState({
          pageArray: this.getElementArray()
        })
      })
    }
  }

  render() {

    if (this.state.pageArray.length == 0 || this.props.isLoading || this.props.isError) {
      return (<div></div>)
    }  else {
      let onClick = this.setPage
      let current = this.state.current
      let pageArray = this.state.pageArray
      return renderPagination(pageArray, current, onClick)
    }
  }
  }

class PaginationLayoutView extends React.Component {
  static style = {
    float: 'right',
    marginTop: '8px'
  }
  render() {
    return (
    <div style={PaginationLayoutView.style}>
      {this.props.children}
    </div>
    )
  }
}

class PaginationNumberView extends React.Component {

  static styles = {
    selectedPage: {
    backgroundColor: '#565151',
    color: 'white',
    cursor:'pointer',
    fontWeight:'bold',
    padding: '5px 5px 5px 5px',
    border: '1px solid #C5C3C3',
    borderRadius: '2px'
  },
    unselectedPage: {
    color:'blue',
    textDecoration: 'underline',
    cursor:'pointer',
    padding: '5px 5px 5px 5px',
    border: '1px solid #C5C3C3',
    borderRadius: '2px'
  }
  }
  render() {
    let style = this.props.active ? PaginationNumberView.styles.selectedPage : PaginationNumberView.styles.unselectedPage
    return (<span onClick={this.props.onClick} style={style}>{this.props.value}</span>)
  }
}

class PaginationIncreaseView extends React.Component {
  static style = {
    color:'blue',
    cursor:'pointer',
    fontSize:'11px',
    padding: '5px 5px 5px 5px',
    border: '1px solid #C5C3C3',
    borderRadius: '2px'
  }
  render() {
    let style = PaginationIncreaseView.style
    return (<span onClick={this.props.onClick} style={style}>{this.props.value}</span>)
  }
}

class PaginationDecreaseView extends React.Component {
  static style = {
    color:'blue',
    cursor:'pointer',
    fontSize:'11px',
    padding: '5px 5px 5px 5px',
    border: '1px solid #C5C3C3',
    borderRadius: '2px'
  }
  render() {
    let style = PaginationDecreaseView.style
    return (<span onClick={this.props.onClick} style={style}>{this.props.value}</span>)
  }
}

function renderPagination(pageArray, current, onClick) {
  function mapToComponent(el, index) {
    return (
    el instanceof PaginationNumber ?   <PaginationNumberView key={'number_' + index} onClick={onClick} active={(current == el._value)} value={el._value}/> :
    el instanceof PaginationDecrease ? <PaginationDecreaseView key={'decrease_' + index} onClick={onClick} value={el._value}/> :
    el instanceof PaginationIncrease ? <PaginationIncreaseView key={'increase_' + index} onClick={onClick} value={el._value}/ > : <div className='no-element'></div>
    )
  }

  function hasIncreaseElement(array) {
    let res = false
    array.forEach((el) => {
      if (el instanceof PaginationIncrease) {
        res = true
      }
    })
    return res
  }

  return (
  <PaginationLayoutView>
        {pageArray.map(mapToComponent)}
        {hasIncreaseElement(pageArray) ? null : <div style={{width:'20px', display:'inline-block'}}>{' '}</div>}
      </PaginationLayoutView>
  )
}

export default TableController
