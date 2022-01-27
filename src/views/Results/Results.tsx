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
import { ISidebox } from '../../types/types';
import Loading from '../../components/Loading';
import CategoryList from '../../components/CategoryList';

interface IProps {
  location: Location;
  resultsStore: ResultStore;
  history: History;
}

class Results extends Component<IProps> {
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

  render() {
    const { resultsStore, history } = this.props;

    return (
      <section className="results">
        <Helmet>
          <title>Search results | Help Yourself Sutton</title>
          <meta
            name="description"
            content="Help Yourself Sutton is a site dedicated to helping people find activities, join clubs, and navigate local services in Sutton"
          />
        </Helmet>
        <Breadcrumb
          crumbs={[
            { text: 'Home', url: '/' },
            { text: 'Search results', url: '' },
          ]}
        />
        <div className="results__search-box">
          <div className="flex-container">
            {!resultsStore.isKeywordSearch && <h1 className="results__heading">Results for</h1>}
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
        </div>

        {resultsStore.loading ? (
          <Loading />
        ) : (
          <section className="results__wrapper">
            {!!resultsStore.results.length && (
              <div className="results__info">
                <div className="flex-container flex-container--align-center flex-container--large">
                  <div className="flex-col flex-col--12">
                    <h2 className="results__info__header">Here's some services you might be interested in</h2>
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
              {this.hasCategories() && this.hasCategories().length !== 0 && (
                <div className="results__category-sidebar">
                  {map(this.hasCategories(), (sidebox: ISidebox, index) => {
                    return <SideboxCard sidebox={sidebox} key={index} />;
                  })}
                </div>
              )}

              {!!resultsStore.results.length ? (
                resultsStore.view === 'grid' ? (
                  <ListView resultsStore={resultsStore} history={history} />
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
                        <strong>Increase your distance from your location - </strong> E.g. from 5 miles to
                        10 miles
                      </li>
                      <li>
                        <strong>Try using a different word or term -</strong> E.g. Instead of care homes try
                        nursing home
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
                    <h2 className="results__container__heading">You might also find searching by category might be helpful:</h2>
                    <CategoryList categories={SearchStore.categories} />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {(resultsStore.totalItems > resultsStore.itemsPerPage && resultsStore.view === 'grid') && (
          <div className="results__pagination">
            <div className="flex-container flex-container--large">
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
