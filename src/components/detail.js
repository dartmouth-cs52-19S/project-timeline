/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Detail extends Component {
//   displayEvents() {
//     this.props.events.forEach((element) => {
//       console.log(`element here${element.title}`);
//       return element.title;
//     });
//   }

  render() {
    return (
      <div className="detailContainer">
        <div className="detailTitle">
          <span>{this.props.title}</span>
          <button
            type="button"
            className="buttonCTAwhite-alt"
            onClick={() => this.props.add(this.props._id)}
          >
          Save
          </button>
        </div>
        <div className="detailImg">
          <img className="Img" src={this.props.cover_url} alt="Detail" />
        </div>
        <div className="detailContent">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default Detail;
