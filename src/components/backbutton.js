import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class BackButton extends Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    if (this.props.enabled === 'true') {
      if (this.props.selected === undefined) {
        this.props.history.push('/explore/start');
      } else if (this.props.parent === '5ce1b7c6c75aa400347686ee') {
        this.props.history.push('/explore/start');
      } else if (this.props.parent !== null && this.props.parent !== undefined) {
        this.props.history.push(`/explore/${this.props.parent}`);
      } else {
        console.log('NO PARENT FOUND WHEN EXPECTED');
        this.props.history.push('/explore/start');
      }
      // This function doesn't account for navigating to parent
      // from node a user jumped directly to:
      // this.props.history.goBack();
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
