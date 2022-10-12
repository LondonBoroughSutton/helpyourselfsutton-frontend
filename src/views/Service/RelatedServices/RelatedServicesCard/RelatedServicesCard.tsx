import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import { IService } from '../../../../types/types';

// helpers
import { getServiceImg } from '../../../../utils/utils';

// components 
import Link from '../../../../components/Link';
import './RelatedServicesCard.scss';

interface IProps extends RouteComponentProps {
  service: IService;
}

const RelatedServicesCard: React.FunctionComponent<IProps> = ({ service, history }) => (
  <div className="related-services-card">
    <div className="flex-container flex-container--no-padding flex-container--no-wrap flex-container--align-center flex-container--space-between">
      <h3 className="h4">{service.name}</h3>
        <div className="related-services-card__logo mobile-hide">
          <img src={getServiceImg(service)} alt={`${service.name} logo`} />
        </div>
    </div>
    <p className="related-services-card__info">{service.intro}</p>
    <Link
      size="medium"
      text="Read more"
      icon="arrow-right"
      iconPosition="right"
      href={`/services/${service.slug}`}
    />
  </div>
);

export default withRouter(RelatedServicesCard);
