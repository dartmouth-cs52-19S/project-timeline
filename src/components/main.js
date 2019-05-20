import React from 'react';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.handleClicked = this.handleClicked.bind(this);
  }

  handleClicked() {
    console.log(`clicked here${this.props.id}`);
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
