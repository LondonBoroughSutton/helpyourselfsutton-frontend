import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter, RouteComponentProps } from 'react-router';

import './Personas.scss';
import PersonasCard from '../PersonasCard';
import { IPersona } from '../../types/types';
import CMSStore from '../../stores/CMSStore';

import personasImage from '../../assets/images/personas-image.svg';

interface IProps extends RouteComponentProps {
  personas: IPersona[];
  cmsStore?: CMSStore;
}

const Personas: React.FunctionComponent<IProps> = ({ personas, history, cmsStore }) => {
  if (!cmsStore?.home || !personas.length) {
    return null;
  }

  return (
    <section className="personas">
      <div className="flex-container personas__content">
        <div className="personas__intro">
          {cmsStore.home.personas_title && (
            <h2 className="personas__heading">{cmsStore.home.personas_title}</h2>
          )}
          {cmsStore.home.personas_content && (
            <p className="personas__description">{cmsStore.home.personas_content}</p>
          )}
        </div>

        <div className="personas__list">
          {personas.map(persona => (
            <PersonasCard
              key={persona.id}
              persona={persona}
              url={`/results?persona=${persona.id}`}
            />
          ))}
        </div>
      </div>
      <div className="personas__image flex-container">
        <img
          src={personasImage}
          className="image"
          alt="A man walking" />
      </div>
    </section>
  );
};

export default withRouter(inject('cmsStore')(observer(Personas)));
