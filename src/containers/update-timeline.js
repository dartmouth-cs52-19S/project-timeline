/* eslint-disable class-methods-use-this */
// import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateTimeline, deleteTimeline } from '../actions';
import AddForm from '../components/add';


const mapStateToProps = state => (
  {
    timeline: state.selected,
    update: true,
  }
);


export default withRouter(connect(mapStateToProps, {
<<<<<<< HEAD
  createTimeline: updateTimeline, delete: deleteTimeline,
=======
  createTimeline: updateTimeline,
>>>>>>> 097234c7be8212327fede1b27de6dc0f05e4ecc7
})(AddForm));
