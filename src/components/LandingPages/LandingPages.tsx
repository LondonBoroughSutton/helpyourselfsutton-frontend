import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import ButtonLink from '../Button/ButtonLink';

import './LandingPages.scss';

import PageStore from '../../stores/pageStore';
import { IPage } from '../../types/types';
import { getImg } from '../../utils/utils';

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

    if (!pageStore || !pageStore?.pages?.length) {
      return null;
    }

    return (
      <section className="landing-pages">
        <div className="flex-container">
          <h2 className="landing-pages__heading">Browse area of interest</h2>
          <div className="landing-pages__items">
            {pageStore.pages?.map((page: IPage) => {
              return (
                <ButtonLink
                  href={'/pages/' + page.slug}
                  text={page.title}
                  image={page.image ? getImg(page.id, 120) : ''}
                  key={page.id}
                  category={true}
                />
              );
            })}
          </div>
        </div>
      </section>
    );
  }
}

export default inject('pageStore')(observer(LandingPages));
