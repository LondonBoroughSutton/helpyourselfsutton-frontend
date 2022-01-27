import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';

import List from './List';
import CategoryList from '../../../components/CategoryList';

import ResultsStore from '../../../stores/resultsStore';
import SearchStore from '../../../stores/searchStore';
import { History } from 'history';
import Loading from '../../../components/Loading';

interface IProps {
  resultsStore: ResultsStore;
  history: History;
}

const ListView: React.FunctionComponent<IProps> = ({ resultsStore, history }) => {
  if (resultsStore.loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      {!!resultsStore.results.length ? (
        <List resultsList={resultsStore.results} resultsStore={resultsStore} />
      ) : (
        <div className="results__containerresults__container--no-results flex-container ">
          <div className={'results__container--no-results__suggestions'}>
            <h2>No results found</h2>
            <p>Take a look at the tips below which may help in getting more results</p>

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

          <div className="results__container results__container--no-results__categories flex-container">
            <h2>You might also find searching by category might be helpful:</h2>
            <CategoryList categories={SearchStore.categories} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default observer(ListView);
