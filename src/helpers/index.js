import { formatPhoneNumber } from 'react-phone-number-input';

/**
 * Method for determining whether website is in staging env
 */
export const isStagingEnv = () => {
  return window.location.host.includes('staging.');
};

export const formatContactNumber = (number = '') => {
  const formattedNumber = /^[0][0-9]/.test(number) ? '+44' + number.substring(1) : number;

  return formatPhoneNumber(formattedNumber);
};
