const imageBaseUrl = `${import.meta.env.BASE_URL}assets/images`;

export function resolveImageUrl(path: string) {
	return `${imageBaseUrl.replace(/\/$/, "")}/${path.replace(/^\//, "")}`;
}
