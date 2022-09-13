//Gotten from https://github.com/jitsi/jitsi-meet-react-sdk/blob/f1e2a1c2d7fda7dfc37090b0e35252d7c404e916/src/utils/index.ts
import { JAAS_STAGING_DOMAIN, JAAS_PROD_DOMAIN } from "@/constants";

/**
 * Returns the complete room name
 *
 * @param {string} roomName
 * @param {string|undefined} tenant
 * @returns {string} the complete room name
 */
export const getRoomName = (roomName: string, tenant?: string): string => {
  if (tenant) {
    return `${tenant}/${roomName}`;
  }

  return roomName;
};

/**
 * Returns the JaaS domain
 *
 * @param {boolean|undefined} useStaging
 * @returns {string} the JaaS domain based on environment
 */
export const getJaaSDomain = (useStaging?: boolean): string => {
  if (useStaging) {
    return JAAS_STAGING_DOMAIN;
  }

  return JAAS_PROD_DOMAIN;
};

/**
 * Generates a unique id
 * @param {string} prefix
 * @returns {string} the component id
 */
export const generateComponentId = (prefix: string): string =>
  `${prefix}-${Date.now()}`;
