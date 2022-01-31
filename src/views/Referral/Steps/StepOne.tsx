import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';

interface IProps {
  name: string;
}

const StepOne: React.FunctionComponent<IProps> = ({ name }) => (
  <div className="referral__intro">
    <div className="referral__intro__item">
      <div className="referral__intro__item__icon">
        <FontAwesomeIcon icon="envelope" />
      </div>
      <div>
        <p className="body--s"><strong>By completing this short form we will:</strong></p>
        <p className="body--m">{`Send the provided name and contact details to the organisers of ${name}.`}</p>
      </div>
    </div>
    <div className="referral__intro__item">
      <div className="referral__intro__item__icon">
        <FontAwesomeIcon icon="calendar" />
      </div>
      <div>
        <p className="body--s"><strong>Within 10 working days, <em>{name}</em> will:</strong></p>
        <p className="body--m">
          Get in touch to help access/provide more information about their service.
        </p>
      </div>
    </div>
    <div className="referral__intro__item">
      <div className="referral__intro__item__icon">
        <FontAwesomeIcon icon="user-friends" />
      </div>
      <div>
        <p className="body--m">
          You have the option to complete this form on someone else's behalf, with their
          permission.
        </p>
      </div>
    </div>
  </div>
);

export default observer(StepOne);
