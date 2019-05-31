import React from 'react';
import { withRouter } from 'react-router-dom';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    this.props.history.push(`/explore/${this.props.id}`);
  }

  render() {
    const date = new Date(this.props.time).getTime();
    const months = Math.round(date / 2.628e+6);
    const years = Math.round(months / 12);
    return (
      <div className="element flex">
        <div className="trigger">
          <button type="button" className="elementButton" onClick={this.handleClicked}>
         .
          </button>
        </div>
        <div className="displayElement">
          {this.props.title}
        </div>
        <div className="show">
          <div className="callOutTimeline">
            <div className="callOutTimelineText">
              {this.props.content}
            </div>
            <div className="callOutTimelineEm">
                Start planning for this {months} months from now <br /> ({years} years)
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default withRouter(Element);
