import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import Particles from 'react-particles-js';
import ElementStatic from '../components/element-static';
import { fetchMeta, selectTimeline } from '../actions';

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
    console.log(`this.props.meta${this.props.meta}`);
    if (this.props.meta !== 0) {
      return (this.props.meta.events.map((events) => {
        console.log(`events${events}`);
        return (
          <div>
            <div key={events.id} className="padding">
              <ElementStatic
                key={events.id}
                id={events.id}
                title={events.title}
                selectTimeline={this.props.selectTimeline}
                time={events.time}
                content={events.content}
              />
            </div>
            <div className="spacing" />
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

  render() {
    return (
      <div className="landing">
        <div className="landingBanner">
          <div className="landingText">
            <h1>Timeline</h1>
            <br />
            <h2>We help you know what you don’t</h2>
            <br />
            <NavLink to="/signup" className="link">
              <button type="button" className="buttonCTAwhite">
                Let’s Get Started
              </button>
            </NavLink>
          </div>
          <Particles className="particles" params={particlesOptions} />
        </div>
        <div className="backgroundImg">
          <div className="landingContainerTimeline">
            {this.renderTime()}
          </div>
        </div>
        <div className="landingFooter">
          <div className="footerText">
            <h5>What are you waiting for?</h5>
            <br />
            <NavLink to="/signup" className="link">
              <button type="button" className="buttonCTAwhite-alt">
                Sign Up Now
              </button>
            </NavLink>
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
  }
);


export default withRouter(connect(mapStateToProps, {
  fetchMeta, selectTimeline,
})(Landing));
