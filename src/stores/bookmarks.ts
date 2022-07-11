import { writable } from 'svelte/store';

export interface BookmarkType {
  id?: string;
  name: string;
  url: string;
  imageBase64: string;
}
export interface BookmarkTypes extends Array<BookmarkType> {}
export const bookmarks = writable(<BookmarkTypes>[]);

export const addNewOpen = writable(false);

export const menuOpen = writable(false);
export const settingsOpen = writable(false);

export const wallpaperUrl = writable("")