import { makeObservable, observable, runInAction, action } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';
import partition from 'lodash/partition';

import { apiBase } from '../config/api';
import { ICategory, IPersona } from '../types/types';

class SearchStore {
  @observable postcode: string = '';
  @observable search: string = '';
  @observable categories: ICategory[] = [];
  @observable personas: IPersona[] = [];
  @observable categoryId: string = '';
  @observable covidCategories: ICategory[] = [];

  constructor() {
    makeObservable(this);
    this.getCategories();
    this.getPersonas();
  }

  @action clear = () => {
    this.postcode = '';
    this.search = '';
    this.categoryId = '';
  };

  @action setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.categoryId = e.target.value;
  };

  @action
  getCategories = async () => {
    try {
      const categories = await axios.get(`${apiBase}/collections/categories/all`);
      let categoryList = get(categories, 'data.data', []);
      categoryList = categoryList.filter((category: any) => category.enabled === true);

      // temp addition for COVID-19
      const [covidCategories, normalCategories] = partition(categoryList, (category) =>
        category.name.includes('COVID-19:')
      );

      // sanitize category names by removing keyword for sorting
      covidCategories.forEach(
        (category) => (category.name = category.name.replace('COVID-19:', ''))
      );

      runInAction(() => {
        this.categories = normalCategories;
        this.covidCategories = covidCategories;
      });
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getPersonas = async () => {
    try {
      const personas = await axios.get(`${apiBase}/collections/personas`);
      const personasList = get(personas, 'data.data', []);
      runInAction(() => {
        this.personas = personasList.filter((persona: IPersona) => persona.enabled);
      });
    } catch (e) {
      console.error(e);
    }
  };

  @action onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (type === 'postcode') {
      this.postcode = e.target.value;
    }

    if (type === 'search') {
      this.search = e.target.value;
    }
  };
}

export default new SearchStore();
