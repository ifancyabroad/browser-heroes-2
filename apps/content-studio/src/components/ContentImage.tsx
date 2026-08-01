import { useState } from "react";
import { resolveImageUrl } from "../utils/image";

export function ContentImage({
	path,
	label,
	size = "table",
}: {
	path: string;
	label: string;
	size?: "table" | "card" | "detail";
}) {
	const [failed, setFailed] = useState(false);
	if (failed || !path) {
		return (
			<span
				className={`image image-${size} image-missing`}
				role="img"
				aria-label={`${label}: image unavailable`}
			>
				?
			</span>
		);
	}
	return (
		<img
			className={`image image-${size}`}
			src={resolveImageUrl(path)}
			alt={label}
			title={path}
			loading="lazy"
			onError={() => setFailed(true)}
		/>
	);
}

export function ImageStrip({ paths, label }: { paths: readonly string[]; label: string }) {
	return (
		<div className="image-strip" aria-label={`${paths.length} images for ${label}`}>
			{paths.slice(0, 4).map((path, index) => (
				<ContentImage
					key={`${path}-${index}`}
					path={path}
					label={`${label} ${index + 1}`}
				/>
			))}
			{paths.length > 4 && <span className="image-count">+{paths.length - 4}</span>}
		</div>
	);
}
