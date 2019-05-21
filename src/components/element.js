import React from 'react';

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    console.log(`clicked this ID: ${this.props.id}`);
    console.log(`the object selected is: ${this.props}`);
    console.log(`the time of this is: ${this.props.time}`);
    this.props.selectTimeline(this.props.id);
    const date = new Date(this.props.time).getTime();
    console.log(`new date${date}`);
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

export default Element;
