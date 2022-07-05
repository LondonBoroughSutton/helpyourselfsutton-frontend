import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import { apiBase } from '../../config/api';

import './LandingPage.scss';

import Breadcrumb from '../../components/Breadcrumb';

// Import assets
import servicesIllo1 from '../../assets/images/lady-walking-a-dog.svg';
import servicesIllo2 from '../../assets/images/aeroplane-flying.svg';
import ButtonLink from '../../components/Button/ButtonLink';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { ICategory, IPage } from '../../types/types';

function LandingPage(props: any) {
  const getImg = (pageId: string) => {
    return `${apiBase}/pages/${pageId}/image.png?max_dimension=900`;
  };

  return (
    <div className="landing-page">
      <Helmet>
        {props.content.title && <title>{`${props.content.title} | Sutton Information Hub`}</title>}
        {!props.content.title && <title>Landing Page | Sutton Information Hub</title>}
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: props.content.title ? props.content.title : 'Information Page', url: '' },
        ]}
      />

      <section className="landing-page__overview">
        <div className="flex-container">
          <div className="cms--contact-card">
            <div className="flex-container">
              <div className="flex-col flex-col--8 landing-page__intro">
                {props.content.content.introduction.copy && (
                  <ReactMarkdown
                    children={props.content.content.introduction.copy[0]}
                    className="landing-page__content"
                  />
                )}
              </div>

              <div className="flex-col flex-col--4 landing-page__image">
                <div className='parent-page-image'>
                  {props.content.image && (
                    <img
                      alt={props.content.title ? props.content.title : ''}
                      className="image"
                      src={getImg(props.content.id)}
                    />
                  )}
                  {props.content.title && (
                    <div className='parent-title'>{props.content.title}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-col flex-col--8 landing-page__intro">
            {props.content.content.about.copy && (
              <ReactMarkdown
                children={props.content.content.about.copy}
                className="landing-page__content"
              />
            )}
          </div>

          {props.content.content.about.copy[0] && (
            <div className="flex-col flex-col--8 landing-page__about">
              <ReactMarkdown
                children={props.content.content.about.copy[0]}
                className="landing-page__content markdown"
              />
            </div>
          )}
          {props.content.content.about.copy[1] && (
            <div className="flex-col flex-col--4">
              <ReactMarkdown
                children={props.content.content.about.copy[1]}
                className="landing-page__content markdown"
              />
            </div>
          )}
        </div>
      </section>

      {props.content.children.length > 0 && (
        <section className="landing-page__information">
          <div className="flex-container">
            <div className="flex-col flex-col--12">
              {props.content.content.info_pages.title && (
                <h2 className="landing-page__sub-heading">
                  {props.content.content.info_pages.title}
                </h2>
              )}
              {props.content.content.info_pages.copy[0] && (
                <ReactMarkdown
                  children={props.content.content.info_pages.copy[0]}
                  className="landing-page__content"
                />
              )}
            </div>
            <div className="flex-col flex-col--12 landing-page__pages">
              {props.content.children
                .filter((child: IPage) => child.enabled)
                .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                .map((page: { id: string; title: string; excerpt: string }) => {
                  return (
                    <>
                      <ButtonLink
                        href={'/' + page.id}
                        text={page.title}
                        key={page.id}
                        category={true}
                        excerpt={{ isExcerpt: true, text: page.excerpt }}
                      />
                    </>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {props.content.collection_categories.length > 0 && (
        <section className="landing-page__services">
          <div className="flex-container landing-page__services--wrapper">
            <div className="flex-col flex-col--12">
              {props.content.content.collections.title && (
                <h2 className="landing-page__sub-heading">
                  {props.content.content.collections.title}
                </h2>
              )}
              {props.content.content.collections.copy[0] && (
                <ReactMarkdown
                  children={props.content.content.collections.copy[0]}
                  className="landing-page__content"
                />
              )}
            </div>
            <div className="flex-col flex-col--12 landing-page__collections">
              {props.content.collection_categories
                .filter((category: ICategory) => category.enabled)
                .map((page: { id: string; name: string; icon: IconName }) => {
                  return (
                    <ButtonLink
                      href={'/results?category=' + page.id}
                      text={page.name}
                      key={page.id}
                      category={true}
                      image={`${apiBase}/collections/categories/${page.id}/image.svg`}
                    />
                  );
                })}
            </div>
          </div>
          <div className="flex-col flex-container">
            <div className="landing-page__illustrations">
              <img src={servicesIllo1} className="image" alt="Lady walking a dog" />
              <img
                src={servicesIllo2}
                className="image"
                alt="An aeroplane flying over power lines"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default LandingPage;
