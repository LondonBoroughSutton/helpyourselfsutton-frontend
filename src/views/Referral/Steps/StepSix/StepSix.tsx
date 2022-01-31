import React, { Fragment } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import ReferralStore from '../../../../stores/referralStore';

import Form from './Form';
import html from '../../../../components/Html';
import Button from '../../../../components/Button';

interface IProps {
  referralStore?: ReferralStore;
}

const StepSix: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <Fragment>
      <Form referralStore={referralStore} />

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

export default inject('referralStore')(observer(StepSix));
