import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import React from 'react';

import './Button.scss';

interface IProps {
  text: string;
  icon?: IconName;
  image?: string;
  href: string;
  target?: string;
  category?: boolean;
}

const ButtonLink: React.FunctionComponent<IProps> = ({
  text,
  icon,
  image,
  href,
  target = '_self',
  category,
}) => (
  <a
    className={cx('button', 'button__link', {
      button__category: category,
    })}
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener nofollow noreferrer' : undefined}
  >
    {image && <img src={image} alt={text} className="button__image" />}
    <span>{text}</span>
    {icon && <FontAwesomeIcon icon={icon} className={cx('button__icon')} />}
  </a>
);

export default ButtonLink;
