import React from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';

import './LandingPage.scss';

import CMSStore from '../../stores/CMSStore';

import Breadcrumb from '../../components/Breadcrumb';

interface IProps {
  cmsStore: CMSStore;
}

const LandingPage: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <main className="landing-page">
      <Helmet>
        <title>LandingPage | Help Yourself Sutton</title>
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: 'Landing Page', url: '/landing-page' },
        ]}
      />
    </main>
  );
};

export default inject('cmsStore')(observer(LandingPage));
