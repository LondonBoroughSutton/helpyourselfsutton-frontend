import React, { FunctionComponent } from 'react';
import moment from 'moment';

import './LastUpdatedAt.scss';

interface IProps {
  time: string;
}

const LastUpdatedAt: FunctionComponent<IProps> = ({ time }) => {
  if (!time) return null;

  return (
    <p className="page__updated-at">
      Page last updated <strong>{moment(time).format('Do MMMM YYYY')}</strong>
    </p>
  );
};

export default LastUpdatedAt;
