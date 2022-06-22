import React from 'react';
import { inject, observer } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import get from 'lodash/get';

import { membersAreaURL } from '../../config/externalUrls';

import './Footer.scss';

import Logo from '../../assets/logo/logo-footer.svg';

import CMSStore from '../../stores/CMSStore';
import UIStore from '../../stores/uiStore';

interface IProps {
  cmsStore?: CMSStore;
  uiStore?: UIStore;
}

const Footer: React.FunctionComponent<IProps> = ({ cmsStore, uiStore }) => {
  if (!uiStore || !cmsStore) {
    return null;
  }

  const facebookHandle = cmsStore?.global?.facebook_handle;
  const twitterHandle = cmsStore?.global?.twitter_handle;

  return (
    <footer className="footer">
      <div className="flex-container flex-container--large">
        <div className="flex-col flex-col--5 flex-col--tablet--12">
          <h2 className="footer__header h5">{get(cmsStore, 'global.footer_title')}</h2>
          <ReactMarkdown
            className="footer__content"
            children={get(cmsStore, 'global.footer_content')}
          />
          <Link className="footer__link" to="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="footer__link" to="/terms-and-conditions">
            Terms and Conditions
          </Link>
        </div>
        <div className="flex-col flex-col--6 flex-col--tablet--12">
          <div className="flex-container flex-container--no-padding">
            <div className="flex-col flex-col--6 flex-col--tablet--12 footer__contact">
              <h2 className="footer__header h5">
                Get in touch with
                <br />
                Sutton Information Hub
              </h2>
              <nav className="footer__social-links" aria-label="Social Media Links">
                {facebookHandle !== "#" && (
                  <a
                    href={`https://facebook.com/${facebookHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    aria-label="Link to Sutton Information Hub Facebook"
                    className="footer__link"
                  >
                    <FontAwesomeIcon icon={['fab', 'facebook']} className="footer__social-icons" />
                  </a>
                )}
                {twitterHandle !== '#' && (
                  <a
                    href={`https://twitter.com/${twitterHandle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="menuitem"
                    aria-label="Link to Sutton Information Hub Twitter"
                    className="footer__link"
                  >
                    <FontAwesomeIcon icon={['fab', 'twitter']} className="footer__social-icons" />
                  </a>
                )}
              </nav>
              <nav className="footer__contact-links">
                <Link className="footer__link" to={'/contact'}>
                  Contact us
                </Link>
                <button className="footer__link" onClick={() => uiStore.toggleFeedbackModal()}>
                  Give feedback
                </button>
              </nav>
            </div>

            <div className="flex-col flex-col--4 flex-col--tablet--12 footer__members">
              <a
                className="button button__link"
                href={membersAreaURL}
                target="_blank"
                rel="noopener nofollow noreferrer"
              >
                <span>Members Area</span>
              </a>
              <img src={Logo} alt="London Borough of Sutton" className="footer-logo" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default inject('cmsStore', 'uiStore')(observer(Footer));
