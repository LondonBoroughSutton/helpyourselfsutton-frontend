import React from 'react';

import './BetaBanner.scss';

const BetaBanner: React.FunctionComponent = () => {
  return (
    <div className="beta-banner">
      <p>
        The site is in Beta. We would really like to hear your views,{' '}
        <a
          href={`https://docs.google.com/forms/d/e/1FAIpQLSfEdZWKC0kz1ht6qLRO1SGDWAmK2HzvAl7O-SxPzN9f7pzBOg/viewform`}
          target="_blank"
          rel="noopener noreferrer"
          role="menuitem"
        >
          please give us feedback if you find a bug or issue
        </a>{' '}
        whilst using the website.
      </p>
    </div>
  );
};

export default BetaBanner;
