import { IServiceLocation } from '../types/types';
import get from 'lodash/get';
import { apiBase } from '../config/api';

export const queryRegex = (key: string) => new RegExp('([?&])' + key + '=.*?(&|$)', 'i');

export const querySeparator = (query: string) => (query.includes('?') ? '&' : '?');

export const getLocationName = (locations: IServiceLocation[]) =>
  locations.map((location: IServiceLocation) =>
    location.name ? location.name : get(location, 'location.address_line_1', '')
  );

export const removeQuotesRegex = new RegExp(/^["']|["']$|["]/, 'g');

export const capitalise = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

export const getImg = (pageId: string, max_dimension = 900) => `${apiBase}/pages/${pageId}/image.png?max_dimension=${max_dimension}`;