/* eslint-disable class-methods-use-this */
// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearBanner } from '../actions';
import Banner from '../components/banner';

const mapStateToProps = state => (
  {
    message: state.message,
  }
);


export default withRouter(connect(mapStateToProps, { clear: clearBanner })(Banner));
