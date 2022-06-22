import React, { Component } from 'react';
import cx from 'classnames';

import ReferralStore from '../../../../stores/referralStore';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import html from '../../../../components/Html';
import { observer } from 'mobx-react';

interface IProps {
  referralStore: ReferralStore;
  header: string;
  subtitle?: string;
  label1: string;
  label2: string;
  otherContactToggle: string;
  otherContactHeading: string;
  otherContactDescription: string;
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
        email: false,
        phone: false,
      },
      errors: {
        email: false,
        phone: false,
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
      !referralStore.referral.email &&
      !referralStore.referral.phone &&
      referralStore.referral.other_contact
    ) {
      return this.setState({
        errors: {
          email: false,
          phone: false,
        },
      });
    }

    return this.setState({
      errors: {
        email: !referralStore.referral.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
        phone: !referralStore.referral.phone.match(/^(0(\s*[0-9]\s*){10})$/),
      },
    });
  };

  handleSubmit = async () => {
    const { referralStore } = this.props;

    await this.validate();

    const canSubmit = Object.values(this.state.errors).every((error) => error === false);

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
    const {
      referralStore,
      header,
      subtitle,
      label1,
      label2,
      otherContactToggle,
      otherContactHeading,
      otherContactDescription,
    } = this.props;

    const { open, errors } = this.state;

    return (
      <form className="referral__form">
        <div className="referral__step-container">
          <div className="flex-col flex-col--12">
            <p className="body--s">{`Step 1 of ${referralStore.totalSteps}`}</p>
            <h2 className="referral__step-container__question">{header}</h2>
            {subtitle && <p className="referral__step-container__subtitle">{subtitle}</p>}
          </div>
          <div className="referral__form">
            <div className="referral__form__field">
              <label className="referral__form__label" htmlFor="email">
                {label1}
              </label>
              <Input
                id="email"
                type="email"
                value={referralStore.referral.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  referralStore.handleInput('email', e.target.value)
                }
                className="referral__step-container--input"
                placeholder="john-smith@gmail.com"
                required={true}
                onBlur={() => this.handleBlur('email')}
                error={errors.email}
                errorMessage="Please enter a valid email adress"
              />
            </div>
            <div className="referral__form__field">
              <label className="referral__form__label" htmlFor="phone">
                {label2}
              </label>
              <Input
                id="phone"
                type="tel"
                value={referralStore.referral.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  referralStore.handleInput('phone', e.target.value)
                }
                className="referral__step-container--input"
                placeholder="01234 567 890"
                onBlur={() => this.handleBlur('phone')}
                error={errors.phone}
                errorMessage="Please enter a telephone number in the correct format - 11 characters"
              />
            </div>

            <div className="referral__form__field">
              <button
                type="button"
                aria-label="Select if you can't provide these details"
                onClick={() => this.toggleNoContactDetails()}
                className={cx('referral__step-container--other-contact--toggle', {
                  'referral__step-container--other-contact--toggle--open': !open,
                })}
                tabIndex={0}
                aria-pressed={open}
                onKeyDown={(e) => (e.key === 'Enter' ? this.toggleNoContactDetails() : null)}
              >
                {otherContactToggle}
              </button>
            </div>

            {open && (
              <div className="referral__form__field">
                <h3>{otherContactHeading}</h3>
                <div>
                  <label className="referral__form__label" htmlFor="other_contact">
                    {otherContactDescription}
                  </label>
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
              </div>
            )}
          </div>
        </div>
        <div className="referral__actions">
          <div className="flex-container flex-container--no-padding flex-container--column flex-container--align-start">
            <Button
              text="Continue"
              type="submit"
              icon="chevron-right"
              onClick={(e: any) => {
                e.preventDefault();
                this.handleSubmit();
              }}
              disabled={
                referralStore.step === 4 &&
                !referralStore.referral.email &&
                !referralStore.referral.phone
              }
            />
            <p
              dangerouslySetInnerHTML={{ __html: html(referralStore.stepDescription) }}
              className="body--s"
            />
          </div>
        </div>
      </form>
    );
  }
}

export default observer(Form);
