import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';

import { IPage } from '../types/types';

export default class PageStore {
  @observable loading: boolean = false;
  @observable page: IPage | null = null;

  constructor() {
    makeObservable(this);
  }

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
