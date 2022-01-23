import React, { FunctionComponent, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './BannerSlider.scss';

import ButtonLink from '../Button/ButtonLink';

interface IProps {
  banners: any[];
}

const BannerSlider: FunctionComponent<IProps> = ({ banners = [] }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);

  return (
    <section className="banner-slider">
      <div className="flex-container flex-container--justify flex-container--mobile-no-padding">
        {banners.length && (
          <div className="banner-slider__items">
            {banners.map((banner, i) => (
              <div
                key={i}
                className={'banner-slider__item' + (activeCarouselItem === i ? ' banner-slider__item--active' : '')}>
                {banner.title && (
                  <h2 className="banner-slider__item__title">{banner.title}</h2>
                )}
                <ReactMarkdown
                  className="banner-slider__item__description"
                  children={banner.content} />
                {banner.button_url && (
                  <div className="banner-slider__item__cta">
                    <ButtonLink
                      text={banner.button_text}
                      icon="arrow-right"
                      href={banner.button_url} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {banners.length && banners.length > 1 && (
          <div className="banner-slider__arrows">
            <button
              className="banner-slider__arrow arrow-left"
              disabled={activeCarouselItem <= 1 ? true : false}
              onClick={() => {
                setActiveCarouselItem(activeCarouselItem - 1);
              }}
            >
              <FontAwesomeIcon icon="chevron-left" />
              <span className="sr-only">Previous slide</span>
            </button>
            <button
              className="banner-slider__arrow arrow-right"
              disabled={activeCarouselItem >= banners.length ? true : false}
              onClick={() => {
                setActiveCarouselItem(activeCarouselItem + 1);
              }}
            >
              <FontAwesomeIcon icon="chevron-right" />
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BannerSlider;
