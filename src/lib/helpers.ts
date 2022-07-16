import { bookmarks, wallpaperUrl, openWeatherApiToken, location, bgColor } from '../stores/stores';
import { get } from 'svelte/store';
import { locale } from './translations';

export const loadStorage = () => {
  const existingBookmarks = localStorage.getItem('bookmarks');
  existingBookmarks ? bookmarks.set(JSON.parse(existingBookmarks || '')) : [];
  const existingWallpaperUrl = localStorage.getItem('wallpaperUrl');
  existingWallpaperUrl ? wallpaperUrl.set(JSON.parse(existingWallpaperUrl || '')) : '';
  const existingbgColor = localStorage.getItem('bgColor');
  existingbgColor ? bgColor.set(JSON.parse(existingbgColor || '')) : '';
  const existingOpenWeatherApiToken = localStorage.getItem('openWeatherApiToken');
  existingOpenWeatherApiToken
    ? openWeatherApiToken.set(JSON.parse(existingOpenWeatherApiToken || ''))
    : '';
  const existingLocation = localStorage.getItem('location');
  existingLocation ? location.set(JSON.parse(existingLocation || '')) : {};
  const existingLang = localStorage.getItem('lang');
  existingLang ? locale.set(JSON.parse(existingLang || '')) : '';
};

export const updateBookmarkStorage = () =>
  localStorage.setItem('bookmarks', JSON.stringify(get(bookmarks)));
export const updateWallpaperStorage = () =>
  localStorage.setItem('wallpaperUrl', JSON.stringify(get(wallpaperUrl)));
export const updateWeatherTokenStorage = () =>
  localStorage.setItem('openWeatherApiToken', JSON.stringify(get(openWeatherApiToken)));
export const updateLocationStorage = () =>
  localStorage.setItem('location', JSON.stringify(get(location)));

function getRGB(c: any) {
  return parseInt(c, 16) || c;
}

function getsRGB(c: any) {
  return getRGB(c) / 255 <= 0.03928
    ? getRGB(c) / 255 / 12.92
    : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}

function getLuminance(hexColor: any) {
  return (
    0.2126 * getsRGB(hexColor.substr(1, 2)) +
    0.7152 * getsRGB(hexColor.substr(3, 2)) +
    0.0722 * getsRGB(hexColor.substr(-2))
  );
}

function getContrast(f: any, b: any) {
  const L1 = getLuminance(f);
  const L2 = getLuminance(b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

export function getTextColor(bgColor: any) {
  const whiteContrast = getContrast(bgColor, '#ffffff');
  const blackContrast = getContrast(bgColor, '#000000');

  return whiteContrast > blackContrast ? 'rgb(212 212 212)' : '#000000';
}
