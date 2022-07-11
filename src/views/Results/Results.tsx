import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Pagination from 'react-js-pagination';
import { observer, inject } from 'mobx-react';
import { History } from 'history';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import get from 'lodash/get';

import './Results.scss';

import ResultStore from '../../stores/resultsStore';
import SearchStore from '../../stores/searchStore';

import Category from './Filters/Category';
import ParamsFilter from './Filters/ParamsFilter/ParamsFilter';
import ViewFilters from './Filters/ViewFilter/ViewFilter';
import ListView from './ListView';
import MapView from './MapView';
import Breadcrumb from '../../components/Breadcrumb';
import map from 'lodash/map';
import SideboxCard from './SideboxCard';
import { IPage, ISidebox } from '../../types/types';
import Loading from '../../components/Loading';
import CategoryList from '../../components/CategoryList';
import Button from '../../components/Button/Button';
import ButtonLink from '../../components/Button/ButtonLink';
import ButtonLinkWithParent from '../../components/Button/ButtonWithParent';

import resultsImage from '../../assets/images/mother-and-son-walking.svg';

interface IProps {
  location: Location;
  resultsStore: ResultStore;
  history: History;
}

interface IState {
  showMoreInfo: boolean;
}

class Results extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      showMoreInfo: false,
    };
  }

  componentDidMount() {
    const { resultsStore } = this.props;

    resultsStore.getSearchTerms();
  }

  hasCategories = () => {
    const { resultsStore } = this.props;

    if (resultsStore.category) {
      return get(resultsStore, 'category.sideboxes', []);
    }

    if (resultsStore.persona) {
      return get(resultsStore, 'persona.sideboxes', []);
    }

    return null;
  };

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.search !== this.props.location.search) {
      const { resultsStore } = this.props;
      resultsStore.getSearchTerms();
    }
  }

  componentWillUnmount() {
    const { resultsStore } = this.props;

    resultsStore.clear();
  }

  toggleMoreInfo = () => {
    this.setState((prevState) => ({
      showMoreInfo: !prevState.showMoreInfo,
    }));
  };

  render() {
    const { resultsStore, history } = this.props;
    const { showMoreInfo } = this.state;

    return (
      <section className="results">
        <Helmet>
          <title>Search results | Sutton Information Hub</title>
          <meta
            name="description"
            content="Sutton Information Hub is a site dedicated to helping people find activities, join clubs, and navigate local services in Sutton"
          />
        </Helmet>
        <Breadcrumb
          crumbs={[
            { text: 'Home', url: '/' },
            {
              text: !resultsStore.isKeywordSearch
                ? resultsStore.category?.name
                  ? resultsStore.category?.name
                  : ''
                : 'Search results',
              url: '',
            },
          ]}
        />
        <section className="results__search-box">
          <div className="flex-container">
            <div
              className={
                'results__overview ' +
                (!resultsStore.isKeywordSearch
                  ? '_disabled-results__overview--category'
                  : 'results__overview--keyword')
              }
            >
              {!resultsStore.isKeywordSearch && <Category />}
              <ParamsFilter />
            </div>
          </div>
        </section>

        {resultsStore.pages.length > 0 && (
          <section className="results__info-boxes">
            <div className="flex-container">
              <h2 className="results__info-boxes__heading">
                Here's some information you might find useful
              </h2>
              <div className="results__info-boxes__items">
                {map(resultsStore.withAncestorPages.slice(0, 3), (page: IPage) => {
                  return (
                    <ButtonLinkWithParent
                      key={page.id}
                      text={page.title}
                      href={'/pages/' + page.slug}
                      icon="arrow-right"
                      parent={page.landing_page}
                    />
                  );
                })}
              </div>
              {resultsStore.withAncestorPages.length > 3 && showMoreInfo && (
                <div className="results__info-boxes__more-items">
                  {map(resultsStore.withAncestorPages.slice(3, 11), (page: IPage) => {
                    return (
                      <ButtonLinkWithParent
                        key={page.id}
                        text={page.title}
                        href={'/pages/' + page.slug}
                        icon="arrow-right"
                        parent={page.landing_page}
                      />
                    );
                  })}
                </div>
              )}
              {resultsStore.pages.length > 3 && (
                <div className="results__info-boxes__show-more">
                  <Button
                    text={`Show ${showMoreInfo ? 'less' : 'more'}`}
                    icon={showMoreInfo ? 'caret-up' : 'caret-down'}
                    onClick={() => this.toggleMoreInfo()}
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {this.hasCategories() && this.hasCategories().length !== 0 && (
          <section className="results__info-boxes">
            <div className="flex-container">
              <h2 className="results__info-boxes__heading">
                Here's some information you might find useful
              </h2>
              <div className="results__info-boxes__items">
                {map(this.hasCategories(), (sidebox: ISidebox, index) => {
                  return <SideboxCard sidebox={sidebox} key={index} />;
                })}
              </div>
            </div>
          </section>
        )}

        {resultsStore.loading ? (
          <Loading />
        ) : (
          <section className="results__wrapper">
            {!!resultsStore.results.length && (
              <div className="results__info">
                <div className="flex-container flex-container--align-start">
                  <div className="flex-col flex-col--12">
                    <h2 className="results__info__header">
                      Here's some services you might be interested in
                    </h2>
                  </div>
                  <div className="results__info__count">
                    {!!resultsStore.results.length && !resultsStore.loading && (
                      <p>
                        Your search:{' '}
                        {resultsStore.view === 'grid'
                          ? `${
                              resultsStore.totalItems > 25 ? 'Over 25' : resultsStore.totalItems
                            } results found`
                          : `${resultsStore.serviceWithLocations} results are shown on the map. Some results are not shown because they are only available online or by phone and not at a physical location.`}
                      </p>
                    )}
                  </div>
                  <ViewFilters resultsSwitch={true} />
                </div>
              </div>
            )}
            <div className="results__list">
              {!!resultsStore.results.length ? (
                resultsStore.view === 'grid' ? (
                  <div className="flex-container">
                    <ListView resultsStore={resultsStore} history={history} />
                  </div>
                ) : (
                  <MapView />
                )
              ) : (
                <div className="results__container--no-results flex-container">
                  <div className="flex-col flex-col--12">
                    <div className="results__container__heading">
                      <h2>No results found</h2>
                      <p>Take a look at the tips below which may help in getting more results</p>
                    </div>

                    <ul className={'info-cards'}>
                      <li>
                        <strong>Increase your distance from your location - </strong> E.g. from 5
                        miles to 10 miles
                      </li>
                      <li>
                        <strong>Try using a different word or term -</strong> E.g. Instead of care
                        homes try nursing home
                      </li>
                      <li>
                        <strong>Remove some of the filters</strong>{' '}
                      </li>
                      <li>
                        <strong>Browse the categories to discover relevant services</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-col flex-col--12">
                    <h2 className="results__container__heading">
                      You might also find searching by category might be helpful:
                    </h2>
                    <CategoryList categories={SearchStore.categories} />
                  </div>
                </div>
              )}
            </div>
            <div className="results__image flex-container flex-container--large">
              <img src={resultsImage} className="image" alt="Mother and son walking" />
            </div>
          </section>
        )}

        {resultsStore.totalItems > resultsStore.itemsPerPage && resultsStore.view === 'grid' && (
          <div className="results__pagination">
            <div className="flex-container">
              <Pagination
                activePage={resultsStore.currentPage}
                itemsCountPerPage={resultsStore.itemsPerPage}
                totalItemsCount={resultsStore.totalItems}
                pageRangeDisplayed={10}
                onChange={(pageNumber: number) => {
                  resultsStore.paginate(pageNumber);
                  history.push({
                    search: resultsStore.updateQueryStringParameter('page', pageNumber),
                  });
                }}
                prevPageText={
                  <span>
                    <FontAwesomeIcon icon="arrow-left" /> Prev page
                  </span>
                }
                nextPageText={
                  <span>
                    Next page <FontAwesomeIcon icon="arrow-right" />
                  </span>
                }
                innerClass="pagination"
                activeClass="pagination__item--active"
                activeLinkClass="pagination__link--active"
                itemClass="pagination__item"
                linkClass="pagination__link"
                linkClassPrev="pagination__link"
                linkClassNext="pagination__link"
                itemClassPrev="pagination__nav-prev"
                itemClassNext="pagination__nav-next"
                hideFirstLastPages={true}
              />
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default inject('resultsStore')(observer(Results));
