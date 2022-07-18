import React from 'react';
import { apiBase } from '../../config/api';

import './PersonasCard.scss';
import { IPersona } from '../../types/types';
import { inject, observer } from 'mobx-react';

interface IProps {
  persona: IPersona;
  url: string;
}

const PersonasCard: React.FunctionComponent<IProps> = ({ persona, url }) => (
  <a className="persona-card" href={url} aria-label={`Go to persona page: ${persona.name}`}>
    <div className="persona-card__image">
      <img
        src={`${apiBase}/collections/personas/${persona.id}/image.png?max_dimension=240`}
        alt={`Services relating to ${persona.name}`}
        className="image"
      />
    </div>
    <div className="persona-card__content">
      <h3 className="persona-card__header">{persona.name}</h3>
      <p className="persona-card__description">{persona.subtitle}</p>
    </div>
  </a>
);

export default inject('windowSizeStore')(observer(PersonasCard));
