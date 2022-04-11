import React from 'react';
import { inject, observer } from 'mobx-react';
import cx from 'classnames';

import Button from '../../../../components/Button';
import ResultsStore from '../../../../stores/resultsStore';
import './ViewFilter.scss';

interface IProps {
  resultsStore?: ResultsStore;
  resultsSwitch?: boolean;
}

const ViewFilters: React.FunctionComponent<IProps> = ({ resultsStore, resultsSwitch }) => {
  if (!resultsStore) {
    return null;
  }

  return (
    <div className={cx('results__view-filter')}>
      <h3 className="h4">{resultsSwitch ? ' View as' : 'View As'}</h3>
      <Button
        text="Grid"
        icon="th-large"
        alt={true}
        light={resultsStore.view === 'grid'}
        onClick={() => resultsStore.toggleView('grid')}
      />
      <Button
        text="Map"
        icon="map-marker-alt"
        alt={true}
        light={resultsStore.view === 'map'}
        onClick={() => resultsStore.toggleView('map')}
      />
    </div>
  );
};

export default inject('resultsStore')(observer(ViewFilters));
