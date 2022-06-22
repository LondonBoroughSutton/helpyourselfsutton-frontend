import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';
import { withRouter, RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ReferralStore from '../../stores/referralStore';

import './Referral.scss';
import Button from '../../components/Button';
import html from '../../components/Html';
import { apiBase } from '../../config/api';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo';
import StepThree from './Steps/StepThree';
import StepFour from './Steps/StepFour';
import TermsAndConditions from './Steps/TermsAndConditions';
import Confirmation from './Steps/Confirmation';
import StepFive from './Steps/StepFive/StepFive';
import StepSix from './Steps/StepSix';

interface IProps extends RouteComponentProps {
  referralStore?: ReferralStore;
}

class Referral extends Component<IProps> {
  componentDidMount() {
    const { location, referralStore } = this.props;

    if (!referralStore) {
      return;
    }

    const params = queryString.parse(location.search);
    const serviceId = get(params, 'service', '');

    if (params) {
      referralStore.getServiceInfo(serviceId as string);
    }
  }

  componentWillUnmount() {
    const { referralStore } = this.props;

    if (referralStore) {
      referralStore.clear();
    }
  }

  displayStep = () => {
    const { referralStore } = this.props;

    switch (get(referralStore, 'step')) {
      case 1:
        return <StepOne name={get(referralStore, 'service.name')} />;
      case 2:
        return <StepTwo name={get(referralStore, 'service.name')} />;
      case 3:
        return <StepThree />;
      case 4:
        return <StepFour />;
      case 5:
        if (get(referralStore, 'whoFor') === 'Myself') {
          return <TermsAndConditions />;
        }
        return <StepFive />;
      case 6:
        return <StepSix />;
      case 7:
        return <TermsAndConditions />;
      default:
        break;
    }
  };

  render() {
    const { referralStore } = this.props;

    if (!referralStore || !referralStore.service) {
      return null;
    }

    if (get(referralStore, 'showConfirmation')) {
      return <Confirmation />;
    }

    return (
      <main className="referral">
        <Helmet>
          <title>Referral | Sutton Information Hub</title>
        </Helmet>
        <section className="referral__back">
          <div className="flex-container">
            {referralStore.step === 1 ? (
              <Link to={`/services/${referralStore.service.slug}`}>
                <p className="body--s">
                  <FontAwesomeIcon icon="angle-left" />
                  Back to service
                </p>
              </Link>
            ) : (
              <p className="body--s" role="button" onClick={() => referralStore.goBackStep()}>
                <FontAwesomeIcon icon="angle-left" />
                Back
              </p>
            )}
          </div>
        </section>

        <section className="mobile-show tablet-show flex-col--mobile--12 flex-col--tablet--12">
          <h1 className="body--s">Connect to {referralStore.service.name}</h1>
        </section>

        <section className="referral__container">
          <div className="flex-container">
            <div className="flex-col flex-col--7">{this.displayStep()}</div>

            <aside className="referral__sidebar flex-col flex-col--5">
              <div className="referral__connect">
                <div className="flex-col flex-col--3">
                  <div className="referral__connect__logo">
                    <img
                      src={`${apiBase}/organisations/${referralStore.service.organisation_id}/logo.png?v=${referralStore.service.last_modified_at}`}
                      alt={`${referralStore.service.name} logo`}
                    />
                  </div>
                </div>
                <div className="flex-col flex-col--9">
                  <p>Your making a connection to:</p>
                  <h2 className="h5">{referralStore.service.name}</h2>
                </div>
              </div>

              {referralStore.step === 1 && (
                <div className="referral__time">
                  <FontAwesomeIcon icon="clock" />
                  <p>
                    This form should take no longer than <strong>5 minutes</strong> to complete.
                  </p>
                </div>
              )}
            </aside>
          </div>
        </section>

        {referralStore.step === 1 && (
          <section className="referral__actions">
            <div className="flex-container flex-container--column flex-container--align-start">
              <Button
                text="Continue"
                icon="chevron-right"
                onClick={() => referralStore.nextStep()}
              />
              <p
                dangerouslySetInnerHTML={{ __html: html(referralStore.stepDescription) }}
                className="body--s"
              />
            </div>
          </section>
        )}
      </main>
    );
  }
}

export default inject('referralStore')(withRouter(observer(Referral)));
