import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import './LandingPage.scss';

import Breadcrumb from '../../components/Breadcrumb';

function LandingPage(props: any) {
  return (
    <main className="landing-page">
      <Helmet>
        <title>Landing Page | Help Yourself Sutton</title>
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          { text: 'Landing Page', url: '/landing-page' },
        ]}
      />
      <section className="landing-page__overview">
        <div className="flex-container">
          {console.log(props.content.content)}
          <div className="flex-col flex-col--7 landing-page__intro">
            {props.content.title && (
              <h1 className="landing-page__heading">{props.content.title}</h1>
            )}
            {props.content.content.introduction.copy && (
              <ReactMarkdown
                children={props.content.content.introduction.copy[0]}
                className="landing-page__content"
              />
            )}
          </div>
          <div className="flex-col flex-col--5">
            {props.content.image && (
              <img alt="" className="landing-page__image" src="https://via.placeholder.com/435x240.png" />
            )}
          </div>
          <div className="flex-col flex-col--7 landing-page__about">
            {props.content.content.about.copy[0] && (
              <ReactMarkdown
                children={props.content.content.about.copy[0]}
                className="landing-page__heading"
              />
            )}
            {props.content.content.about.copy[1] && (
              <ReactMarkdown
                children={props.content.content.about.copy[1]}
                className="landing-page__content"
              />
            )}
          </div>
          <div className="flex-col flex-col--5">
            <h2 className="landing-page__heading">Contact</h2>
          </div>
        </div>
      </section>
    </main>
  )
};

export default LandingPage;