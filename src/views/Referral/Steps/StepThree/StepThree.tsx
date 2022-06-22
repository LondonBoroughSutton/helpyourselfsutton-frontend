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
    case 'Myself':
      return <Form label="Your full name" heading="About you" referralStore={referralStore} />;
    case 'A friend or family member':
      return (
        <Form
          label="Their full name"
          heading="About your Friend or Family Member"
          subtitle={`This is the person who will be contacted by ${get(
            referralStore,
            'service.name'
          )}`}
          referralStore={referralStore}
        />
      );
    case 'Someone else':
      return (
        <Form
          label="Their full name"
          heading="About the person being connected"
          subtitle={`This is the person who will be contacted by ${get(
            referralStore,
            'service.name'
          )}`}
          referralStore={referralStore}
        />
      );
    default:
      break;
  }
};

const StepThree: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return <Fragment>{chooseForm(referralStore)}</Fragment>;
};

export default inject('referralStore')(observer(StepThree));
