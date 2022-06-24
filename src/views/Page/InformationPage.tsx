import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import { apiBase } from '../../config/api';

import './InformationPage.scss';

import Breadcrumb from '../../components/Breadcrumb';

// Import assets
import pageIllo from '../../assets/images/mother-and-son-walking.svg';
import ButtonLink from '../../components/Button/ButtonLink';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { IPage } from '../../types/types';

function InformationPage(props: any) {
  const getImg = (pageId: string) => {
    return `${apiBase}/pages/${pageId}/image.png?max_dimension=900`;
  };

  return (
    <div className="information-page">
      <Helmet>
        {props.content.title && <title>{`${props.content.title} | Sutton Information Hub`}</title>}
        {!props.content.title && <title>Information Page | Sutton Information Hub</title>}
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          {
            text: props.content.parent.title ? props.content.parent.title : 'Information Page',
            url: '/' + props.content.parent.id,
          },
          { text: props.content.title ? props.content.title : 'Information Page', url: '' },
        ]}
      />
      <section className="information-page__overview">
        <div className="flex-container">
          {props.content.title && (
            <div className="flex-col flex-col--12">
              <h1 className="information-page__heading">{props.content.title}</h1>
            </div>
          )}
          {props.content.image && (
            <div className="flex-col flex-col--12 information-page__image">
              <img alt={props.content.title} className="image" src={getImg(props.content.id)} />
            </div>
          )}
          {props.content.content.introduction.copy && (
            <div className="flex-col flex-col--12">
              <ReactMarkdown
                children={props.content.content.introduction.copy[0]}
                className="information-page__content markdown"
              />
            </div>
          )}
          <div className="flex-col flex-col--12 information-page__more">
            {pageIllo && (
              <div className="flex-col">
                <img
                  alt="Mum and child walking together"
                  className="information-page__illustration"
                  src={pageIllo}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {props.content.children.filter((child: IPage) => child.enabled).length > 0 && (
        <section className="information-page__other">
          <div className="flex-container">
            <div className="flex-col flex-col--12">
              <h2 className="information-page__sub-heading">Other pages in this section</h2>
            </div>
            <div className="flex-col flex-col--12 information-page__pages">
              {props.content.children
                .filter((child: IPage) => child.enabled)
                .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                .map((page: { id: string; title: string; icon: IconName }) => {
                  return (
                    <ButtonLink
                      href={'/' + page.id}
                      text={page.title}
                      key={page.id}
                      category={true}
                      icon={page.icon}
                    />
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default InformationPage;
