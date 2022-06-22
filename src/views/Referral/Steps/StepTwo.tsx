import React from 'react';
import { observer, inject } from 'mobx-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import cx from 'classnames';

import ReferralStore from '../../../stores/referralStore';
import Button from '../../../components/Button';
import html from '../../../components/Html';

interface IProps {
  name: string;
  referralStore?: ReferralStore;
}

interface IButtonProps {
  text: 'Myself' | 'A friend or family member' | 'Someone else';
  subText: string;
  icon: IconName;
  setWho: (who: 'Myself' | 'A friend or family member' | 'Someone else') => void;
  active: boolean;
  smallPadding?: boolean;
  autoFocus?: boolean;
}

const ReferButton: React.FunctionComponent<IButtonProps> = observer(
  ({ icon, text, setWho, active, subText, smallPadding, autoFocus }) => (
    <button
      className={cx('referral__button', {
        'referral__button--active': active,
      })}
      aria-label={`Connect ${text}`}
      onClick={() => setWho(text)}
      autoFocus={autoFocus}
    >
      <FontAwesomeIcon icon={icon} className="referral__button__icon" />
      <h4 className="referral__button__title">{text}</h4>
      <p className="referral__button__description">{subText}</p>
    </button>
  )
);

const StepTwo: React.FunctionComponent<IProps> = ({ name, referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <div>
      <div className="referral__step-container">
        <h2 className="referral__step-container__question">{`Who would like to be connected to ${name}?`}</h2>
        <div className="referral__step-container__answers">
          <ReferButton
            icon="user"
            text="Myself"
            setWho={referralStore.setWhoFor}
            active={referralStore.whoFor === 'Myself'}
            subText="Filling in my own details"
            autoFocus={true}
          />
          <ReferButton
            icon="user-friends"
            text="A friend or family member"
            setWho={referralStore.setWhoFor}
            active={referralStore.whoFor === 'A friend or family member'}
            subText="Someone I know filling in my details"
            smallPadding={true}
          />
          <ReferButton
            icon="hands-helping"
            text="Someone else"
            setWho={referralStore.setWhoFor}
            active={referralStore.whoFor === 'Someone else'}
            subText="A client, customer, or member of the public"
          />
        </div>
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
            dangerouslySetInnerHTML={{ __html: html(referralStore.stepDescription) }}
            className="body--s"
          />
        </div>
      </div>
    </div>
  );
};

export default inject('referralStore')(observer(StepTwo));
