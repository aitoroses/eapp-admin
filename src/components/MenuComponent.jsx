import Panel from 'react-bootstrap/lib/Panel'

class MenuComponent extends React.Component {

  /**
   * On mount
   */
  componentDidMount() {
    $('.menu-container').css('height', $('body').height() + 'px')
    $('.div-container').css('height', $('body').height() + 'px')
    $('.menu-container').css('background-color', '#fe5252')

    $(window).resize(function() {
      $('.menu-container').css('height', $('body').height() + 'px')
      $('.div-container').css('height', $('body').height() + 'px')
    })
  }

  state = {
    show: false,
    show2: false
  }

  toggleItem() {
    this.setState({
      show: !this.state.show
    })
  }

  toggleItem2() {
    this.setState({
      show2: !this.state.show2
    })
  }

  /**
   * Rendering method
   */
  render() {
    return (
      <div className='top'>
        <div className='logo'></div>
        <div className='block'>
          <Panel className='menuIzq eapprovalmenu' header='EAPPROVAL'>
            <ul className='menu'>
              <li><a onClick={this.toggleItem2} href='#/flows'><span className='fa fa-bars marginRight'></span>Flows<span className='rotate'>&gt</span></a>
                <ul className={this.state.show2 ? 'block' : 'hidden'}>
                  <li><a href='#/flows'><span className='fa fa-th-list marginRight'></span>Flows</a></li>
                  <li><a href='#/fields'><span className='fa fa-check-circle-o marginRight'></span>Fields</a></li>
                  <li><a href='#/variables'><span className='fa fa-th-list marginRight'></span>Variables</a></li>
                  <li><a href='#/therapeuticalareas'><span className='fa fa-check-circle-o marginRight'></span>Therapeutical Areas</a></li>
                </ul>
              </li>
            </ul>
          </Panel>
          <Panel className='menuIzq np5menu' header='NP5'>
            <ul className='menu'>
              <li><a onClick={this.toggleItem} href='#/items'><span className='fa fa-align-left marginRight'></span>Items<span className='rotate'>&gt</span></a>
                <ul className={this.state.show ? 'block' : 'hidden'}>
                  <li><a href='#/itemsPermission'><span className='fa fa-th-list marginRight'></span>Items Permission</a></li>
                  <li><a href='#/disclaimers'><span className='fa fa-check-circle-o marginRight'></span>Disclaimers</a></li>
                </ul>
              </li>
              <li><a href='#/manage/countries'><span className='fa fa-map-marker marginRight'></span>Countries</a></li>
              <li><a href='#/therapeuticalAreas'><span className='fa fa-th marginRight'></span>Therapeutical Areas</a></li>
            </ul>
            </Panel>
        </div>
      </div>
    )
  }
}

export default MenuComponent
