import React, { useState } from 'react';

import cx from 'classnames';
import { NavLink as RouterLink, withRouter } from 'react-router-dom';

import './Header.scss';

import Logo from '../../assets/logo/logo.svg';

import Button from '../Button';
import LinkButton from '../LinkButton';

function Header() {
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

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
              alt="Help Yourself Sutton" />
          </RouterLink>
        </figure>

        <button
          className={cx('nav-trigger tablet-show', {
            active: burgerMenuOpen,
          })}
          onClick={() => setBurgerMenuOpen(!burgerMenuOpen)}
          aria-label="Show mobile menu"
        >
          <span className="nav-trigger--button" />
          <i className="bars fa fa-bars" aria-hidden={true} title="Menu Trigger" />
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
                setBurgerMenuOpen(false)
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
                setBurgerMenuOpen(false)
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
                setBurgerMenuOpen(false)
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
                setBurgerMenuOpen(false)
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

export default withRouter(Header);
