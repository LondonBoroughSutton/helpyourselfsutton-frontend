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
import LandingPages from '../../components/LandingPages';
import BannerSlider from '../../components/BannerSlider';

interface IProps {
  cmsStore: CMSStore;
}

const Home: React.FunctionComponent<IProps> = ({ cmsStore }) => {
  if (!cmsStore) {
    return null;
  }

  const categories = SearchStore.categories.filter(category => category.homepage);
  const personas = SearchStore.personas.filter(persona => persona.homepage);

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
        <BannerSlider banners={cmsStore.home.banners} />
      )}
      <LandingPages />
      {cmsStore.home && (
        <CategoryList
          categories={categories}
          title={cmsStore.home.categories_title}
        />
      )}
      <Personas personas={personas} />
    </main>
  );
};

export default inject('cmsStore', 'pageStore')(observer(Home));
