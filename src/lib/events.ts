export function clickOutside(node: HTMLElement) {
  window.addEventListener('mousedown', handleMouseDown);
  function handleMouseDown(e: any) {
    if (!node.contains(e.target)) {
      node.dispatchEvent(new CustomEvent('outsideclick'));
    }
  }
  return {
    destroy() {
      window.removeEventListener('mousedown', handleMouseDown);
    }
  };
}

export const shortcut = (node: any, params: any) => {
	let handler: any;
	const removeHandler = () => window.removeEventListener('keydown', handler), setHandler = () => {
			removeHandler();
			if (!params)
					return;
			handler = (e: any) => {
					if ((!!params.alt != e.altKey) ||
							(!!params.shift != e.shiftKey) ||
							(!!params.control != (e.ctrlKey || e.metaKey)) ||
							params.code != e.code)
							return;
					e.preventDefault();
					params.callback ? params.callback() : node.click();
			};
			window.addEventListener('keydown', handler);
	};
	setHandler();
	return {
			update: setHandler,
			destroy: removeHandler,
	};
};
