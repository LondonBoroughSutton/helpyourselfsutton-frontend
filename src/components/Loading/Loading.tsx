import React from 'react';
import { ReactSVG } from 'react-svg';

import Spinner from '../../assets/images/loading-spinner.svg';

import './Loading.scss';

const Loading: React.FunctionComponent = () => (
  <div className="loading">
    <p>Loading...</p>
    <ReactSVG src={Spinner} className="loading" />
  </div>
);

export default Loading;
