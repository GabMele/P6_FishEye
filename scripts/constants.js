// export const MEDIA_BASE_PATH = '/assets/photographers/'; 
// export const PORTRAIT_BASE_PATH = '/assets/photographers/Photographers-ID-Photos/'

const BASE_URL = window.location.pathname.includes('P6_FishEye') ? '/P6_FishEye/' : '/';
export const MEDIA_BASE_PATH = `${BASE_URL}assets/photographers/`; 
export const PORTRAIT_BASE_PATH = `${BASE_URL}assets/photographers/Photographers-ID-Photos/`;