import {decorate as Mixin} from 'react-mixin'

const PropTypes = React.PropTypes

function ScrollMixinFactory(scrollTargetRef) {
  var ScrollMixin = {

    getScrollTarget() {
          return React.findDOMNode(this.refs[scrollTargetRef])
        },

    componentDidMount() {

      // Listener
      var node = this.getScrollTarget()
      var $node = $(node)
      if (this.props.onScroll) {
        $node.on('scroll', () => {
          var value = $node.scrollTop()
          this.props.onScroll(value)
        })
      }

      // Set scroll
      var setScroll = () => {
        var scroll = this.props.scrollTop || 0
        $node.scrollTop(scroll)
      }

      var id = setInterval(() => {
        var hasChildren = $node.children().length > 0
        if (!hasChildren) {
          return
        } else {
          setScroll()
          clearInterval(id)
        }
      }, 200)

    },

    componentDidUpdate() {
      var node = this.getScrollTarget()
      var $node = $(node)
      var scroll = this.props.scrollTop
      if (!scroll) return
      if ($node.scrollTop != scroll) {
        $node.scrollTop(scroll)
      }
    },

    componentWillUnmount() {
      var node = this.getScrollTarget()
      var $node = $(node)
      $node.unbind()
    }
  }
  return ScrollMixin
}

@Mixin(ScrollMixinFactory('scrollTarget'))
class Box extends React.Component {

  static propTypes = {
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    labelField: PropTypes.string.isRequired,
    valueField: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  handleChange(e) {
    let item = this.props.options.filter(item => e.target.value == item[this.props.valueField])[0]
    this.props.onChange(item)
  }

  renderInput() {

    if (this.props.options.length > 0) {
      var _this = this
      var optionNodes = this.props.options.map(function(option) {
        return <option key={option[_this.props.valueField]} value={option[_this.props.valueField]}>{option[self.props.labelField]}</option>
      })
    }

    var selectStyle = {width: 300}

    return <select ref='scrollTarget' onChange={this.handleChange.bind(this)} size='8' style={selectStyle}>{optionNodes}</select>
  }

  render() {

    var labelStyle = {marginLeft: '75px'}

    var divStyle = {display: 'table-caption', overflow: 'auto'}

    return (
      <div style={divStyle}>
        <label style={labelStyle}>{this.props.label}</label>
        {this.renderInput()}
      </div>
    )
  }

}

export default Box
