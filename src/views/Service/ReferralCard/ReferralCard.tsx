import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../../../components/Button';
import { withRouter, RouteComponentProps } from 'react-router';
import { observer } from 'mobx-react';

import './ReferralCard.scss';
import { IService } from '../../../types/types';
import ButtonLink from '../../../components/Button/ButtonLink';

interface IProps extends RouteComponentProps {
  service: IService;
}

const ReferralCard: React.FunctionComponent<IProps> = ({ history, service }) => (
  <div className="flex-container flex-container--align-center service__referral">
    <div className="flex-col flex-col--12">
      {service.referral_method === 'external' && (
        <ButtonLink
          href={service.referral_url ? service.referral_url : ''}
          text="Make a connection"
          icon="arrow-right"
          target="_blank" />
      )}
      {service.referral_method === 'internal' && (
        <Button
          text="Make a connection"
          icon="arrow-right"
          onClick={() => history.push(`/referral?service=${service.id}`)}
        />
      )}
    </div>
    <div className="flex-col flex-col--12">
      <div className="service__refer-disclaimer">
        <div className="flex-col">
          <FontAwesomeIcon icon="info-circle" size="lg" />
        </div>
        <div className="flex-col">
          <p>
            It can take up to <strong>2 weeks</strong> to receive a reply
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default withRouter(observer(ReferralCard));
