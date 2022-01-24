import React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';

import './LandingPage.scss';

import Breadcrumb from '../../components/Breadcrumb';

// Import assets
import servicesIllo1 from '../../assets/images/lady-walking-a-dog.svg';
import servicesIllo2 from '../../assets/images/aeroplane-flying.svg';
import Button from '../../components/Button';

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
                className="landing-page__sub-heading"
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
            <h2 className="landing-page__sub-heading">Contact</h2>
            <div className="landing-page__contact">
              <div className="landing-page__contact__item">
                <h3 className="h4 landing-page__contact__item__title">Telephone</h3>
                <a
                  href="#"
                  className="landing-page__contact__item__link">123456789</a>
              </div>
              <div className="landing-page__contact__item">
                <h3
                  className="h4 landing-page__contact__item__title">Email</h3>
                <a
                  href="#"
                  className="landing-page__contact__item__link">test@test.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {props.content.children.length && (
        <section className="landing-page__information">
          <div className="flex-container">
            <div className="flex-col flex-col--12">
              {props.content.content.info_pages.title && (
                <h2 className="landing-page__sub-heading">{props.content.content.info_pages.title}</h2>
              )}
              {props.content.content.info_pages.copy[0] && (
                <ReactMarkdown
                  children={props.content.content.info_pages.copy[0]}
                  className="landing-page__content"
                />
              )}
            </div>
            <div className="flex-col flex-col--12 landing-page__pages">
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

      {props.content.collections && (
        <section className="landing-page__services">
          <div className="flex-container landing-page__services--wrapper">
            <div className="flex-col flex-col--12">
              {props.content.content.collections.title && (
                <h2 className="landing-page__sub-heading">{props.content.content.collections.title}</h2>
              )}
              {props.content.content.collections.copy[0] && (
                <ReactMarkdown
                  children={props.content.content.collections.copy[0]}
                  className="landing-page__content"
                />
              )}
            </div>
            <div className="flex-col flex-col--12 landing-page__collections">
              {props.content.collections.map((page: any) => {
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
          <div className="flex-col flex-container">
            <div className="landing-page__illustrations">
              <img
                src={servicesIllo1}
                className="image"
                alt="Lady walking a dog" />
              <img
                src={servicesIllo2}
                className="image"
                alt="Lady walking a dog" />
            </div>
          </div>
        </section>
      )}
    </main>
  )
};

export default LandingPage;