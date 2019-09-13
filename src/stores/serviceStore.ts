import { observable, action } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';
import { IService, ILocation } from '../types/types';

export default class ServiceStore {
  @observable service: IService | null = null;
  @observable locations: ILocation[] = [];
  @observable loading: boolean = false;
  @observable relatedServices: IService[] | null = null;

  @action
  fetchService = async (name: string) => {
    this.loading = true;
    const serviceData = await axios.get(`${apiBase}/services/${name}?include=organisation`);
    this.service = get(serviceData, 'data.data');

    this.getServiceLocations();
    this.getRelatedServices(name);
  };

  @action
  getServiceLocations = async () => {
    if (this.service) {
      const locationData = await axios.get(
        `${apiBase}/service-locations?filter[service_id]=${this.service.id}&include=location`
      );

      this.locations = get(locationData, 'data.data');
      this.loading = true;
    }
  };

  @action
  getRelatedServices = async (name: string) => {
    const relatedServicesData = await axios.get(`${apiBase}/services/${name}/related`);

    this.relatedServices = get(relatedServicesData, 'data.data');
  };
}
