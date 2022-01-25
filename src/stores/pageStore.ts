import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';

interface IContent {
  id: string;
  page_type: string;
  title: string;
  content: {
    introduction: {
      copy: []
    },
    about: {
      copy: []
    }
  }
}

export default class PageStore {
  @observable loading: boolean = false;
  @observable pages: IContent[] | null = null;
  @observable page: IContent | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  fetchLandingPages = async () => {
    this.loading = true;
    try {
      const pagesData = await axios.get(`${apiBase}/pages?filter[page_type]=landing`);
      runInAction(() => {
        this.pages = get(pagesData, 'data.data');
      });
    } catch (error) {
      this.loading = false;
    }
  };

  /**
   * Get page using the passed in page slug
   * @param slug
   */
  @action
  fetchPage = async (slug: string) => {
    this.loading = true;
    try {
      const pageData = await axios.get(`${apiBase}/pages/${slug}`);
      runInAction(() => {
        this.page = get(pageData, 'data.data');
      });
    } catch (error) {
      this.loading = false;
    }
  };
}
