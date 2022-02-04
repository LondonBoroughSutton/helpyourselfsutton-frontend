import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ReferralStore from '../../../../stores/referralStore';
import Button from '../../../../components/Button';
import html from '../../../../components/Html';
import Input from '../../../../components/Input';

interface IProps {
  referralStore: ReferralStore;
  label: string;
  heading: string;
  subtitle?: string;
}

class Form extends Component<IProps> {
  render() {
    const { heading, subtitle, label, referralStore } = this.props;

    return (
      <form className="referral__form">
        <div className="referral__step-container">
          <div className="flex-col flex-col--12">
            <p className="body--s">{`Step 1 of ${referralStore.totalSteps}`}</p>
            <h2 className="referral__step-container__question">{heading}</h2>
            {subtitle && <p className="referral__step-container__subtitle">{subtitle}</p>}
          </div>
          <div>
            <div className="referral__form__field">
              <label
                className="referral__form__label"
                htmlFor="name">{label}</label>
              <Input
                id="name"
                value={referralStore.referral.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  referralStore.handleInput('name', e.target.value)
                }}
                className="referral__step-container--input"
                placeholder="John Smith"
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="referral__actions">
          <div className="flex-container flex-container--no-padding flex-container--column flex-container--align-start">
            <Button
              text="Continue"
              type="submit"
              icon="chevron-right"
              onClick={() => referralStore.nextStep()}
              disabled={referralStore.step === 3 && !referralStore.referral.name}
            />
            <p
              dangerouslySetInnerHTML={{__html: html(referralStore.stepDescription) }}
              className="body--s" />
          </div>
        </div>
      </form>
    );
  }
}

export default observer(Form);
