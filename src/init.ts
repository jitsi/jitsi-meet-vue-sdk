import { DEFAULT_DOMAIN } from "./constants";
import { JitsiMeetExternalApi } from "./types";

const loadExternalApi = async (domain: string): Promise<JitsiMeetExternalApi> =>
  new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      return resolve(window.JitsiMeetExternalAPI);
    }

    const externalApiScript: HTMLScriptElement =
      document.createElement("script");

    externalApiScript.async = true;
    externalApiScript.src = `https://${domain}/external_api.js`;

    externalApiScript.onload = () => resolve(window.JitsiMeetExternalAPI);
    externalApiScript.onerror = () =>
      reject(new Error(`Script load error: ${externalApiScript.src}`));

    document.head.appendChild(externalApiScript as Node);
  });

let scriptPromise: Promise<JitsiMeetExternalApi>;

/**
 * Injects the external_api.js script for the corresponding domain in DOM
 * and resolves with either the `JitsiMeetExternalApi` class definition or an error
 *
 * @param {string} domain - The domain of the external API
 * @returns {Promise<JitsiMeetExternalApi>} - the JitsiMeetExternalAPI or an error
 */
export const fetchExternalApi = (
  domain: string = DEFAULT_DOMAIN
): Promise<JitsiMeetExternalApi> => {
  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = loadExternalApi(domain);

  return scriptPromise;
};
