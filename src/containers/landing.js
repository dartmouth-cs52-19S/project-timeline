import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
            <h2>We help you know what you don't</h2>
          </div>
          <Particles className="particles" params={particlesOptions} />
        </div>
        <div className="landingContainerTimeline">
          {this.renderTime()}
        </div>
        <div className="landingFooter">
          <div className="footerText">
            <h5>What are you waiting for? Sign Up Now</h5>
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


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import TimeElement from './time-element';
// import TimeDetail from './time-detail';
// import { fetchMeta } from '../actions';

// // class Landing extends Component {
// //   constructor(props) {
// //     super(props);

// //     this.state = {
// //       regina: 'heyyyy regina',
// //     };
// //   }

// //   render() {
// //     console.log('in landing page');
// //     return (
// //       <div className="landing">
// //         {this.state.regina}
// //       </div>
// //     );
// //   }
// // }

// // export default withRouter(connect(null, null)(Landing));

// class Landing extends Component {
//   componentDidMount() {
//     this.props.fetchMeta();
//   }

//   render() {
//     console.log(`state of selected is${this.props.selected}`);
//     return (
//       <div>
//         <div className="foodHeader">
//           Discover the Possibilities
//         </div>
//         <div>
//           <BackButton
//             className="disabled-backbutton"
//             enabled="false"
//           />
//         </div>
//         <div className="flex">
//           <div className="flex-detail" />
//           <div className="flex-main">
//             <TimeElement />
//           </div>
//         </div>
//       </div>
//     );
// }

// const mapStateToProps = state => (
//   {
//     timeline: state.meta,
//     selected: state.selected,
//     addupdate: 0,
//   }
// );

// export default withRouter(connect(mapStateToProps,
//   { fetchTimeline, selectTimeline, onAddUpdate })(Landing));
