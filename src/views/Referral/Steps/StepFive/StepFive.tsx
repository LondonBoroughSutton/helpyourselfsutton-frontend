import React, { Fragment } from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';

import ReferralStore from '../../../../stores/referralStore';
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
    </Fragment>
  );
};

export default inject('referralStore')(observer(StepFive));
