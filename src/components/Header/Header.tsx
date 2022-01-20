import React, { Component } from 'react';
// import { ReactSVG } from 'react-svg';
import { observer, inject } from 'mobx-react';
import cx from 'classnames';
import { NavLink as RouterLink, withRouter, RouteComponentProps } from 'react-router-dom';

import './Header.scss';

import Logo from '../../assets/logo/logo.svg';

import Button from '../Button';
import LinkButton from '../LinkButton';
import WindowSizeStore from '../../stores/windowSizeStore';
import UIStore from '../../stores/uiStore';
import Footer from '../Footer/Footer';

interface IProps extends RouteComponentProps {
  windowSizeStore?: WindowSizeStore;
  uiStore?: UIStore;
}

@inject('windowSizeStore', 'uiStore')
@observer
class Header extends Component<IProps> {
  render() {
    const { windowSizeStore, uiStore, location } = this.props;

    // injected stores must be typed as optional, but will always be there if injected. Allows workound for destructuring values from store
    if (!windowSizeStore || !uiStore) {
      return null;
    }

    const { isMobile } = windowSizeStore;
    const { burgerMenuOpen, toggleBurgerMenu, toggleFeedbackModal, keywordEditOpen } = uiStore;

    return (
      <header
        className={cx('header', {
          active: burgerMenuOpen,
        })}
      >
        <div
          className={cx('header__actions tablet-hide', {
            'mobile-hide tablet--large-hide medium-hide': burgerMenuOpen || keywordEditOpen,
          })}
        >
          <div className="flex-container flex-container--no-wrap flex-container--right">
            <div className="flex-col">
              <div id="google_translate_element" />
            </div>
            <div className="flex-col">
              <Button
                text="Give Feedback"
                header={true}
                icon="comment"
                onClick={() => uiStore.toggleFeedbackModal()}
              />
            </div>
            <div className="flex-col">
              <LinkButton text="Favourites" to="/favourites" header={true} icon="star" />
            </div>
          </div>
        </div>
        <div className="header__main flex-container flex-container--align-end">
          <figure className="header__logo">
            <RouterLink to="/" aria-label="Home Link">
              <img
                src={Logo}
                className="logo"
                alt="Help Yourself Sutton" />
            </RouterLink>
          </figure>

          <button
            className={cx('nav-trigger tablet-show', {
              active: burgerMenuOpen,
            })}
            onClick={() => toggleBurgerMenu()}
          >
            <span className="nav-trigger--button" />
            <i className="bars fa fa-bars" aria-hidden={true} title="Menu Trigger" />
            <span className="sr-only">Menu Trigger</span>
          </button>

          <div className="flex-col tablet-hide">
          <nav className="nav nav--primary" role="navigation" aria-label="Primary Navigation">
            <RouterLink
              exact={true}
              to="/"
              className="nav__link"
              activeClassName={cx({ 'link__header--active': !isMobile })}
              onClick={() => {
                if (burgerMenuOpen) {
                  toggleBurgerMenu();
                }
              }}
            >
              Home
            </RouterLink>
            <RouterLink
              to="/about"
              exact={true}
              className="nav__link"
              activeClassName={cx({ 'link__header--active': !isMobile })}
              onClick={() => {
                if (burgerMenuOpen) {
                  toggleBurgerMenu();
                }
              }}
            >
              About
            </RouterLink>
            <RouterLink
              to="/contact"
              className="nav__link"
              activeClassName={cx({ 'link__header--active': !isMobile })}
              onClick={() => {
                if (burgerMenuOpen) {
                  toggleBurgerMenu();
                }
              }}
            >
              Contact
            </RouterLink>
            <RouterLink
              to="/get-involved"
              className="nav__link"
              activeClassName={cx({ 'link__header--active': !isMobile })}
              onClick={() => {
                if (burgerMenuOpen) {
                  toggleBurgerMenu();
                }
              }}
            >
              Get Involved
            </RouterLink>
          </nav>
        </div>
        </div>

        {burgerMenuOpen && (
          <div className="header__footer">
            <Footer mobileMenu={true} />
          </div>
        )}
      </header>
    );
  }
}

export default withRouter(Header);
