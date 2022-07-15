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

export const wallpaperUrl = writable('');
export const bgColor = writable('#000000');
export const openWeatherApiToken = writable('');
export const location = writable({
	address: '',
	lon: 0,
	lat: 0
});
