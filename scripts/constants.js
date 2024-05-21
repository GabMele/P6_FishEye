// export const MEDIA_BASE_PATH = '/assets/photographers/'; 
// export const PORTRAIT_BASE_PATH = '/assets/photographers/Photographers-ID-Photos/'

// const BASE_URL = window.location.pathname.includes('P6_FishEye') ? '/P6_FishEye/' : '/';
// export const MEDIA_BASE_PATH = `${BASE_URL}assets/photographers/`; 
// export const PORTRAIT_BASE_PATH = `${BASE_URL}assets/photographers/Photographers-ID-Photos/`;


const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const BASE_URL = isLocal ? '/' : '/P6_FishEye/';

export const MEDIA_BASE_PATH = `${BASE_URL}assets/photographers/`; 
export const PORTRAIT_BASE_PATH = `${BASE_URL}assets/photographers/Photographers-ID-Photos/`;
export const DATA_JSON_PATH = `${BASE_URL}data/photographers.json`;

console.log("window.location.hostname :" + window.location.hostname);
console.log("BASE_URL : " + BASE_URL);
console.log("MEDIA_BASE_PATH : " + MEDIA_BASE_PATH);
console.log("PORTRAIT_BASE_PATH : " + PORTRAIT_BASE_PATH);
console.log("DATA_JSON_PATH : " + DATA_JSON_PATH);