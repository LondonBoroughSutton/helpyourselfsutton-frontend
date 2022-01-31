import React, { Component, Fragment } from 'react';
import { observer } from 'mobx-react';
import get from 'lodash/get';
import cx from 'classnames';

import ReferralStore from '../../../../stores/referralStore';
import Input from '../../../../components/Input';
import Autocomplete from '../../../../components/Autocomplete';

interface IProps {
  referralStore: ReferralStore;
  label: string;
  heading: string;
  subtitle?: string;
  showPartnerOrgs?: boolean;
}

interface IState {
  open: boolean;
}

class Form extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {}

  toggleOrganisation = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  render() {
    const { heading, subtitle, label, referralStore, showPartnerOrgs } = this.props;
    const { open } = this.state;
    return (
      <div className="referral__step-container">
        <div className="flex-col flex-col--12">
          <p className="body--s">{`Step 1 of ${referralStore.totalSteps}`}</p>
          <h2 className="referral__step-container__question">{heading}</h2>
          {subtitle && <p className="referral__step-container__subtitle">{subtitle}</p>}
        </div>
        <form className="referral__form">
          <div className="referral__form__field">
            <label className="referral__form__label" htmlFor="name">{label}</label>
            <Input
              id="name"
              value={get(referralStore, 'referral.referee_name') || ''}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                referralStore.handleInput('referee_name', e.target.value)
              }
              className="referral__step-container--input"
              placeholder="John Smith"
              required={true}
            />
          </div>
          {showPartnerOrgs && (
            <Fragment>
              <div className="referral__form__field">
                <label className="referral__form__label" htmlFor="orderBy">Do you work for one of our partner organisations?</label>
                <div className="input--container">
                  <Autocomplete
                    storeTextField="organisation"
                    defaultText={get(referralStore, 'referral.organisation')}
                    defaultValue={get(referralStore, 'referral.organisation')}
                    store={referralStore}
                    endpointEntity="organisations"
                  />
                </div>
              </div>

              <div className="flex-col flex-col--12 referral__form">
                <button
                  aria-label="Select if you can't provide these details"
                  onClick={() => this.toggleOrganisation()}
                  className={cx('referral__step-container--other-contact--toggle', {
                    'referral__step-container--other-contact--toggle--open': !open,
                  })}
                  tabIndex={0}
                  aria-pressed={open}
                  onKeyDown={e => (e.key === 'Enter' ? this.toggleOrganisation() : null)}
                >
                  I can't see my organisation
                </button>

                {open && (
                  <div className="referral__form__field">
                    <label className="referral__form__label" htmlFor="organisation">Other organisation</label>
                    <Input
                      id="organisation"
                      value={get(referralStore, 'referral.organisation') || ''}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        referralStore.handleInput('organisation', e.target.value)
                      }
                      className="referral__step-container--input"
                    />
                  </div>
                )}
              </div>
            </Fragment>
          )}
        </form>
      </div>
    );
  }
}

export default observer(Form);
