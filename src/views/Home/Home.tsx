import React from 'react';
import { Helmet } from 'react-helmet';
import { inject, observer } from 'mobx-react';

import './Home.scss';

import SearchStore from '../../stores/searchStore';
import CMSStore from '../../stores/CMSStore';

import Banner from '../../components/Banner';
import Search from '../../components/Search';
import CategoryList from '../../components/CategoryList';
import Personas from '../../components/Personas';

interface IProps {
  cmsStore: CMSStore;
}

const Home: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  return (
    <main className="home">
      <Helmet>
        <title>Home | Help Yourself Sutton</title>
      </Helmet>
      {cmsStore.banner && (
        <Banner banner={cmsStore.banner} />
      )}
      <Search />
      {cmsStore.home && (
        <CategoryList
          categories={SearchStore.categories}
          title={cmsStore.home.categories_title}
        />
      )}
      <Personas personas={SearchStore.personas} />
    </main>
  );
};

export default inject('cmsStore')(observer(Home));
