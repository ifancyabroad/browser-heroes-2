import { useEffect, useRef, useState, type CSSProperties } from "react";
import clsx from "clsx";
import styles from "./ResourceBar.module.css";

type ResourceBarTone = "hp" | "xp";

type ResourceBarProps = {
	label: string;
	tone: ResourceBarTone;
	value: string;
	fillPercent?: number;
	animateChanges?: boolean;
	className?: string;
};

const fillClassByTone: Record<ResourceBarTone, string> = {
	hp: "bg-hp",
	xp: "bg-xp",
};

type DamageChunkState = {
	key: number;
	oldFillPercent: number;
	newFillPercent: number;
};

function clampPercent(value: number) {
	return Math.max(0, Math.min(100, value));
}

export function ResourceBar({
	label,
	tone,
	value,
	fillPercent,
	animateChanges,
	className,
}: ResourceBarProps) {
	const clampedFillPercent = typeof fillPercent === "number" ? clampPercent(fillPercent) : null;
	const accessibleLabel = `${label} ${value}`;

	const damageChunk = useDamageChunk(clampedFillPercent, Boolean(animateChanges));

	return (
		<div
			className={clsx(
				"grid grid-cols-[minmax(5rem,1fr)_7rem] items-center gap-3 text-base",
				className,
			)}
			title={accessibleLabel}
		>
			<div
				className="relative isolate h-5 overflow-hidden bg-text-muted/30"
				aria-label={accessibleLabel}
			>
				{damageChunk && (
					<div
						key={damageChunk.key}
						className={clsx(styles.damageChunk, "absolute inset-y-0 left-0")}
						style={
							{
								"--bh-resource-bar-chunk-old": `${damageChunk.oldFillPercent}%`,
								"--bh-resource-bar-chunk-new": `${damageChunk.newFillPercent}%`,
								zIndex: 1,
							} as CSSProperties
						}
					/>
				)}
				{clampedFillPercent !== null && (
					<div
						className={clsx("absolute inset-y-0 left-0", fillClassByTone[tone])}
						style={{ width: `${clampedFillPercent}%`, zIndex: 2 }}
					/>
				)}
			</div>
			<p className="min-w-0 truncate text-left">
				<span className="text-text-label">{label}</span>{" "}
				<span className="text-text-bright">{value}</span>
			</p>
		</div>
	);
}

function useDamageChunk(fillPercent: number | null, animateChanges: boolean) {
	const prefersReducedMotion = usePrefersReducedMotion();
	const previousFillPercent = useRef<number | null>(fillPercent);
	const chunkKey = useRef(0);
	const timeoutId = useRef<number | null>(null);
	const [damageChunk, setDamageChunk] = useState<DamageChunkState | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutId.current !== null) {
				window.clearTimeout(timeoutId.current);
			}
		};
	}, []);

	useEffect(() => {
		if (timeoutId.current !== null) {
			window.clearTimeout(timeoutId.current);
			timeoutId.current = null;
		}

		if (fillPercent === null) {
			previousFillPercent.current = null;
			setDamageChunk(null);
			return;
		}

		const previous = previousFillPercent.current;
		previousFillPercent.current = fillPercent;

		const isDamage = previous !== null && fillPercent < previous;

		if (!animateChanges || prefersReducedMotion || !isDamage || previous <= 0) {
			setDamageChunk(null);
			return;
		}

		chunkKey.current += 1;
		setDamageChunk({
			key: chunkKey.current,
			oldFillPercent: previous,
			newFillPercent: fillPercent,
		});

		timeoutId.current = window.setTimeout(() => {
			setDamageChunk(null);
			timeoutId.current = null;
		}, 900);
	}, [animateChanges, fillPercent, prefersReducedMotion]);

	return damageChunk;
}

function usePrefersReducedMotion() {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		function handleChange() {
			setPrefersReducedMotion(mediaQuery.matches);
		}

		handleChange();
		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return prefersReducedMotion;
}
