import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import styles from "./ActionBar.module.css";

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
				"mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2 border-2 border-border bg-bg-base p-2 sm:gap-3",
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
				"flex flex-wrap justify-center gap-1 sm:gap-2",
				"[&+&]:border-l [&+&]:border-border [&+&]:pl-2 sm:[&+&]:pl-3",
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
	disabled: boolean;
	icon: string;
	label?: string;
	labelClassName?: string;
	onClick: () => void;
	title?: string;
	topLeftLabel?: string;
	topLeftLabelClassName?: string;
};

export function ActionSlotButton({
	ariaLabel,
	disabled,
	icon,
	label,
	labelClassName,
	onClick,
	title,
	topLeftLabel,
	topLeftLabelClassName,
}: ActionSlotButtonProps) {
	const previousDisabled = useRef(disabled);
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

		if (previousDisabled.current && !disabled) {
			setShowAvailabilityPulse(true);
			pulseTimeout.current = window.setTimeout(() => {
				setShowAvailabilityPulse(false);
				pulseTimeout.current = null;
			}, 700);
		} else {
			setShowAvailabilityPulse(false);
		}

		previousDisabled.current = disabled;
	}, [disabled]);

	return (
		<button
			type="button"
			className={getActionSlotClassName(disabled, showAvailabilityPulse)}
			disabled={disabled}
			aria-label={ariaLabel}
			title={title ?? ariaLabel}
			onClick={onClick}
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
					"h-full w-full scale-110 object-cover transition duration-150",
					grayscale
						? "grayscale brightness-[0.32] contrast-[0.85]"
						: "brightness-110 group-hover:brightness-125",
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
				"absolute bg-bg-base/80 px-1",
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
		"relative aspect-square w-16 overflow-hidden border border-border bg-bg-elevated sm:w-20",
		"flex shrink-0 items-center justify-center text-center",
	);
}

function getActionSlotClassName(disabled: boolean, showAvailabilityPulse: boolean) {
	return clsx(
		"group relative aspect-square w-16 overflow-hidden border bg-bg-elevated sm:w-20",
		"flex shrink-0 items-center justify-center text-center",
		"transition-colors duration-150",
		disabled
			? "cursor-not-allowed border-border/50"
			: "cursor-pointer border-primary/80 hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
		showAvailabilityPulse && styles.available,
	);
}
