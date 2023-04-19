import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';

const RouteChangeTracker = ({ history }) => {
  if (!window.location.href.includes('localhost')) {
    history.listen((location, action) => {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    });
  }

  return <div></div>;
};

export default withRouter(RouteChangeTracker);
