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
  <div className="persona-card">
    {url && (
      <a
        href={url}
        className="persona-card__link"
        aria-label={`Go to persona page: ${persona.name}`}><span className="sr-only">{`Go to persona page: ${persona.name}`}</span></a>
    )}
    <div className="persona-card__image">
      <img
        src={`${apiBase}/collections/personas/${persona.id}/image.png?max_dimension=240`}
        alt={`Services relating to ${persona.name}`}
        className="image"
      />
    </div>
    <div className="persona-card__content">
      <h3 className="persona-card__header">{persona.name}</h3>
      <p className="persona-card__description">{persona.intro}</p>
    </div>
  </div>
);

export default inject('windowSizeStore')(observer(PersonasCard));
