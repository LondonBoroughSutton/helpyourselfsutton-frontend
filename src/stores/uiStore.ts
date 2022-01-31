import { makeObservable, observable, action } from 'mobx';

export default class UIStore {
  @observable burgerMenuOpen: boolean = false;
  @observable feedbackModalOpen: boolean = false;
  @observable keywordEditOpen: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  toggleBurgerMenu = () => {
    this.burgerMenuOpen = !this.burgerMenuOpen;
  };

  @action
  toggleFeedbackModal = () => {
    this.feedbackModalOpen = !this.feedbackModalOpen;
  };

  @action
  toggleKeywordEdit = () => {
    this.keywordEditOpen = !this.keywordEditOpen;
  };
}
