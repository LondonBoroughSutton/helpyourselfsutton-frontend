import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import { observer, inject } from 'mobx-react';

import { getImg } from '../../utils/utils';
import Breadcrumb from '../../components/Breadcrumb';
import pageIllo from '../../assets/images/mother-and-son-walking.svg';
import ButtonLink from '../../components/Button/ButtonLink';
import Sitemap from '../../components/Sitemap';
import LastUpdatedAt from '../../components/LastUpdatedAt';
import PageStore from '../../stores/pageStore';
import { IPage, IPageTree } from '../../types/types';
import { getActive, buildPathFromTree } from '../../components/Sitemap/utils';

import './InformationPage.scss';

interface IProps {
  pageStore: PageStore;
  content: IPage;
}

const InformationPage: React.FunctionComponent<IProps> = ({ pageStore, content }) => {
  const [activeBranch, setActiveBranch] = useState<IPageTree[] | null>(null);

  // fetch the whole page tree / sitemap for Sutton
  useEffect(() => {
    if (content.landing_page) {
      pageStore.fetchPageTree(content.landing_page.id);
    }
  }, [pageStore, content.landing_page]);

  useEffect(() => {
    if (pageStore.pageTreeInner) {
      const currentActiveBranch = buildPathFromTree(pageStore.pageTreeInner, 'id', content.id);
      setActiveBranch(currentActiveBranch);
    }
  }, [pageStore.pageTreeInner, content.id]);

  return (
    <div className="information-page">
      <Helmet>
        {content.title && <title>{`${content.title} | Sutton Information Hub`}</title>}
        {!content.title && <title>Information Page | Sutton Information Hub</title>}
      </Helmet>
      <Breadcrumb
        crumbs={[
          { text: 'Home', url: '/' },
          {
            text: content.parent.title ? content.parent.title : 'Information Page',
            url: '/pages/' + content.parent.slug,
          },
          { text: content.title ? content.title : 'Information Page', url: '' },
        ]}
      />

      <section className="information-page__overview">
        <div className="flex-container">
          <div className="cms--contact-card">
            <div className="flex-container flex-container--no-padding">
              <div className="flex-col flex-col--8 landing-page__intro">
                {content.title && <h1 className="information-page__heading">{content.title}</h1>}
                {content.excerpt && (
                  <ReactMarkdown children={content.excerpt} className="information-page__content" />
                )}
              </div>

              <div className="flex-col flex-col--4 landing-page__image">
                <div className="parent-page-image">
                  {content.parent.image && (
                    <img
                      alt={content.parent.title ? content.parent.title : ''}
                      className="image"
                      src={getImg(content.parent.id)}
                    />
                  )}
                  {content.landing_page && (
                    <Link to={`/pages/${content.landing_page.slug}`} className="parent-title">
                      {content.landing_page.title}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-col flex-col--8 landing-page__intro">
            {content.image && (
              <img
                alt={content.title ? content.title : ''}
                className="article-image"
                src={getImg(content.id)}
              />
            )}

            {content.content.introduction!.content.map((contentBlock: any, index: number) => (
              <Fragment key={index}>
                {contentBlock.type === 'copy' && (
                  <ReactMarkdown
                    data-content="main"
                    children={contentBlock.value as string}
                    className="information-page__content markdown"
                  />
                )}
                {contentBlock.type === 'cta' && (
                  <div className="information-page__cta">
                    <h3>{contentBlock.title}</h3>
                    <p>{contentBlock.description}</p>
                    {contentBlock.url && contentBlock.buttonText && (
                      <div className="information-page__cta__button-wrap">
                        <ButtonLink text={contentBlock.buttonText} href={contentBlock.url} />
                      </div>
                    )}
                  </div>
                )}
              </Fragment>
            ))}

            {content.children.filter((child: IPage) => child.enabled).length > 0 && (
              <div>
                <h2 className="information-page__sub-heading">In this topic</h2>
                <div className="information-page__pages button__excerpt--peach">
                  {content.children
                    .filter((child: IPage) => child.enabled)
                    .sort((a: { order: number }, b: { order: number }) => a.order - b.order)
                    .map(
                      (page: {
                        id: string;
                        title: string;
                        icon: IconName;
                        excerpt: string;
                        slug: string;
                      }) => {
                        return (
                          <ButtonLink
                            href={'/pages/' + page.slug}
                            text={page.title}
                            key={page.id}
                            category={true}
                            icon={page.icon}
                            excerpt={{
                              isExcerpt: true,
                              text: page.excerpt,
                            }}
                          />
                        );
                      }
                    )}
                </div>
              </div>
            )}
          </div>
          <div className="flex-col flex-col--4">
            <div className="information-page__sitemap">
              {content.parent.title && <div className="parent-title">{content.parent.title}</div>}

              <div className="list-recursive__wrapper">
                {activeBranch &&
                  pageStore.pageTreeInner &&
                  pageStore.pageTreeInner.map((list: any) => {
                    return (
                      <div
                        key={list.id}
                        className={`${getActive(activeBranch, list.id) ? 'active-branch' : ''}`}
                      >
                        <Sitemap list={list} activeBranch={activeBranch} />
                      </div>
                    );
                  })}
              </div>

              {content.landing_page && (
                <Link
                  to={`/pages/${content.landing_page.slug}`}
                  className="information-page__sitemap__link"
                >
                  <FontAwesomeIcon icon="arrow-left" className="button__icon" />
                  Return to {content.landing_page.title}
                </Link>
              )}
            </div>
            <LastUpdatedAt time={content.updated_at} />
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-col flex-col--12 information-page__more">
            <div />
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
    </div>
  );
};

export default inject('pageStore')(observer(InformationPage));
