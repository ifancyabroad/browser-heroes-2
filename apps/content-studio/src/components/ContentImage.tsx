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
