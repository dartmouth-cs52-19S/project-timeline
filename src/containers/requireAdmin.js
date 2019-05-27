import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBanner } from '../actions';

export default function (ComposedComponent) {
  class RequireAdmin extends Component {
    componentWillMount() {
      if (!this.props.admin) {
        this.props.history.push('/explore');
        this.props.createBanner('Admin Access Needed');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => (
    {
      admin: state.user.admin,

    }
  );
  return connect(mapStateToProps, { createBanner })(RequireAdmin);
}
