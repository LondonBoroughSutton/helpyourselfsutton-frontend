import React, { Fragment } from 'react';
import { observer } from 'mobx-react';

import List from './List';

import ResultsStore from '../../../stores/resultsStore';
import { History } from 'history';
import Loading from '../../../components/Loading';

interface IProps {
  resultsStore: ResultsStore;
  history: History;
}

const ListView: React.FunctionComponent<IProps> = ({ resultsStore }) => {
  if (resultsStore.loading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <List resultsList={resultsStore.results} resultsStore={resultsStore} />
    </Fragment>
  );
};

export default observer(ListView);
