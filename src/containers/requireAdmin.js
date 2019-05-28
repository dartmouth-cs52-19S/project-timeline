import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBanner, clearBanner } from '../actions';

export default function (ComposedComponent) {
  class RequireAdmin extends Component {
    componentWillMount() {
      if (this.props.user === null) {
        this.props.history.push('/');
        this.props.createBanner('Admin Access Needed');
        setTimeout(() => {
          this.props.clearBanner();
        }, 2500);
      } else if (!this.props.user.admin) {
        this.props.history.push('/explore');
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
      user: state.user,
    }
  );
  return connect(mapStateToProps, { createBanner, clearBanner })(RequireAdmin);
}
