import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import ElementStatic from '../components/element-static';
import Detail from '../components/detail';
import { fetchMeta } from '../actions';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class Landing extends Component {
  componentWillMount() {
    this.props.fetchMeta();
  }

  renderTime() {
    if (this.props.meta !== 0) {
      return (this.props.meta.events.map((events) => {
        console.log(`this.props.meta: ${this.props.meta}`);
        console.log(`events.title: ${events.title}`);
        return (
          <div key={events.id}>
            <div key={events.id} className="padding">
              <ElementStatic
                key={events.id}
                id={events.id}
                title={events.title}
                fetchMeta={this.props.fetchMeta}
                time={events.time}
                content={events.content}
              />
            </div>
            <div className="flex-detail-landing hide">
              <Detail
                key={events.id}
                title={events.title}
                content={events.content}
                cover_url={events.cover_url}
                events={events}
                onLanding="onLanding"
              />
            </div>
            {/* <div className="spacing" /> */}
          </div>
        );
      })
      );
    }
    return (
      <div className="justShow">
        <div>Pretend this is a Landing Page</div>
      </div>

    );
  }

  renderDetail() {
    if (this.props.meta !== 0) {
      return (this.props.meta.events.map((events) => {
        console.log(`this.props.meta: ${this.props.meta}`);
        console.log(`events.title: ${events.title}`);
        return (
          <div>
            <div className="flex-detail-landing padding">
              <Detail
                key={events.id}
                title={events.title}
                content={events.content}
                cover_url={events.cover_url}
                events={events}
                onLanding="onLanding"
              />
            </div>
          </div>
        );
      })
      );
    }
    return (
      <div className="justShow">
        <div>Pretend this is a Landing Page</div>
      </div>

    );
  }

  renderCTAwhite() {
    if (this.props.authenticated === false) {
      return (
        <NavLink to="/signup" className="link">
          <button type="button" className="buttonCTAwhite">
                Let’s Get Started
          </button>
        </NavLink>
      );
    } else {
      return ('');
    }
  }

  renderCTAwhitealt() {
    if (this.props.authenticated === false) {
      return (
        <NavLink to="/signup" className="link">
          <button type="button" className="buttonCTAwhite-alt">
          Sign Up Now
          </button>
        </NavLink>
      );
    } else {
      return ('');
    }
  }

  renderAuthText() {
    if (this.props.authenticated === false) {
      return (
        <h5>What are you waiting for?</h5>
      );
    } else {
      return ('');
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="landingBanner">
          <div className="landingText">
            <h1>Timeline</h1>
            <br />
            <h2>We help you know what you don’t</h2>
            <br />
            {this.renderCTAwhite()}
          </div>
          <Particles className="particles" params={particlesOptions} />
        </div>
        <div className="landingTimeline">
          <div className="flex-detail-landing">
            {this.renderDetail()}
          </div>
          <div className="flex-main-landing">
            {this.renderTime()}
          </div>
        </div>
        <div className="landingFooter">
          <div className="footerText">
            {this.renderAuthText()}
            <br />
            {this.renderCTAwhitealt()}
          </div>
          <Particles className="particles" params={particlesOptions} />
        </div>
      </div>

    );
  }
}

const mapStateToProps = state => (
  {
    meta: state.meta,
    authenticated: state.auth.authenticated,
  }
);


export default withRouter(connect(mapStateToProps, {
  fetchMeta,
})(Landing));
