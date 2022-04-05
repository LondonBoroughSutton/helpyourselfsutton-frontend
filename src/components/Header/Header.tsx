import React, { Component } from 'react';

import { observer, inject } from 'mobx-react';

import cx from 'classnames';
import { NavLink as RouterLink, withRouter, RouteComponentProps } from 'react-router-dom';

import './Header.scss';

import Logo from '../../assets/logo/logo.svg';

import Button from '../Button';
import LinkButton from '../LinkButton';

import UIStore from '../../stores/uiStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IProps extends RouteComponentProps {
  uiStore?: UIStore;
}

@inject('uiStore')
@observer
class Header extends Component<IProps> {
  render() {
    const { uiStore } = this.props;

    if (!uiStore) {
      return null;
    }

    const { burgerMenuOpen, toggleBurgerMenu, toggleFeedbackModal } = uiStore;

    return (
      <header
        className={cx('header', {
          active: burgerMenuOpen,
        })}
      >
        <div
          className={cx('header__actions tablet-hide', {
            'tablet-show': burgerMenuOpen,
          })}
        >
          <div className="flex-container">
            <div className="flex-col">
              <div id="google_translate_element"></div>
            </div>
            <div className="flex-col">
              <Button
                text="Give Feedback"
                header={true}
                icon="comment"
                onClick={() => toggleFeedbackModal()}
              />
            </div>
            <div className="flex-col">
              <LinkButton text="Favourites" to="/favourites" header={true} icon="star" />
            </div>
          </div>
        </div>
        <div className="header__main flex-container">
          <figure className="header__logo">
            <RouterLink to="/" aria-label="Home Link">
              <img
                src={Logo}
                className="logo"
                alt="Sutton Information Hub Logo - Mother in a hi-jab with their son, a teenage girl using a guide dog and an older person using a walking stick" />
            </RouterLink>
          </figure>

          <button
            className={cx('nav-trigger', {
              active: burgerMenuOpen,
            })}
            onClick={() => toggleBurgerMenu()}
            aria-label="Show mobile menu"
          >
            <span className="nav-trigger--button" />
            <FontAwesomeIcon
              icon={burgerMenuOpen ? 'times' : 'bars'}
            />
          </button>

          <nav
            className={cx('nav nav--primary flex-col', {
              'tablet-hide': !burgerMenuOpen,
            })}
            role="navigation"
            aria-label="Primary Navigation">
            <RouterLink
              exact={true}
              to="/"
              className="nav__link"
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
      </header>
    );
  }
}

export default withRouter(Header);
