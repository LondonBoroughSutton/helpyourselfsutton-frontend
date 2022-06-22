import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import get from 'lodash/get';
import ReactMarkdown from 'react-markdown';

import { apiBase } from '../../config/api';

import './Organisation.scss';

import { IOrganisation, IService } from '../../types/types';
import OrganisationStore from '../../stores/organisationStore';

import SocialLinks from './SocialLinks';
import Loading from '../../components/Loading';
import ServiceCard from './ServiceCard/ServiceCard';
import NotFound from '../NotFound';

interface RouteParams {
  organisation: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  organisationStore: OrganisationStore;
}

const getImg = (organisation: IOrganisation) => {
  return organisation.has_logo ? `${apiBase}/organisations/${organisation.id}/logo.png?` : '';
};

class Organisation extends Component<IProps> {
  componentDidMount() {
    const { organisationStore, match } = this.props;
    organisationStore.fetchOrganisation(match.params.organisation);
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const { organisationStore, match } = this.props;
      organisationStore.fetchOrganisation(match.params.organisation);
    }
  }

  render() {
    const { organisationStore } = this.props;
    const { organisation, associatedServices } = organisationStore;

    // organisation not found
    if (organisationStore.loading === false && !organisation) {
      return <NotFound />;
    }

    return (
      organisation && (
        <main className="organisation">
          <Helmet>
            {get(organisation, 'name') && (
              <title>{`${get(organisation, 'name')} | Sutton Information Hub`}</title>
            )}
            {!get(organisation, 'name') && <title>Organisation | Sutton Information Hub</title>}

            {get(organisation, 'description') && (
              <meta name="description" content={get(organisation, 'description')} />
            )}

            {get(organisation, 'name') && (
              <meta property="og:title" content={`${get(organisation, 'name')}`} />
            )}
            {get(organisation, 'slug') && (
              <meta
                property="og:url"
                content={`${process.env.REACT_APP_FRONTEND_URL}/${get(organisation, 'slug')}`}
              />
            )}
            {getImg(organisation) && <meta property="og:image" content={getImg(organisation)} />}
            <meta property="og:type" content="website" />
          </Helmet>

          <section className={`organisation__header`}>
            <div className="flex-container">
              {organisation && organisation.has_logo && (
                <div className="organisation__header__logo">
                  <img src={getImg(organisation)} alt={`${organisation.name} logo`} />
                </div>
              )}
              <div className="organisation__header__content">
                <p className="organisation__header__sub">Organisation</p>
                <h1>{get(organisation, 'name')}</h1>
                {get(organisation, 'description') && (
                  <div className="organisation__header__description">
                    <ReactMarkdown className="" children={get(organisation, 'description')} />
                  </div>
                )}

                <ul className="organisation__header__contact-details">
                  {get(organisation, 'phone') && (
                    <li key={`key_${get(organisation, 'phone')}`}>
                      <p className="h5">Phone</p>
                      <a href={`tel:${get(organisation, 'phone')}`}>{get(organisation, 'phone')}</a>
                    </li>
                  )}
                  {get(organisation, 'url') && (
                    <li key={`key_${get(organisation, 'url')}`}>
                      <p className="h5">Website</p>
                      <a href={`${get(organisation, 'url')}`} target="_blank" rel="noreferrer">
                        {get(organisation, 'url')}
                      </a>
                    </li>
                  )}
                  {get(organisation, 'email') && (
                    <li key={`key_${get(organisation, 'email')}`}>
                      <p className="h5">Email</p>
                      <a href={`mailto:${get(organisation, 'email')}`}>
                        {get(organisation, 'email')}
                      </a>
                    </li>
                  )}
                  {organisationStore.hasSocials && (
                    <li key="key_organisation_social">
                      <p className="h5">Social media</p>
                      <SocialLinks organisationStore={organisationStore} />
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </section>
          {organisationStore.loading ? (
            <Loading />
          ) : (
            <section className="organisation__services">
              <div className="flex-container">
                <div className="flex-col flex-col--12">
                  <h2 className="organisation__services__heading h3">
                    Services provided by {get(organisation, 'name')}
                  </h2>
                </div>

                <div className="flex-col flex-col--12">
                  <div className="organisation__services__listing">
                    {associatedServices &&
                      associatedServices.map((service: IService) => (
                        <ServiceCard key={`key_${service.id}`} service={service} />
                      ))}
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      )
    );
  }
}

export default inject('organisationStore')(observer(Organisation));
