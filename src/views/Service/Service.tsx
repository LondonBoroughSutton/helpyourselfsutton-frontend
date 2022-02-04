import React, { Component, Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import get from 'lodash/get';
import map from 'lodash/map';
import find from 'lodash/find';
import _orderBy from 'lodash/orderBy';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import cx from 'classnames';
import uniqueId from 'lodash/uniqueId';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { apiBase } from '../../config/api';

import './Service.scss';

import { removeQuotesRegex, capitalise } from '../../utils/utils';
import { IServiceLocation, IService } from '../../types/types';
import ServiceStore from '../../stores/serviceStore';
import UIStore from '../../stores/uiStore';

import AgeGroup from '../../assets/images/icons/who-is-this-for/age-group.svg';
import Disability from '../../assets/images/icons/who-is-this-for/disability.svg';
import Employment from '../../assets/images/icons/who-is-this-for/employment.svg';
import Gender from '../../assets/images/icons/who-is-this-for/gender.svg';
import Housing from '../../assets/images/icons/who-is-this-for/housing.svg';
import Income from '../../assets/images/icons/who-is-this-for/income.svg';
import Language from '../../assets/images/icons/who-is-this-for/language.svg';
import Other from '../../assets/images/icons/who-is-this-for/other.svg';

import CriteriaCard from './CriteriaCard';
import Accordian from '../../components/Accordian';
import LocationCard from './LocationCard';
import CostCard from './CostCard';
import VideoCard from './VideoCard';
import MapCard from './MapCard';
import ContactCard from './ContactCard';
import ShareCard from './ShareCard';
import ReferralCard from './ReferralCard';
import GalleryCard from './GalleryCard';
import { UsefulInfoCard, UsefulInfoCardAccordian } from './UsefulInfoCard';
import RelatedServices from './RelatedServices';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/Loading';
import ServiceDisabled from './ServiceDisabled';
import LinkButton from '../../components/LinkButton';
import Button from '../../components/Button';

import serviceImage from '../../assets/images/teenagers-hanging-out.svg';

interface RouteParams {
  service: string;
}

interface IProps extends RouteComponentProps<RouteParams> {
  serviceStore: ServiceStore;
  uiStore: UIStore;
}

const iconMap = [
  { 'Getting here': 'map-signs' },
  { 'Signing up': 'marker' },
  { 'Meeting up': 'handshake' },
  { 'What to wear': 'tshirt' },
  { 'What to bring': 'shopping-bag' },
  { 'How to get here': 'map-signs' },
  { Parking: 'car' },
  { 'Keeping updated': 'calendar-alt' },
  { 'Additional information': 'info-circle' },
];

const getImg = (service: IService) => {
  if (service.has_logo) {
    return `${apiBase}/services/${service.id}/logo.png?`;
  } else {
    return `${apiBase}/organisations/${get(service, 'organisation.id')}/logo.png?v=${get(
      service,
      'organisation.id'
    )}`;
  }
};

class Service extends Component<IProps> {
  componentDidMount() {
    const { serviceStore, match } = this.props;

    serviceStore.fetchService(match.params.service);
    serviceStore.fetchServiceEligibilities();
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      const { serviceStore, match } = this.props;

      serviceStore.fetchService(match.params.service);
    }
  }

  formatTestimonial = (testimonial: string) => {
    return `" ${testimonial.replace(removeQuotesRegex, '')} "`;
  };

  getAllTaxonomies = () => {
    const { serviceStore } = this.props;
    return serviceStore.serviceEligibilityTaxonomies;
  };

  getTaxonomyUUIDs = () => {
    const { serviceStore } = this.props;
    const { service } = serviceStore;
    return service && service.eligibility_types ? service.eligibility_types.taxonomies : null;
    // return (service && service.eligibility_types ? null : null)
  };

  // Takes in a string and returns associated concatenated string of taxonomies and custom eligibility if they exist
  getServiceEligibilityInfo = (name: string) => {
    const { serviceStore } = this.props;
    const { service } = serviceStore;

    // Get UUIDS from service.elgibility.taxonomies array
    const UUIDs: any = this.getTaxonomyUUIDs();

    // Gets all taxonomies
    const taxonomies = this.getAllTaxonomies();

    let relatedEligibilities: any = [];

    if (UUIDs && UUIDs.length && taxonomies) {
      // Traverse through UUIDS and then filter the array of taxonomies to find a match using the taxonomy ID
      UUIDs.forEach((uuid: string) => {
        const matchedTaxonomyParent = taxonomies.filter(taxonomy => taxonomy.name === name)[0];

        if (matchedTaxonomyParent && matchedTaxonomyParent.children) {
          const matchedTaxonomy: any =
            find(matchedTaxonomyParent.children.filter((taxonomy: any) => taxonomy.id === uuid)) ||
            null;
          if (matchedTaxonomy && matchedTaxonomy.name) {
            relatedEligibilities.push(matchedTaxonomy);
          }
        }
      });
    }

    const orderEligibilities = _orderBy(relatedEligibilities, 'order', 'asc');
    relatedEligibilities = orderEligibilities.map((eligibility: any) => eligibility.name);

    // Check service.elgibility.custom to see if there is a value for the passed in name
    if (service && service.eligibility_types.custom) {
      const customEligibility = get(
        service.eligibility_types.custom,
        `${name
          .split(' ')
          .join('_')
          .toLowerCase()}`
      );

      if (customEligibility) {
        relatedEligibilities.push(customEligibility);
      }
    }

    return relatedEligibilities.length ? relatedEligibilities.join(', ') : null;
  };

  render() {
    const { serviceStore } = this.props;
    const { service, locations, relatedServices, organisation } = serviceStore;

    if (!service) {
      return null;
    }

    // service is disabled
    if (service.status === 'inactive') {
      return <ServiceDisabled />;
    }

    return (
      <main className="service">
        <Helmet>
          {get(service, 'name') && (
            <title>{`${get(service, 'name')} | Sutton Information Hub`}</title>
          )}
          {!get(service, 'name') && <title>Service | Sutton Information Hub</title>}

          {get(service, 'intro') && <meta name="description" content={get(service, 'intro')} />}

          {get(service, 'name') && <meta property="og:title" content={`${get(service, 'name')}`} />}
          {get(service, 'slug') && (
            <meta
              property="og:url"
              content={`${process.env.REACT_APP_FRONTEND_URL}/${get(service, 'slug')}`}
            />
          )}
          {getImg(service) && <meta property="og:image" content={getImg(service)} />}
          <meta property="og:type" content="website" />
        </Helmet>

        <Breadcrumb
          crumbs={[
            { text: 'Home', url: '/' },
            { text: 'Search', url: '/' },
            { text: service.name, url: '' },
          ]}
        />
        <section className="service__header">
          <div className="flex-container">
            <div className="flex-col">
              <div className="service__header__logo">
                <img
                  src={getImg(service)}
                  alt={`${service.name} logo`} />
              </div>
            </div>
            <div className="flex-col">
              <p className="service__header__label">Service</p>
              <h1 className="service__header__heading">{get(service, 'name')}</h1>
              {organisation && organisation.slug && (
                <p className="service__header__description">
                  This service is run by the organisation{' '}
                  <Link
                    to={`/organisations/${organisation.slug}`}
                    aria-label="Home Link"
                    className="service__header__description__link">
                    {organisation.name}
                  </Link>
                  . View their organisation details and other listed services.
                </p>
              )}
              <div className="service__header__actions">
                {organisation && organisation.slug && (
                  <LinkButton
                    alt={true}
                    accent={true}
                    text="View organisation"
                    to={`/organisations/${organisation.slug}`}
                  />
                )}
                <Button
                  size="small"
                  text={serviceStore.favourite ? 'In your favourites' : 'Add to favourites'}
                  icon="star"
                  onClick={() => {
                    serviceStore.addToFavourites();
                  }}
                  disabled={serviceStore.favourite}
                />
              </div>
            </div>
          </div>
        </section>
        {serviceStore.loading ? (
          <Loading />
        ) : (
          <section className="service__info">
            <div className="flex-container">
              <article className="service__info__content">
                <div className="flex-container flex-container--align-center flex-container--no-padding service__section">
                  {serviceStore.hasCriteria && (
                    <div className="flex-col flex-col--12 flex-col--mobile--12 service__criteria">
                      <h2 className="service__heading">Who is it for?</h2>
                    </div>
                  )}
                  <div
                    className="criteria-cards service__section"
                    style={{ alignItems: 'stretch' }}
                  >
                    {this.getServiceEligibilityInfo('Age Group') && (
                      <CriteriaCard
                        svg={AgeGroup}
                        title="Age Group"
                        info={this.getServiceEligibilityInfo('Age Group')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Ethnicity') && (
                      <CriteriaCard
                        svg={Other}
                        title="Ethnicity"
                        info={this.getServiceEligibilityInfo('Ethnicity')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Disability') && (
                      <CriteriaCard
                        svg={Disability}
                        title="Disability"
                        info={this.getServiceEligibilityInfo('Disability')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Employment') && (
                      <CriteriaCard
                        svg={Employment}
                        title="Employment Status"
                        info={this.getServiceEligibilityInfo('Employment')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Gender') && (
                      <CriteriaCard
                        svg={Gender}
                        title="Gender"
                        info={this.getServiceEligibilityInfo('Gender')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Housing') && (
                      <CriteriaCard
                        svg={Housing}
                        title="Housing"
                        info={this.getServiceEligibilityInfo('Housing')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Income') && (
                      <CriteriaCard
                        svg={Income}
                        title="Income"
                        info={this.getServiceEligibilityInfo('Income')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Language') && (
                      <CriteriaCard
                        svg={Language}
                        title="Language"
                        info={this.getServiceEligibilityInfo('Language')}
                      />
                    )}

                    {this.getServiceEligibilityInfo('Other') && (
                      <CriteriaCard
                        svg={Other}
                        title="Other"
                        info={this.getServiceEligibilityInfo('Other')}
                      />
                    )}

                    <div className="flex-col flex-col--tablet--12 mobile-show tablet-show  service__info__cost">
                      <CostCard service={service} />
                    </div>
                  </div>

                  <div className="flex-container flex-container--align-center flex-container--no-padding service__media">
                    <div className="flex-col flex-col--mobile--12">
                      <h2 className="service__heading">{`What is this ${get(
                        service,
                        'type'
                      )}?`}</h2>
                    </div>
                    {!!service.gallery_items.length && (
                      <div className="flex-container flex-container--mobile-no-padding service__gallery">
                        <GalleryCard gallery={service.gallery_items} />
                      </div>
                    )}
                  </div>

                  <div className="flex-container flex-container--align-center service__section service__information">
                    <div className="flex-col flex-col--12 flex-col--mobile--12">
                      <ReactMarkdown
                        children={service.intro}
                        className="service__markdown service__markdown--intro"
                      />
                    </div>

                    <div className="flex-col flex-col--12 mobile-hide">
                      <h2 className="service__heading">What we offer?</h2>
                    </div>

                    {!!service.offerings.length && (
                      <div className="flex-col flex-col--12 service__offerings mobile-hide">
                        <ul>
                          {map(service.offerings, (offering: any, i) => (
                            <Fragment key={offering.offering}>
                              <li>{capitalise(offering.offering)}</li>
                            </Fragment>
                          ))}
                        </ul>
                      </div>
                    )}

                    <ReactMarkdown
                      children={service.description}
                      className={cx('service__markdown service__markdown--description mobile-hide', {
                        'service__markdown--description--tight': !service.offerings.length,
                      })}
                    />
                  </div>

                  {service.testimonial && (
                    <div className="service__section">
                      <div className="flex-container flex-container--no-padding">
                        <div className="flex-col flex-col--12">
                          <h2 className="service__heading">What people say</h2>
                        </div>

                        <figure className="flex-col flex-col--12 service__testimonial">
                          <blockquote className="body--xl">{this.formatTestimonial(service.testimonial)}</blockquote>
                        </figure>
                      </div>
                    </div>
                  )}

                  {!!locations.length && (
                    <div className="mobile-hide service__section">
                      <h2 className="service__heading">Where can I access this {service.type}?</h2>

                      {locations.map((location: IServiceLocation) => (
                        <LocationCard
                          location={location}
                          key={location.id}
                          className=""
                          desktop={true}
                        />
                      ))}
                    </div>
                  )}

                  {!!service.useful_infos.length && (
                    <div className="mobile-hide service__section">
                      <h2 className="service__heading">Good to know</h2>
                      {service.useful_infos.map((info: { title: string; description: string }) => {
                        const iconObj = find(iconMap, info.title);
                        const icon = get(iconObj, `${info.title}`);

                        return <UsefulInfoCard icon={icon} info={info} key={uniqueId()} />;
                      })}
                    </div>
                  )}

                  {service.referral_method !== 'none' && (
                    <div className="service__section mobile-show">
                      <ReferralCard service={service} />
                    </div>
                  )}

                  {!!locations.length && (
                    <Accordian
                      title={`Where is this ${service.type}?`}
                      className="service__accordian mobile-show"
                    >
                      <div className="service__map">
                        <MapCard iconType={service.type} locations={locations} />
                      </div>
                    </Accordian>
                  )}

                  <Accordian title={`What we offer?`} className="service__accordian mobile-show">
                    {!!service.offerings.length && (
                      <ul>
                        {map(service.offerings, (offering: any, i) => (
                          <Fragment key={offering.offering}>
                            <li>{capitalise(offering.offering)}</li>
                          </Fragment>
                        ))}
                      </ul>
                    )}
                    <ReactMarkdown
                      children={service.description}
                      className={cx('service__markdown service__markdown--description', {
                        'service__markdown--description--tight': !service.offerings.length,
                      })}
                    />
                  </Accordian>

                  <Accordian
                    title={`How can I contact this ${service.type}?`}
                    className="service__accordian mobile-show"
                  >
                    <ContactCard service={service} organisation={organisation} accordian={true} />
                  </Accordian>

                  {service.testimonial && (
                    <Accordian title="What people say" className="service__accordian mobile-show">
                      <div className="service__accordian-inner">
                        <div className="flex-container flex-container--mobile-no-padding flex-container--justify service__testimonial service__testimonial--mobile">
                          <div className="flex-col--1">
                            <FontAwesomeIcon icon="comment" />
                          </div>
                          <div className="flex-col--12">
                            <p>{this.formatTestimonial(service.testimonial)}</p>
                          </div>
                        </div>
                      </div>
                    </Accordian>
                  )}

                  {!!locations.length && (
                    <Accordian
                      title="Where can I access it?"
                      className="service__accordian mobile-show"
                    >
                      {locations.map((location: IServiceLocation) => (
                        <LocationCard
                          location={location}
                          key={location.id}
                          className="service__accordian-inner"
                        />
                      ))}
                    </Accordian>
                  )}

                  {!!service.useful_infos.length && (
                    <Accordian title="Good to know" className="service__accordian mobile-show">
                      {service.useful_infos.map((info: { title: string; description: string }) => {
                        const iconObj = find(iconMap, info.title);
                        const icon = get(iconObj, `${info.title}`);

                        return <UsefulInfoCardAccordian icon={icon} info={info} key={uniqueId()} />;
                      })}
                    </Accordian>
                  )}
                </div>
              </article>
              <aside className="service__sidebar">
                <div className="service__section tablet-hide">
                  <CostCard service={service} />
                </div>
                {service.video_embed && (
                  <VideoCard video={service.video_embed} width="100%" />
                )}
                {!!locations.length && (
                  <div className="service__section mobile-hide">
                    <h2 className="service__heading">{`Where is this ${service.type}?`}</h2>
                    <div className="service__map">
                      <MapCard iconType={service.type} locations={locations} />
                    </div>
                  </div>
                )}
                <div className="mobile-hide">
                  <h2 className="service__heading">{`How can I contact this ${service.type}?`}</h2>
                  <div className="service__section">
                    <ContactCard organisation={organisation} service={service} />
                  </div>
                  {service.referral_method !== 'none' && (
                    <div className="service__section mobile-hide">
                      <ReferralCard service={service} />
                    </div>
                  )}
                </div>
                <div className="service__section">
                  <ShareCard serviceStore={serviceStore} />
                </div>
                <div className="flex-container flex-container--justify flex-container--no-padding">
                  <p>
                    Page last updated{' '}
                    <strong>{moment(service!.updated_at).format('Do MMMM YYYY')}</strong>
                  </p>
                </div>
              </aside>
            </div>
            <div className="service__image flex-container flex-container--right flex-container--large">
              <img src={serviceImage} className="image" alt="Mother and son walking" />
            </div>
          </section>
        )}
        {relatedServices && <RelatedServices relatedServices={relatedServices} />}
      </main>
    );
  }
}

export default inject('serviceStore', 'uiStore')(observer(Service));
