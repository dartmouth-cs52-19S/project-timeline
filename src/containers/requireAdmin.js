import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBanner, clearBanner } from '../actions';

export default function (ComposedComponent) {
  class RequireAdmin extends Component {
    componentWillMount() {
      if (this.props.user === null) {
        this.props.history.push('/signin');
        this.props.createBanner('Admin Access Needed');
        setTimeout(() => {
          this.props.clearBanner();
        }, 2500);
      } else if (!this.props.user.admin) {
        this.props.history.push('/explore/start');
        this.props.createBanner('Admin Access Needed');
        setTimeout(() => {
          this.props.clearBanner();
        }, 2500);
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
      user: state.auth.user,
    }
  );
  return connect(mapStateToProps, { createBanner, clearBanner })(RequireAdmin);
}
