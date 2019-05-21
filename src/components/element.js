import React from 'react';

class Element extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    console.log(`clicked this ID: ${this.props.id}`);
    console.log(`the object selected is: ${this.props}`);
    this.props.selectTimeline(this.props.id);
  }

  render() {
    console.log('in main component render');
    return (
      <div className="element">
        <button type="button" className="elementButton" onClick={this.handleClicked}>
         .
        </button>
        {this.props.title}
      </div>
    );
  }
}

export default Element;
