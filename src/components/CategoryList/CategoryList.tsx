import React from 'react';
import { observer } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import './CategoryList.scss';

import { ICategory } from '../../types/types';
import Button from '../Button';

interface IProps extends RouteComponentProps {
  categories: ICategory[];
  covid?: boolean;
  title?: string;
}

const CategoryList: React.FunctionComponent<IProps> = ({
  history,
  categories,
  covid = false,
  title,
}) => {
  if (!categories.length) {
    return null;
  }

  return (
    <section className="category-list">
      <div className="flex-container">
        {title && <h2 className="category-list__heading">{title}</h2>}
        <div className="category-list__items">
          {categories.map(({ name, id }) => {
            const image = require('../../assets/images/category-images/' + name.replace(/[, ]+/g, '-').toLowerCase() + '.svg');

            return (
              <Button
                category={true}
                text={name}
                key={id}
                image={image}
                onClick={() => {
                  history.push({
                    pathname: '/results',
                    search: `?category=${id}`,
                  });
                }}
                covid={covid}
              />
            );
          })}
        </div>
      </div>
    </section>
  )
};

export default withRouter(observer(CategoryList));
