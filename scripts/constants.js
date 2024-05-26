/**
 * Determines if the current environment is local (localhost or 127.0.0.1).
 */
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

/**
 * Base URL path for the application. Uses a different path based on whether 
 * the environment is local or production (GitHub Pages).
 */
const BASE_URL = isLocal? '/' : '/P6_FishEye/';

/**
 * Path to the media assets directory within the photographers section.
 * @type {string}
 */
export const MEDIA_BASE_PATH = `${BASE_URL}assets/photographers/`;

/**
 * Path to the portrait photos directory within the photographers section.
 * @type {string}
 */
export const PORTRAIT_BASE_PATH = `${BASE_URL}assets/photographers/Photographers-ID-Photos/`;

/**
 * Path to the JSON data file containing photographer information.
 * @type {string}
 */
export const DATA_JSON_PATH = `${BASE_URL}data/photographers.json`;

/**
 * Logs the version of FishEye to the console.
 */
console.log(`FishEye - v1.6 :`);
console.log("----------------");
