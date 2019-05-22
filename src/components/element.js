/* eslint-disable jsx-a11y/mouse-events-have-key-events */
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

  handleHover() {
    const date = new Date(this.props.time).getTime();
    const months = Math.round(date / 2.628e+6);
    const years = Math.round(months / 12);
    // return (
    //   <div id="div1" className="callOutTimeline show">
    //       Start working on this {months} months from now <br /> ({years} years)
    //   </div>
    // );
  }

  render() {
    console.log('in main component render');
    const date = new Date(this.props.time).getTime();
    const months = Math.round(date / 2.628e+6);
    const years = Math.round(months / 12);
    console.log(`content is${this.props.content}`);
    return (
      <div className="element flex">
        <div className="trigger">
          <button type="button" className="elementButton" onClick={this.handleClicked} onHover={this.handleHover}>
         .
          </button>
        </div>
        <div className="displayElement">
          {this.props.title}
        </div>
        <div className="show">
          <div className="callOutTimeline">
      Start planning for this {months} months from now <br /> ({years} years)
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(Element);
