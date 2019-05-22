import React from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    console.log(`clicked this ID: ${this.props.id}`);
    this.props.history.push(`${this.props.oldurl}`);
    // do i need this bottom one?
    this.props.selectTimeline(this.props.oldurl);
    // const date = new Date(this.props.time).getTime();
  }

  render() {
    return (
      <div className="element">
        <button type="button" className="elementButton" onClick={this.handleClicked}>
         BACK, GO BACK
        </button>
      </div>
    );
  }
}

export default withRouter(BackButton);
