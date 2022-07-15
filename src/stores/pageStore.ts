import { makeObservable, observable, action, runInAction } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';

import { IPage, IPageTree, IPageTreeHashed } from '../types/types';

export default class PageStore {
  @observable loading: boolean = false;
  @observable pages: IPage[] | null = null;
  @observable page: IPage | null = null;
  @observable pageTree: IPage[] = [];
  @observable pageTreeFields: IPageTree[] | null = null;
  @observable pageTreeInner: IPageTree[] | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  fetchLandingPages = async () => {
    this.loading = true;
    try {
      const pagesData = await axios.get(`${apiBase}/pages?filter[page_type]=landing`);
      runInAction(() => {
        this.pages = get(pagesData, 'data.data').sort(
          (a: { order: number }, b: { order: number }) => a.order - b.order
        );
      });
    } catch (error) {
      this.loading = false;
    }
  };

  @action
  fetchPageTree = async (landingPageUuid: string) => {
    this.loading = true;
    try {
      // we use the include params parent for the site map tree and the ancestor for the landing page link at the bottom
      const pageTreeData = await axios.get(
        `${apiBase}/pages?filter[landing_page]=${landingPageUuid}&include=parent&include=landingPageAncestors`
      );
      runInAction(() => {
        this.pageTree = get(pageTreeData, 'data.data');
      });
      this.pageTreeFields = await this.setPageTreeFields(this.pageTree);
      this.pageTreeInner = await this.makePageTree(this.pageTreeFields);
    } catch (error) {
      this.loading = false;
    }
  };

  /** this picks the fields relevant for walking the page tree structure */
  @action
  setPageTreeFields = async (pageTree: IPage[]) => {
    if (!pageTree) return null;
    return pageTree.reduce((acc: IPageTree[], item: IPage) => {
      acc.push({
        id: item.id,
        filename: item.title,
        slug: item.slug,
        parent: item.parent.title,
        parentId: item.parent.id,
        children: null,
      });
      return acc;
    }, []);
  };

  /** this builds the tree structure for our sitemap */
  @action
  makePageTree = async (data: IPageTree[] | null) => {
    if (!data) return null;
    const tree = data
      .map((e: IPageTree) => ({ ...e }))
      .reduce((a: IPageTreeHashed, e: IPageTree) => {
        a[e.id] = a[e.id] || e;
        a[e.parentId] = a[e.parentId] || {};
        const parent = a[e.parentId];

        // @ts-ignore
        parent.children = parent.children || [];
        parent.children!.push(e);

        return a;
      }, {});
    // @ts-ignore
    return Object.values(tree).find((e) => e.id === undefined).children;
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
