import { STORAGE_PREFIX } from '../constants';

interface CookieArgs {
  name: string;
  value: string;
  maxAge?: number;
  expires?: string;
}

export const saveToCookies = ({ name, value, maxAge, expires }: CookieArgs) => {
  let cookieString = `${STORAGE_PREFIX}${name.toUpperCase()}=${value};path=/;`;

  if (typeof maxAge === 'number') cookieString += 'max-age=' + maxAge + ';';
  if (expires) cookieString += 'expires=' + expires + ';';

  cookieString += 'samesite=lax';

  document.cookie = cookieString;
};

export const loadFromCookies = (name: string) => {
  if (!document?.cookie) return null;

  const prefix = `${STORAGE_PREFIX}${name.toUpperCase()}=`;
  const cookie = decodeURIComponent(document.cookie)
    .split(';')
    .find(c => c.includes(prefix));

  if (!cookie) return null;
  return cookie.split(prefix).reverse()[0];
};

export const removeFromCookies = (name: string) => {
  document.cookie = `${STORAGE_PREFIX}${name.toUpperCase()}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export const saveToLocalStorage = (name: string, values: unknown) => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  localStorage.setItem(`${STORAGE_PREFIX}${name.toUpperCase()}`, JSON.stringify(values));
};

export const loadFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return null;

  const serialized = window.localStorage.getItem(`${STORAGE_PREFIX}${name.toUpperCase()}`);

  return serialized !== null ? JSON.parse(serialized) : null;
};

export const removeFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  window.localStorage.removeItem(`${STORAGE_PREFIX}${name.toUpperCase()}`);
};


export interface DataAttributeObj {
  [key: string]: string;
}

type DataAttrsFunc = (obj?: DataAttributeObj) => { [key: string]: string };

export const toDataAttrs: DataAttrsFunc = object => object ? Object.fromEntries(Object.keys(object).map(key => [`data-${key}`, object[key]])) : {};
