import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import FavouritesStore from '../../stores/favouritesStore';
interface IProps {
  favouritesStore?: FavouritesStore;
}

const FavouriteShare: React.FunctionComponent<IProps> = ({ favouritesStore }) => {
  if (!favouritesStore) {
    return null;
  }

  return (
    <div className="favourites__share flex-container flex-container--no-padding flex-container--align-end">
      <div className="flex-col">
        <p>Share</p>
        <nav
          className="favourites__share__nav"
          aria-label="Social Share">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${
              window.origin
            }/favourites${favouritesStore.generateShareLink()}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Facebook"
          >
            <FontAwesomeIcon icon={['fab', 'facebook-f']} />
          </a>
          <a
            href={`http://twitter.com/share?text=Help Yourself Sutton&url=${
              window.origin
            }/favourites${favouritesStore.generateShareLink()}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Share to Twitter"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </a>
          <a
            role="button"
            href={window.location.href}
            onClick={() =>
              window.alert(`${window.origin}/favourites${favouritesStore.generateShareLink()}`)
            }
            aria-label="Share favourites via link"
          >
            <FontAwesomeIcon icon="link" />
          </a>
          <a
            href={`mailto:?subject=Help Yourself Sutton&amp;body=${
              window.origin
            }/favourites${favouritesStore.generateShareLink()}"`}
            aria-label="Email favourites link"
          >
            <FontAwesomeIcon icon="envelope" />
          </a>
        </nav>
      </div>
      <div className="flex-col favourites__share__print">
        <Button
          text="Print page"
          icon="print"
          alt={true}
          size="medium"
          onClick={() => window.print()}
        />
      </div>
    </div>
  );
};

export default inject('favouritesStore')(observer(FavouriteShare));
