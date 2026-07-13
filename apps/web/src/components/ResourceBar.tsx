import { useEffect, useRef, useState } from "react";
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

const meterClassByTone: Record<ResourceBarTone, string> = {
	hp: "text-hp",
	xp: "text-xp",
};

const METER_SEGMENTS = 18;

type DamageFlashState = {
	key: number;
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

	const damageFlash = useDamageFlash(clampedFillPercent, Boolean(animateChanges));
	const filledSegments =
		clampedFillPercent === null
			? METER_SEGMENTS
			: Math.round((clampedFillPercent / 100) * METER_SEGMENTS);
	const meterFill = "#".repeat(filledSegments);
	const meterEmpty = "-".repeat(METER_SEGMENTS - filledSegments);

	return (
		<div
			className={clsx(
				"flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 text-base",
				className,
			)}
			title={accessibleLabel}
		>
			<span className="sr-only">{accessibleLabel}</span>
			<span className="text-text-label" aria-hidden="true">
				{label}
			</span>
			<div className="min-w-0 tabular-nums" aria-hidden="true">
				<span className="text-text-muted">[</span>
				<span
					className={clsx(
						"tabular-nums",
						meterClassByTone[tone],
						damageFlash && styles.damageFlash,
					)}
				>
					{meterFill}
				</span>
				<span className="tabular-nums text-text-muted">{meterEmpty}</span>
				<span className="text-text-muted">]</span>
			</div>
			<p className="min-w-0 text-text-bright" aria-hidden="true">
				{value}
			</p>
		</div>
	);
}

function useDamageFlash(fillPercent: number | null, animateChanges: boolean) {
	const prefersReducedMotion = usePrefersReducedMotion();
	const previousFillPercent = useRef<number | null>(fillPercent);
	const flashKey = useRef(0);
	const timeoutIds = useRef<number[]>([]);
	const [damageFlash, setDamageFlash] = useState<DamageFlashState | null>(null);

	useEffect(() => {
		return () => {
			clearTimeouts(timeoutIds.current);
		};
	}, []);

	useEffect(() => {
		clearTimeouts(timeoutIds.current);
		timeoutIds.current = [];

		if (fillPercent === null) {
			previousFillPercent.current = null;
			setDamageFlash(null);
			return;
		}

		const previous = previousFillPercent.current;
		previousFillPercent.current = fillPercent;

		const isDamage = previous !== null && fillPercent < previous;

		if (!animateChanges || prefersReducedMotion || !isDamage || previous <= 0) {
			setDamageFlash(null);
			return;
		}

		flashKey.current += 1;
		setDamageFlash({
			key: flashKey.current,
		});

		timeoutIds.current = [
			window.setTimeout(() => {
				setDamageFlash(null);
			}, 900),
		];
	}, [animateChanges, fillPercent, prefersReducedMotion]);

	return damageFlash;
}

function clearTimeouts(timeoutIds: number[]) {
	for (const timeoutId of timeoutIds) {
		window.clearTimeout(timeoutId);
	}
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
