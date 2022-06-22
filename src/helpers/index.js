/**
 * Method for determining whether website is in staging env
 */
export const isStagingEnv = () => {
  return window.location.host.includes('staging.');
};
