/*
 * Helper method that provides the current with of the node as an arguments
 * to a child function.
 */
class DomSize extends React.Component {

	state = {
    width:0
  }

	getMeasures() {
    return {
      width: Math.floor(React.findDOMNode(this).clientWidth)
    }
  }

  componentDidMount() {
		this.$node = $(React.findDOMNode(this));
    window.addEventListener('resize', this.updateMeasures);
		this.setState(this.getMeasures());
  }

  componentDidUnmount() {
    window.removeEventListener('resize', this.updateMeasures);
  }

  updateMeasures() {
    this.setState(this.getMeasures())
  }

	render() {
		var c = this.props.children;
		if (c.length && c.length == 1 ) {
			return c(this.state)
		} else {
			console.warn("DomSize node has more or less than 1 child.")
			return <span />
		}
	}
}

export default DomSize
