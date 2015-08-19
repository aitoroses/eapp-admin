var Modal = React.createClass({

  propTypes: {
    display: React.PropTypes.bool.isRequired,
    body: React.PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      display: this.props.display
    }
  },

  close() {
    this.props.update();
    /*this.setState({
      display: false
    })*/
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      display: newProps.display
    })
  },

  render() {

    var modalStyle = {
      display: this.state.display ? 'block': 'none',
      zIndex: 10
    }
    return (
      <div className="modal" style={modalStyle}>
        <div className="popup-overlay" style={{
            position: 'fixed',
            zIndex: 0
          }}></div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                onClick={this.close}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">
                {this.props.header}
              </h4>
            </div>
            <div className="modal-body">
              {this.props.body}
            </div>
            <div className="modal-footer">
              {this.props.footer}
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Modal;
