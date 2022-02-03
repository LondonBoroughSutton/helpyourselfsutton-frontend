import React, { Fragment, Component } from 'react';
import { Helmet } from 'react-helmet';
import Button from '../../components/Button';
import { inject, observer } from 'mobx-react';
import queryString from 'query-string';

import { IService } from '../../types/types';

import FavouritesCard from './FavouritesCard';
import FavouriteShare from './FavouriteShare';

import './Favourites.scss';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import FavouritesStore from '../../stores/favouritesStore';
import CMSStore from '../../stores/CMSStore';
import get from 'lodash/get';
import Breadcrumb from '../../components/Breadcrumb';

interface IProps extends RouteComponentProps {
  favouritesStore: FavouritesStore;
  cmsStore: CMSStore;
}
class Favourites extends Component<IProps> {
  componentDidMount() {
    const { location, favouritesStore } = this.props;
    const { ids } = queryString.parse(location.search);

    if (ids) {
      favouritesStore.setFavourites(ids as string);
    } else {
      favouritesStore.getFavouritesFromStorage();
    }

    if (favouritesStore.favouritesList && favouritesStore.favouritesList.length) {
      favouritesStore.fetchFavourites();
    }
  }

  render() {
    const { favouritesStore, cmsStore, history } = this.props;

    return (
      <main className="favourites">
        <Helmet>
          <title>Favourites | Sutton Information Hub</title>
        </Helmet>

        <Breadcrumb
          crumbs={[
            { text: 'Home', url: '/' },
            { text: 'Favourites', url: '' },
          ]}
        />
        <section className="favourites__header">
          <div className="flex-container flex-container--align-center">
            <div className="flex-col flex-col--6">
              <h1 className="favourites__title">{get(cmsStore, 'favourites.title')}</h1>
              <p>{get(cmsStore, 'favourites.content')}</p>
            </div>
            <div className="flex-col flex-col--tablet--12 mobile-hide tablet-hide">
              <FavouriteShare />
            </div>
          </div>
        </section>

        <section className="favourites__content">
          <div className="flex-container flex-container--large">
            {!!favouritesStore.favourites.length ? (
              <Fragment>
                <div className="favourites__count">
                  <p>
                    <strong>{`${favouritesStore.favourites.length} results found`}</strong>
                  </p>
                </div>

                <div className="favourites__list">
                  {favouritesStore.favourites.map((favourite: IService) => {
                    return (
                      <FavouritesCard
                        key={favourite.id}
                        service={favourite}
                        locations={favouritesStore.getLocations(favourite.id)}
                        removeFavourite={favouritesStore.removeFavourite}
                      />
                    );
                  })}
                </div>
              </Fragment>
            ) : (
              <div className="favourites__no-favourites">
                <h2>No favourites saved</h2>
              </div>
            )}

            <div className="favourites__add-more">
              <Link to="/">
                <Button text="Add more" icon="plus" onClick={() => history.push('/')} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }
}

export default inject('favouritesStore', 'cmsStore')(withRouter(observer(Favourites)));
