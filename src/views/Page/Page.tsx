import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import './LandingPage.scss';

import pageStore from '../../stores/pageStore';

import LandingPage from './LandingPage';
import InformationPage from './InformationPage';

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

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const { pageStore, match } = this.props;

      pageStore.fetchPage(match.params.page);
    }
  }

  render() {
    const { pageStore } = this.props;
    const { page } = pageStore;

    return (
      page && (
        <main>
          {page.page_type === 'landing' && (
            <LandingPage content={page} />
          )}
          {page.page_type === 'information' && (
            <InformationPage content={page} />
          )}
        </main>
      )
    )
  }
}

export default inject('pageStore')(observer(Page));
