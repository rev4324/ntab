import { bookmarks } from '../stores/bookmarks';
import { get } from 'svelte/store';

export function updateBookmarkStorage() {
  localStorage.setItem('bookmarks', JSON.stringify(get(bookmarks)));
}

export function base64ify(imageUrl: string) {}
