import React from 'react';
import { withRouter } from 'react-router-dom';

class ElementStatic extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    // Change the route
    this.props.selectTimeline(this.props.id);
    // const date = new Date(this.props.time).getTime();
  }

  render() {
    return (
      <div className="element flex">
        <div>
          <button type="button" className="elementButton" onClick={this.handleClicked}>
         .
          </button>
        </div>
        <div className="displayElement">
          {this.props.title}
        </div>
      </div>
    );
  }
}

export default withRouter(ElementStatic);
