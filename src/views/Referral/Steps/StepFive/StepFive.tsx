import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import ReferralStore from '../../../../stores/referralStore';
import Button from '../../../../components/Button';
import html from '../../../../components/Html';
import Form from './Form';

interface IProps {
  referralStore?: ReferralStore;
}

const chooseForm = (referralStore: ReferralStore) => {
  switch (referralStore.whoFor) {
    case 'A friend or family member':
      return (
        <Form
          label="Your full name"
          heading="About you"
          subtitle={`You will be notified when ${get(
            referralStore,
            'service.name'
          )} makes contact with ${get(referralStore, 'referral.name')}.`}
          referralStore={referralStore}
        />
      );
    case 'Someone else':
      return (
        <Form
          label="Your full name"
          heading="About you"
          subtitle={`You will be notified when ${get(
            referralStore,
            'service.name'
          )} makes contact with ${get(referralStore, 'referral.name')}.`}
          referralStore={referralStore}
          showPartnerOrgs={true}
        />
      );
    default:
      break;
  }
};

const StepFive: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <Fragment>
      {chooseForm(referralStore)}
      <div className="referral__actions">
        <div className="flex-container flex-container--no-padding flex-container--column flex-container--align-start">
          <Button
            text="Continue"
            type="submit"
            icon="chevron-right"
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              referralStore.nextStep();
            }}
            disabled={!referralStore.referral.referee_name}
          />
          <p
            dangerouslySetInnerHTML={{__html: html(referralStore.stepDescription) }}
            className="body--s" />
        </div>
      </div>
    </Fragment>
  );
};

export default inject('referralStore')(observer(StepFive));
