import React from 'react';
import { observer } from 'mobx-react';

import { withRouter } from 'react-router';

import './LandingPages.scss';

function LandingPages() {
  return (
    <section className="landing-pages">
      <div className="flex-container">
        <h2 className="landing-pages__heading h4">Browse area of interest</h2>
        <div className="landing-pages__items">
          <div className="landing-pages__item">
            <img alt="" className="image" src="https://via.placeholder.com/70x106.png" />
            <h3>Family Information Services</h3>
          </div>
        </div>
      </div>
    </section>
  )
}

export default withRouter(observer(LandingPages));
