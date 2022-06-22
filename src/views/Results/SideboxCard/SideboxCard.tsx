import React from 'react';
import { observer } from 'mobx-react';
import { ISidebox } from '../../../types/types';
import ReactMarkdown from 'react-markdown';

import './SideboxCard.scss';

interface IProps {
  sidebox: ISidebox;
}

const SideboxCard: React.FunctionComponent<IProps> = ({ sidebox }) => (
  <div className="sidebox-card">
    <h3 className="sidebox-card__heading">{sidebox.title}</h3>
    <ReactMarkdown children={sidebox.content} className="sidebox-card__content" />
  </div>
);

export default observer(SideboxCard);
