import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import './LandingPage.scss';

import pageStore from '../../stores/pageStore';

import LandingPage from './LandingPage';

interface RouteParams {
  page: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  pageStore: pageStore;
}

class Page extends Component<IProps> {
  componentDidMount() {
    const { pageStore, match } = this.props;
    pageStore.fetchPage(match.params.page);
  }

  render() {
    const { pageStore } = this.props;
    const { page } = pageStore;

    // Check if page_type is Landing Page
      return (
        page && (
          <main>
            {page.page_type === 'landing' && (
              <LandingPage content={page} />
            )}
          </main>
        )
      )
  }
}

export default inject('pageStore')(observer(Page));
