// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createTimeline } from '../actions';
import AddForm from '../components/add';

const mapStateToProps = state => (
  {
    timeline: state.selected,
    update: false,
  }
);


export default withRouter(connect(mapStateToProps, { createTimeline })(AddForm));
