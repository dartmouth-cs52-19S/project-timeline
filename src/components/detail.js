/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class Detail extends Component {
  render() {
    if (this.props.onLanding === 'onLanding') {
      return (
        <div className="detailContainer">
          <div className="detailTitle">
            <span>{this.props.title}</span>
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
    return (
      <div className="detailContainer">
        <div className="detailTitle">
          <span>{this.props.title}</span>
          <button
            type="button"
            className="button"
            onClick={() => this.props.add(this.props._id)}
          >
            <i className="far fa-bookmark" /> Save
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
