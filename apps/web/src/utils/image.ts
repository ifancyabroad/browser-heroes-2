const imageBaseUrl =
	import.meta.env.VITE_IMAGE_BASE_URL || `${import.meta.env.BASE_URL}assets/images`;

export function resolveImageUrl(image: string): string {
	return `${imageBaseUrl.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
}
