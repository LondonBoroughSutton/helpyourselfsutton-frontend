import React from 'react';
import { Link } from 'react-router-dom';
import { IconName } from '@fortawesome/fontawesome-common-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';

import { getImg } from '../../utils/utils';

import './Button.scss';
import { NumberLiteralType } from 'typescript';

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
  parent?: {
    title: string;
    slug: string;
    id: string | null;
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
  parent
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
    {parent && (
      <p className="button__excerpt__parent">Part of 
        <Link to={`/pages/${parent.slug}`}> {parent.title}</Link>
        {parent.id}
        <div>
          <img
            alt={parent.title ? parent.title : ''}
            className="image"
            src={getImg(parent.id as string, 120)}
          />
        </div>
      </p>
    )}
  </a>
);

export default ButtonLink;
