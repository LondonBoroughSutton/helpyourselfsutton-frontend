import React from 'react';

import './HeaderAlertBanner.scss';

interface IProps {
  bannerContent: { __html: string };
}

const HeaderAlertBanner: React.FC<IProps> = ({ bannerContent }) => (
  <section className="header-alert-banner" dangerouslySetInnerHTML={bannerContent} />
);

export default HeaderAlertBanner;
