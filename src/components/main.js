import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    console.log(`clicked this ID: ${this.props.id}`);
    console.log(`the object selected is: ${this.props}`);
    this.props.selectTimeline(this.props);
  }

  render() {
    console.log('in main component render');
    return (
      <div>
        <button type="button" onClick={this.handleClicked}>
            Button
        </button>
        {this.props.title}
      </div>
    );
  }
}

export default Main;
