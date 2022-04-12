import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CostCard.scss';

import { IService } from '../../../types/types';

interface IProps {
  service: IService;
}

const CostCard: React.FunctionComponent<IProps> = ({ service }) => (
  <div className="service__cost-card">
    <FontAwesomeIcon icon="credit-card" className="service__cost-card__icon" />
    <div className="service__cost-card__content">
      <h2 className="service__cost-card__title">{!service.is_free ? 'Cost' : 'Free'}</h2>
      <p className="service__cost-card__description">
        This {service.type} {service.is_free ? 'is free' : 'has a cost associated'}
      </p>
      {service.fees_url && (
        <p>
          <a href={service.fees_url} target="_blank" rel="noopener noreferrer">
            Further Pricing Details
          </a>
        </p>
      )}
    </div>
  </div>
);

export default CostCard;
