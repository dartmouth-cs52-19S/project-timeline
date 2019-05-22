import React from 'react';
import { withRouter } from 'react-router-dom';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    console.log(`clicked this ID: ${this.props.id}`);
    // root url handled by undefined checker in setBackButton
    // this.props.setBackButton(this.props.math.params.timelineID);

    // Change the route
    // NOTE: Child componenets need with router affect change upwards
    this.props.history.push(`${this.props.id}`);
    this.props.selectTimeline(this.props.id);
    // const date = new Date(this.props.time).getTime();
  }

  render() {
    console.log('in main component render');
    const date = new Date(this.props.time).getTime();
    const months = date / 2.628e+6;
    console.log(`content is${this.props.content}`);
    return (
      <div className="element">
        <button type="button" className="elementButton" onClick={this.handleClicked}>
         .
        </button>
        {this.props.title}
        {/* <p>
          Date is {this.props.time}
        </p> */}
        <p>
          In some # format: {months}
        </p>
      </div>
    );
  }
}

export default withRouter(Element);
