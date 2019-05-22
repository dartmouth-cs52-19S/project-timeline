import React from 'react';
import { withRouter } from 'react-router-dom';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    this.props.history.push(`${this.props.id}`);
  }

  render() {
    console.log('in main component render');
    const date = new Date(this.props.time).getTime();
    return (
      <div className="element">
        <button type="button" className="elementButton" onClick={this.handleClicked}>
         .
        </button>
        {this.props.title}
        <p>
          Date is {this.props.time}
        </p>
        <p>
          In some # format: {date}
        </p>
      </div>
    );
  }
}

export default withRouter(Element);
