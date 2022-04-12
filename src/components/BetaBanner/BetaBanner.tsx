import React from 'react';

import './BetaBanner.scss';


const BetaBanner: React.FunctionComponent = () => {
  return (
    <div className="beta-banner">
      <p>The site is in Private Beta and if you find a issue or bug please{' '}
        <a
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfEdZWKC0kz1ht6qLRO1SGDWAmK2HzvAl7O-SxPzN9f7pzBOg/viewform`}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
          aria-label="Report an issue or bug here"
        >click here</a>{' '}
        to report it</p>
    </div>
  );
};

export default BetaBanner;
