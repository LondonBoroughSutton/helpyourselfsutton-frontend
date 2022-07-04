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
  excerpt?: {
    isExcerpt: boolean;
    text: string;
  };
}

const ButtonLink: React.FunctionComponent<IProps> = ({
  text,
  icon,
  image,
  href,
  target = '_self',
  category,
  excerpt,
}) => (
  <a
    className={cx('button', 'button__link', {
      button__category: category,
      button__excerpt: excerpt && excerpt.isExcerpt,
    })}
    href={href}
    target={target}
    rel={target === '_blank' ? 'noopener nofollow noreferrer' : undefined}
  >
    {image && <img src={image} alt={text} className="button__image" />}
    <div className="button__excerpt__title">{text}</div>
    {icon && <FontAwesomeIcon icon={icon} className={cx('button__icon')} />}
    {excerpt && excerpt.text && <div className="button__excerpt__text">{excerpt.text}</div>}
  </a>
);

export default ButtonLink;
