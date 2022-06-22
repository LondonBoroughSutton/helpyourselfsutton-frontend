import React from 'react';
import { inject, observer } from 'mobx-react';
import ReferralStore from '../../../stores/referralStore';
import get from 'lodash/get';
import { apiBase } from '../../../config/api';

interface IProps {
  referralStore?: ReferralStore;
}

const Confirmation: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <main className="referral__confirmation">
      <div className="flex-container flex-container--column flex-container--align-center">
        <div className="referral__confirmation__logo">
          <img
            src={`${apiBase}/organisations/${get(
              referralStore,
              'service.organisation_id'
            )}/logo.png?v=${get(referralStore, 'service.last_modified_at')}`}
            alt={`${get(referralStore, 'service.name')} logo`}
          />
        </div>
        <div className="referral__confirmation__heading">
          <h1 className="h3">{`You have successfully connected to ${get(
            referralStore,
            'service.name'
          )}`}</h1>
        </div>

        <div className="referral__confirmation__info">
          <h2 className="h4">What will happen now?</h2>
          <ul>
            <li>You will get an email and/or text with confirmation</li>
            <li>
              {` Within 10 working days, ${get(
                referralStore,
                'service.name'
              )} will be in touch with more information about
              accessing their service`}
            </li>
            <li>You will be kept up to date with the progress of the connection</li>
          </ul>

          <p>
            If you have any questions or issues, please contact the admin team at{' '}
            <a href="mailto:ia.hub@sutton.gov.uk">ia.hub@sutton.gov.uk</a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default inject('referralStore')(observer(Confirmation));
