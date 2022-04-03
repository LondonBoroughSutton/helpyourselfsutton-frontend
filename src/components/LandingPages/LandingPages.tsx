import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import { apiBase } from '../../config/api';

import ButtonLink from '../Button/ButtonLink';

import './LandingPages.scss';

import PageStore from '../../stores/pageStore';
import { IPage } from '../../types/types';

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

    const getImg = (pageId: string) => {
      return `${apiBase}/pages/${pageId}/image.png?max_dimension=120`;
    };

    return (
      <section className="landing-pages">
        <div className="flex-container">
          <h2 className="landing-pages__heading h4">Browse area of interest</h2>
          <div className="landing-pages__items">
            {pageStore.pages?.map((page: IPage) => {
              return (
                <ButtonLink
                  href={'/' + page.id}
                  text={page.title}
                  image={page.image ? getImg(page.id) : ""}
                  key={page.id}
                  category={true}
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
