import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import ReferralStore from '../../../stores/referralStore';
import Checkbox from '../../../components/Checkbox';
import Button from '../../../components/Button';
import html from '../../../components/Html';

interface IProps {
  referralStore?: ReferralStore;
}

const TermsAndConditions: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <Fragment>
      <div className="referral__step-container">
        <div className="flex-col flex-col--12">
          <p className="body--s">{`Step 3 of ${referralStore.totalSteps}`}</p>
          <h2 className="referral__step-container__question">How we will use this information</h2>
        </div>
        <div className="referral__terms">
          <p className="referral__terms__section body--m">
            If you click <strong>I agree</strong> below, you are consenting to the following:
          </p>

          <ul className="referral__terms__section">
            <li>{`To have the information shared with ${get(referralStore, 'service.name')}`}</li>
            <li>{`For ${get(
              referralStore,
              'service.name'
            )} to contact you regarding the service you have connected with`}</li>
            <li>
              For the Sutton Information Hub admin team and/or the London Borough of Sutton to
              contact you/the client regarding your experience or to request feedback
            </li>

            <li>
              For the Sutton Information Hub admin team and/or the London Borough of Sutton to
              contact you to let you know about changes to our terms of service
            </li>

            <li>
              You confirm you have obtained the referred persons consent and they authorise you to
              refer them for {`${get(referralStore, 'service.name')}`}, where applicable
            </li>
          </ul>

          <p className="referral__terms__section body--s">
            For further information, please view our{' '}
            <Link className="link" to="/privacy-policy">
              privacy policy
            </Link>
          </p>

          <Checkbox
            label={`I agree, please proceed with the connection to ${get(
              referralStore,
              'service.name'
            )}`}
            id="referral_consented"
            checked={referralStore.referral.referral_consented}
            className="referral__terms__section input"
            onChange={() => referralStore.toggleConsent()}
          />
          <p className="referral__terms__section body--s">
            I do not agree, please{' '}
            <Link className="link" to="/">
              take me back
            </Link>
          </p>
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
              referralStore.submitReferral();
            }}
            disabled={!referralStore.referral.referral_consented}
          />
          <p
            dangerouslySetInnerHTML={{ __html: html(referralStore.stepDescription) }}
            className="body--s"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default inject('referralStore')(observer(TermsAndConditions));
