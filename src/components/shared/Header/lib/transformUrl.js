export function transformUrl(url) {
	const parts = url.split('/');
	if (parts.length >= 3) {
		return `/${parts[parts.length - 1]}`;
	} else if (parts.length === 2 && parts[1] !== '') {
		return '/';
	}
}