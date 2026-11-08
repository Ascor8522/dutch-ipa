; (function() {
	try {
		var saved = localStorage.getItem('theme');
		var dark =
			saved === 'dark' ||
			(saved !== 'light' &&
				matchMedia('(prefers-color-scheme: dark)').matches);
		var root = document.documentElement;

		root.classList.toggle('dark', dark);
		root.style.colorScheme = dark ? 'dark' : 'light';
	} catch { }
})();
