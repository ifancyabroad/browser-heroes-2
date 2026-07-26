import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./ActionBar.module.css";
import { Tooltip } from "./Tooltip";

type ActionBarGroupProps = {
	"aria-label": string;
	children: ReactNode;
	className?: string;
};

type ActionBarTrayProps = {
	children: ReactNode;
	className?: string;
};

export function ActionBarTray({ children, className }: ActionBarTrayProps) {
	return (
		<div
			className={clsx(
				"mx-auto flex w-full min-w-0 flex-wrap justify-center gap-2 bg-bg-elevated p-2 sm:w-fit sm:max-w-full sm:gap-3",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function ActionBarGroup({
	"aria-label": ariaLabel,
	children,
	className,
}: ActionBarGroupProps) {
	return (
		<div
			className={clsx(
				"flex min-w-0 max-w-full flex-wrap justify-center gap-1 sm:gap-2",
				className,
			)}
			aria-label={ariaLabel}
		>
			{children}
		</div>
	);
}

type ActionSlotButtonProps = {
	ariaLabel: string;
	available: boolean;
	icon: string;
	label?: string;
	labelClassName?: string;
	loading: boolean;
	onClick: () => void;
	title?: string;
	tooltip?: ReactNode;
	topLeftLabel?: string;
	topLeftLabelClassName?: string;
};

export function ActionSlotButton({
	ariaLabel,
	available,
	icon,
	label,
	labelClassName,
	loading,
	onClick,
	title,
	tooltip,
	topLeftLabel,
	topLeftLabelClassName,
}: ActionSlotButtonProps) {
	const disabled = loading || !available;
	const useNativeDisabled = disabled && !tooltip;
	const previousAvailable = useRef(available);
	const pulseTimeout = useRef<number | null>(null);
	const [showAvailabilityPulse, setShowAvailabilityPulse] = useState(false);

	useEffect(() => {
		return () => {
			if (pulseTimeout.current !== null) {
				window.clearTimeout(pulseTimeout.current);
			}
		};
	}, []);

	useEffect(() => {
		if (pulseTimeout.current !== null) {
			window.clearTimeout(pulseTimeout.current);
			pulseTimeout.current = null;
		}

		if (!previousAvailable.current && available) {
			setShowAvailabilityPulse(true);
			pulseTimeout.current = window.setTimeout(() => {
				setShowAvailabilityPulse(false);
				pulseTimeout.current = null;
			}, 700);
		} else {
			setShowAvailabilityPulse(false);
		}

		previousAvailable.current = available;
	}, [available]);

	const button = (
		<button
			type="button"
			className={getActionSlotClassName(disabled, showAvailabilityPulse)}
			disabled={useNativeDisabled}
			aria-disabled={disabled || undefined}
			aria-label={ariaLabel}
			title={tooltip ? undefined : (title ?? ariaLabel)}
			onClick={disabled ? undefined : onClick}
		>
			<ActionSlotImage src={icon} grayscale={disabled} />
			{topLeftLabel && (
				<ActionSlotLabel className={topLeftLabelClassName} position="top-left">
					{topLeftLabel}
				</ActionSlotLabel>
			)}
			{label && <ActionSlotLabel className={labelClassName}>{label}</ActionSlotLabel>}
		</button>
	);

	if (!tooltip) {
		return button;
	}

	return (
		<Tooltip
			content={tooltip}
			className="h-16 w-16 sm:h-20 sm:w-20"
			contentClassName="w-64 max-w-[calc(100vw-1rem)]"
			referenceTabIndex={null}
			mobileBehavior="disabled"
		>
			{button}
		</Tooltip>
	);
}

type ActionSlotDisplayProps = {
	ariaLabel: string;
	icon: string;
	label: string;
	labelClassName?: string;
};

export function ActionSlotDisplay({
	ariaLabel,
	icon,
	label,
	labelClassName,
}: ActionSlotDisplayProps) {
	return (
		<div className={getDisplaySlotClassName()} aria-label={ariaLabel}>
			<ActionSlotImage src={icon} />
			<ActionSlotLabel className={labelClassName}>{label}</ActionSlotLabel>
		</div>
	);
}

type ActionSlotImageProps = {
	src: string;
	grayscale?: boolean;
};

function ActionSlotImage({ src, grayscale = false }: ActionSlotImageProps) {
	return (
		<span className="absolute inset-0 flex items-center justify-center">
			<img
				src={src}
				alt=""
				loading="lazy"
				className={clsx(
					"h-full w-full scale-110 object-cover",
					grayscale ? "grayscale brightness-[0.32] contrast-[0.85]" : undefined,
				)}
				aria-hidden
			/>
		</span>
	);
}

type ActionSlotLabelProps = {
	children: ReactNode;
	className?: string;
	position?: "bottom-right" | "top-left";
};

function ActionSlotLabel({ children, className, position = "bottom-right" }: ActionSlotLabelProps) {
	return (
		<span
			className={clsx(
				"absolute bg-bg-base/90 px-1",
				position === "top-left" ? "left-1 top-1" : "bottom-1 right-1",
				className,
			)}
		>
			{children}
		</span>
	);
}

function getDisplaySlotClassName() {
	return clsx(
		"relative aspect-square w-16 overflow-hidden border-2 border-border bg-bg-panel sm:w-20",
		"flex shrink-0 items-center justify-center text-center",
	);
}

function getActionSlotClassName(disabled: boolean, showAvailabilityPulse: boolean) {
	return clsx(
		"relative aspect-square w-16 overflow-hidden border-2 bg-bg-panel sm:w-20",
		"flex shrink-0 items-center justify-center text-center",
		disabled
			? "cursor-not-allowed border-border/50"
			: "cursor-pointer border-border-bright hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
		showAvailabilityPulse && styles.available,
	);
}
