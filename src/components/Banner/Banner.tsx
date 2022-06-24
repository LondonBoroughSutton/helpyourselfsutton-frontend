import React, { FunctionComponent } from 'react';
import ReactMarkdown from 'react-markdown';

import ButtonLink from '../Button/ButtonLink';

import './Banner.scss';
import { IBanner } from '../../types/types';

import bannerIllo from '../../assets/images/banner-image.svg';

interface IProps {
  banner: IBanner;
  activeCarouselItem?: number;
  bannerIndex?: number;
}

const Banner: FunctionComponent<IProps> = ({ banner, activeCarouselItem, bannerIndex }) => {
  return (
    <section className="banner">
      <div className="flex-container">
        <div className="banner__content">
          <h1 className="banner__title">{banner.title}</h1>
          <ReactMarkdown className="banner__description" children={banner.content} />
          {banner.button_url !== 'https://suttoninformationhub.org.uk' && (
            <div className="banner__cta">
              <ButtonLink text={banner.button_text} icon="arrow-right" href={banner.button_url} />
            </div>
          )}
        </div>
      </div>
      <div className="banner__image">
        <img
          src={bannerIllo}
          alt="Mother in a hi-jab with their son, a teenage girl using a guide dog and an older person using a walking stick"
        />
      </div>
    </section>
  );
};

export default Banner;
