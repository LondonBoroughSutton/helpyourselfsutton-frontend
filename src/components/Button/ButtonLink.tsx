import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

import './Button.scss';

interface IProps {
  text: string;
  icon?: IconName;
  href: string;
  target?: string;
  category?: boolean;
}

const ButtonLink: React.FunctionComponent<IProps> = ({ text, icon, href, target = '_self', category }) => (
  <Link
    className={cx('button', 'button__link', {
      'button__category': category,
    })}
    to={href}
    target={target}>
    <span>{text}</span>
    {icon && <FontAwesomeIcon icon={icon} className={cx('button__icon')} />}
  </Link>
);

export default ButtonLink;
