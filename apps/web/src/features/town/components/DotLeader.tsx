import { useLayoutEffect, useRef, useState } from "react";

export function DotLeader() {
	const containerRef = useRef<HTMLSpanElement>(null);
	const glyphRef = useRef<HTMLSpanElement>(null);
	const [count, setCount] = useState(0);

	useLayoutEffect(() => {
		const container = containerRef.current;
		const glyph = glyphRef.current;
		if (!container || !glyph || typeof ResizeObserver === "undefined") {
			return;
		}

		const observer = new ResizeObserver(() => {
			const glyphWidth = glyph.getBoundingClientRect().width;
			setCount(glyphWidth > 0 ? Math.floor(container.clientWidth / glyphWidth) : 0);
		});
		observer.observe(container);
		// Font loading and text-size changes can alter the width of a period.
		observer.observe(glyph);
		return () => observer.disconnect();
	}, []);

	return (
		<span
			ref={containerRef}
			aria-hidden="true"
			className="relative min-w-0 flex-1 whitespace-nowrap text-right text-text-muted"
		>
			<span ref={glyphRef} className="invisible absolute">
				.
			</span>
			<span>{".".repeat(count)}</span>
		</span>
	);
}
