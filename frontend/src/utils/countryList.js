import { getNames } from 'country-list';

export const countryList = getNames().map((name) => ({
  name,
  code: name,
}));
