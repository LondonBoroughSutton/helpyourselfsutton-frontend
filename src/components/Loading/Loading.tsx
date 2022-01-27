import React from 'react';
import { ReactSVG } from 'react-svg';

import Spinner from '../../assets/images/loading-spinner.svg';

import './Loading.scss';

const Loading: React.FunctionComponent = () => (
  <div className="loading">
    <h2>Loading...</h2>
    <ReactSVG src={Spinner} className="loading" />
  </div>
);

export default Loading;
