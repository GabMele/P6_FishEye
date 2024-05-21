// export const MEDIA_BASE_PATH = './assets/photographers/'; 
// export const PORTRAIT_BASE_PATH = './assets/photographers/Photographers-ID-Photos/'

const BASE_URL = window.location.pathname.includes('repository-name') ? '/repository-name/' : '/';
export const MEDIA_BASE_PATH = `${BASE_URL}assets/photographers/`; 
export const PORTRAIT_BASE_PATH = `${BASE_URL}assets/photographers/Photographers-ID-Photos/`;