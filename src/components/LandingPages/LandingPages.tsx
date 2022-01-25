import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import ButtonLink from '../Button/ButtonLink';

import './LandingPages.scss';

import PageStore from '../../stores/pageStore';

interface IContent {
  id: string;
  title: string;
}

interface IProps {
  pageStore?: PageStore;
}

class LandingPages extends Component<IProps> {
  componentDidMount() {
    const { pageStore } = this.props;

    pageStore?.fetchLandingPages();
  }

  render() {
    const { pageStore } = this.props;

    if (!pageStore) {
      return null;
    }

    return (
      <section className="landing-pages">
        <div className="flex-container">
          <h2 className="landing-pages__heading h4">Browse area of interest</h2>
          <div className="landing-pages__items">
            {pageStore.pages?.map((page: IContent) => {
              return (
                <ButtonLink
                  href={'/' + page.id}
                  text={page.title}
                  key={page.id}
                />
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default inject('pageStore')(observer(LandingPages));
