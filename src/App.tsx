import React, { Component } from 'react';
import ReactGA from 'react-ga';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';

import Home from './views/Home';
import NotFound from './views/NotFound/NotFound';
import Results from './views/Results';
import Service from './views/Service';
import Favourites from './views/Favourites';
import Referral from './views/Referral';
import About from './views/About';
import Contact from './views/Contact';
import GetInvolved from './views/GetInvolved';
import Privacy from './views/Privacy';

import Footer from './components/Footer/Footer';
import Header from './components/Header';

import './styles/grid.scss';

import WindowSizeStore from './stores/windowSizeStore';
import UIStore from './stores/uiStore';
import ResultsStore from './stores/resultsStore';
import ServiceStore from './stores/serviceStore';
import FavouritesStore from './stores/favouritesStore';
import CMSStore from './stores/CMSStore';
import ReferralStore from './stores/referralStore';
import Terms from './views/Terms';
import FeedbackModal from './components/FeedbackModal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import { withTracker } from './utils/withTracker';

// add all free font awesome icons to project
library.add(fas, fab);

const windowSizeStore = new WindowSizeStore();
const uiStore = new UIStore();
const resultsStore = new ResultsStore();
const serviceStore = new ServiceStore();
const favouritesStore = new FavouritesStore();
const cmsStore = new CMSStore();
const referralStore = new ReferralStore();

class App extends Component {
  componentDidMount() {
    windowSizeStore.setWindow();
    ReactGA.initialize('UA-124057892-1');
    // ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
      <Provider
        windowSizeStore={windowSizeStore}
        uiStore={uiStore}
        resultsStore={resultsStore}
        serviceStore={serviceStore}
        favouritesStore={favouritesStore}
        cmsStore={cmsStore}
        referralStore={referralStore}
      >
        <Router>
          <ScrollToTop>
            <Header />
            <Switch>
              <Route path="/" exact={true} component={withTracker(Home)} />
              <Route path="/results" component={withTracker(Results)} />
              <Route path="/services/:service" component={withTracker(Service)} />
              <Route path="/favourites" component={withTracker(Favourites)} />
              <Route path="/referral" component={withTracker(Referral)} />
              <Route path="/about" component={withTracker(About)} />
              <Route path="/contact" component={withTracker(Contact)} />
              <Route path="/get-involved" component={withTracker(GetInvolved)} />
              <Route path="/privacy-policy" component={withTracker(Privacy)} />
              <Route path="/terms-and-conditions" component={withTracker(Terms)} />
              <Route component={NotFound} />
            </Switch>
            <FeedbackModal />
            <Footer />
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default observer(App);
