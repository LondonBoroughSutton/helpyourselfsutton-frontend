import React, { useEffect } from 'react';
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
import { IPage, IPageTree, IPageTreeHashed } from '../../types/types';

import './InformationPage.scss';

const setPageTreeFields = (pageTree: IPage[]) =>
  pageTree.reduce((acc: IPageTree[], item: IPage) => {
    acc.push({
      id: item.id,
      filename: item.title,
      slug: item.slug,
      parent: item.parent.title,
      parentId: item.parent.id,
      children: null,
    });
    return acc;
  }, []);

const makePageTree = (data: IPageTree[]) => {
  const tree = data
    .map((e: IPageTree) => ({ ...e }))
    .reduce((a: IPageTreeHashed, e: IPageTree) => {
      a[e.id] = a[e.id] || e;
      a[e.parentId] = a[e.parentId] || {};
      const parent = a[e.parentId];
      // @ts-ignore
      parent.children = parent.children || [];
      parent.children!.push(e);
      return a;
    }, {});
  // @ts-ignore
  return Object.values(tree).find((e) => e.id === undefined).children;
};

interface IProps {
  pageStore: PageStore;
  content: IPage;
}

const InformationPage: React.FunctionComponent<IProps> = ({ pageStore, content }) => {
  useEffect(() => {
    if (content.landing_page) {
      pageStore.fetchPageTree(content.landing_page.id);
    }
  }, [pageStore, content.landing_page]);

  const pagesList = pageStore.pageTree && setPageTreeFields(pageStore.pageTree);
  const pageTree = pagesList && makePageTree(pagesList);

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
            {content.content.introduction!.content && (
              <div>
                <ReactMarkdown
                  data-content="main"
                  children={content.content.introduction!.content[0].value}
                  className="information-page__content markdown"
                />
              </div>
            )}

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
                {pageTree &&
                  pageTree.map((list: any) => (
                    <Sitemap key={list.id} list={list} activePage={content.id} />
                  ))}
              </div>
              <Link to={`/${content.parent.id}`} className="information-page__sitemap__link">
                <FontAwesomeIcon icon="arrow-left" className="button__icon" />
                Return to {content.parent.title}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex-container">
          <div className="flex-col flex-col--12 information-page__more">
            <LastUpdatedAt time={content.updated_at} />
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
