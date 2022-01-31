import React from 'react';
import { inject, observer } from 'mobx-react';
import get from 'lodash/get';
import ReferralStore from '../../../stores/referralStore';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import html from '../../../components/Html';

interface IProps {
  referralStore?: ReferralStore;
}

interface IStepThreeInputProps {
  referralStore: ReferralStore;
  label: string;
  heading: string;
  subtitle?: string;
}

const StepThreeInput: React.FunctionComponent<IStepThreeInputProps> = ({
  referralStore,
  label,
  heading,
  subtitle,
}) => (
  <div className="flex-container flex-container--no-padding">
    <div className="flex-col flex-col--12">
      <p className="body--s">{`Step 1 of ${referralStore.totalSteps}`}</p>
      <h2 className="referral__step-container__question">{heading}</h2>
      {subtitle && <p className="referral__step-container__subtitle">{subtitle}</p>}
    </div>
    <form className="referral__form">
      <div className="referral__form__field">
        <label
          className="referral__form__label"
          htmlFor="name">{label}</label>
        <Input
          id="name"
          value={referralStore.referral.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => referralStore.handleInput('name', e.target.value)}
          className="referral__step-container--input"
          placeholder="John Smith"
          required={true}
        />
      </div>
    </form>
  </div>
);

const chooseForm = (referralStore: ReferralStore) => {
  switch (referralStore.whoFor) {
    case 'Myself':
      return (
        <StepThreeInput label="Your full name" heading="About you" referralStore={referralStore} />
      );
    case 'A friend or family member':
      return (
        <StepThreeInput
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
        <StepThreeInput
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

  return (
    <div>
      <div className="referral__step-container">
        {chooseForm(referralStore)}
      </div>

      <div className="referral__actions">
        <div className="flex-container flex-container--no-padding flex-container--column flex-container--align-start">
          <Button
            text="Continue"
            type="submit"
            icon="chevron-right"
            onClick={() => referralStore.nextStep()}
            disabled={referralStore.step === 2 && !referralStore.whoFor}
          />
          <p
            dangerouslySetInnerHTML={{__html: html(referralStore.stepDescription) }}
            className="body--s" />
        </div>
      </div>
    </div>
  );
};

export default inject('referralStore')(observer(StepThree));
