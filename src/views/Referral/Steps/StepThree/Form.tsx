import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';

import ReferralStore from '../../../../stores/referralStore';
import Input from '../../../../components/Input';

interface IProps {
  referralStore: ReferralStore;
  label: string;
  heading: string;
  subtitle?: string;
}

class Form extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { heading, subtitle, label, referralStore } = this.props;

    return (
      <div className="referral__step-container">
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                referralStore.handleInput('name', e.target.value)
              }}
              className="referral__step-container--input"
              placeholder="John Smith"
              required={true}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default observer(Form);
