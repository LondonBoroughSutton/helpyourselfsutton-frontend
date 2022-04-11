import React, { Fragment } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import ReferralStore from '../../../../stores/referralStore';

import Form from './Form';

interface IProps {
  referralStore?: ReferralStore;
}

const StepSix: React.FunctionComponent<IProps> = ({ referralStore }) => {
  if (!referralStore) {
    return null;
  }

  return (
    <Fragment>
      <Form referralStore={referralStore} />
    </Fragment>
  );
};

export default inject('referralStore')(observer(StepSix));
