import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import './InformationPage.scss';

import Breadcrumb from '../../components/Breadcrumb';

// Import assets
import servicesIllo1 from '../../assets/images/lady-walking-a-dog.svg';
import servicesIllo2 from '../../assets/images/aeroplane-flying.svg';
import Button from '../../components/Button';

function InformationPage(props: any) {
  return (
    <main className="information-page">
      <Helmet>
        {props.content.title && (
          <title>{`${props.content.title} | Help Yourself Sutton`}</title>
        )}
        {!props.content.title && (
          <title>Information Page | Help Yourself Sutton</title>
        )}
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: props.content.parent.title ? props.content.parent.title : 'Information Page', url: '/' + props.content.parent.id },
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
            <div className="flex-col flex-col--12">
              <img alt={props.content.title} className="information-page__image" src={props.content.image} />
            </div>
          )}
          {props.content.content.introduction.copy && (
            <div className="flex-col flex-col--12">
              <ReactMarkdown
                children={props.content.content.introduction.copy[0]}
                className="information-page__content"
              />
            </div>
          )}
        </div>
      </section>
      
      {props.content.children.length && (
        <section className="information-page__other">
          <div className="flex-container">
            <div className="flex-col flex-col--12">
              <h2 className="information-page__sub-heading">Other pages in this section</h2>
            </div>
            <div className="flex-col flex-col--12 information-page__pages">
              {props.content.children.map((page: { id: string; title: string; }) => {
                return (
                  <Button
                    category={true}
                    text={page.title}
                    key={page.id}
                    size="small"
                    onClick={() => {}}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}
    </main>
  )
};

export default InformationPage;