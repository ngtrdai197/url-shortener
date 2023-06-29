import { STORAGE_PREFIX } from '../contants/contants';

interface CookieArgs {
  name: string;
  value: string;
  maxAge?: number;
  expires?: string;
}

export const saveToCookies = ({ name, value, maxAge, expires }: CookieArgs) => {
  let cookieString = `${STORAGE_PREFIX}${name}=${value};path=/;`;

  if (typeof maxAge === 'number') cookieString += 'max-age=' + maxAge + ';';
  if (expires) cookieString += 'expires=' + expires + ';';

  cookieString += 'samesite=lax';

  document.cookie = cookieString;
};

export const loadFromCookies = (name: string, withPrefix = true) => {
  if (!document?.cookie) return null;

  const prefix = `${withPrefix ? STORAGE_PREFIX : ''}${name}=`;
  const cookie = decodeURIComponent(document.cookie)
    .split(';')
    .find(c => c.includes(prefix));

  if (!cookie) return null;
  return cookie.split(prefix).reverse()[0];
};

export const removeFromCookies = (name: string) => {
  document.cookie = `${STORAGE_PREFIX}${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
};

export const saveToLocalStorage = (name: string, values: unknown) => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  localStorage.setItem(`${STORAGE_PREFIX}${name}`, JSON.stringify(values));
};

export const loadFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return null;

  const serialized = window.localStorage.getItem(`${STORAGE_PREFIX}${name}`);

  return serialized !== null ? JSON.parse(serialized) : null;
};

export const removeFromLocalStorage = (name: string) => {
  if (typeof window === 'undefined' || !window.localStorage) return;

  window.localStorage.removeItem(`${STORAGE_PREFIX}${name}`);
};
