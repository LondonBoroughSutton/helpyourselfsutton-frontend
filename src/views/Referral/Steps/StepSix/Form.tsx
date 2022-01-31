import React, { Component, Fragment } from 'react';
import cx from 'classnames';

import ReferralStore from '../../../../stores/referralStore';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import html from '../../../../components/Html';
import { observer } from 'mobx-react';
import get from 'lodash/get';

interface IProps {
  referralStore: ReferralStore;
}

interface IState {
  open: boolean;
  touched: {};
  errors: any;
}

class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      touched: {
        referee_email: false,
        referee_phone: false,
      },
      errors: {
        referee_email: false,
        referee_phone: false,
      },
    };
  }

  toggleNoContactDetails = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  validate = async () => {
    const { referralStore } = this.props;

    if (
      !referralStore.referral.referee_email &&
      !referralStore.referral.referee_phone &&
      referralStore.referral.other_contact
    ) {
      return this.setState({
        errors: {
          referee_email: false,
          referee_phone: false,
        },
      });
    }

    const email = get(referralStore, 'referral.referee_email') || '';
    const phone = get(referralStore, 'referral.referee_phone') || '';

    return this.setState({
      errors: {
        referee_email: !email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        referee_phone: !phone.match(/^(0(\s*[0-9]\s*){10})$/),
      },
    });
  };

  handleSubmit = async () => {
    const { referralStore } = this.props;

    await this.validate();

    const canSubmit = Object.values(this.state.errors).every(error => error === false);

    if (canSubmit) {
      referralStore.nextStep();
    } else {
      return;
    }
  };

  handleBlur = (field: string) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  shouldMarkError = (field: string) => {
    // @ts-ignore
    const hasError = this.state.errors[field];
    // @ts-ignore
    const shouldShow = this.state.touched[field];
    return hasError ? shouldShow : false;
  };

  render() {
    const { referralStore } = this.props;

    const { open, errors } = this.state;

    return (
      <Fragment>
        <div className="referral__step-container">
          <div className="flex-col flex-col--12">
            <p className="body--s">{`Step 4 of ${referralStore.totalSteps}`}</p>
            <h2 className="referral__step-container__question">About You</h2>
            <p className="referral__step-container__subtitle">{`How you will be notified when ${get(
              referralStore,
              'service.name'
            )} makes contact with ${get(referralStore, 'referral.name')}`}</p>
          </div>
          <form className="referral__form">
            <div className="referral__form__field">
              <label className="referral__form__label" htmlFor="referee_email">Your email address (if you have one)</label>
              <Input
                id="referee_email"
                type="email"
                value={get(referralStore, 'referral.referee_email')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  referralStore.handleInput('referee_email', e.target.value)
                }
                className="referral__step-container--input"
                placeholder="john-smith@gmail.com"
                required={true}
                onBlur={() => this.handleBlur('referee_email')}
                error={errors.referee_email}
                errorMessage="Please enter a valid email adress"
              />
            </div>
            <div className="referral__form__field">
              <label className="referral__form__label" htmlFor="referee_phone">Your UK mobile number</label>
              <Input
                id="referee_phone"
                type="tel"
                value={get(referralStore, 'referral.referee_phone')}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  referralStore.handleInput('referee_phone', e.target.value)
                }
                className="referral__step-container--input"
                placeholder="01234 567 890"
                onBlur={() => this.handleBlur('referee_phone')}
                error={errors.referee_phone}
                errorMessage="Please enter a telephone number in the correct format - 11 characters"
              />
            </div>

            <div className="referral__form__field">
              <button
                aria-label="Select if you can't provide these details"
                onClick={() => this.toggleNoContactDetails()}
                className={cx('referral__step-container--other-contact--toggle', {
                  'referral__step-container--other-contact--toggle--open': !open,
                })}
                tabIndex={0}
                aria-pressed={open}
                onKeyDown={e => (e.key === 'Enter' ? this.toggleNoContactDetails() : null)}
              >
                You can't provide an email address or telephone number
              </button>
            </div>

            {open && ( 
              <div className="referral__form__field">
                <h3>Alternative way to contact you</h3>
                <label className="referral__form__label" htmlFor="other_contact">This could be your address, or an address where we can get in contact with you.</label>
                <div className="input--container">
                  <textarea
                    id="other_contact"
                    className="input"
                    style={{ height: 180 }}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      referralStore.handleInput('other_contact', e.target.value)
                    }
                    placeholder={'Some St\nSutton\nKT1 1UJ'}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </Fragment>
    );
  }
}

export default observer(Form);
