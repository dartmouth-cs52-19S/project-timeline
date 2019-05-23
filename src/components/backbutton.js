import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class BackButton extends Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    if (this.props.enabled === 'true') {
      this.props.history.goBack();
    }
  }

  render() {
    return (
      <div className="element">
        <button type="button" onClick={this.handleClicked}>
          BACK, GO BACK
        </button>
      </div>
    );
  }
}

export default withRouter(BackButton);
