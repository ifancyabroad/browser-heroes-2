import clsx from "clsx";

export const terminalCommandFrameClassName =
	"before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']";

export const terminalCommandFocusClassName =
	"focus-visible:bg-primary focus-visible:text-primary-contrast focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export type TerminalCommandVariant = "default" | "primary" | "info" | "success";

export const terminalCommandVariantClassNames: Record<TerminalCommandVariant, string> = {
	default: "text-text-bright",
	primary: "text-primary",
	info: "text-info",
	success: "text-success",
};

type TerminalTitleProps = {
	title: string;
};

type BracketBadgeProps = {
	label: string;
	className?: string;
};

export function TerminalPanelTitle({ title }: TerminalTitleProps) {
	return (
		<div className="absolute left-3 top-0 z-10 -translate-y-1/2 border border-border bg-bg-elevated px-2 text-text-label">
			{title}
		</div>
	);
}

export function TerminalSectionHeading({ title }: TerminalTitleProps) {
	return (
		<h2
			className={clsx(
				"border-b border-text-muted/60 pb-1 text-base text-text-label",
				terminalCommandFrameClassName,
			)}
		>
			<span className="px-1">{title}</span>
		</h2>
	);
}

export function BracketBadge({ label, className }: BracketBadgeProps) {
	return (
		<span className={clsx(terminalCommandFrameClassName, className)}>
			<span className="px-1">{label}</span>
		</span>
	);
}

export function getTerminalSelectionClassName({
	selected,
	disabled,
}: {
	selected: boolean;
	disabled: boolean;
}) {
	return clsx(
		selected
			? "border-primary bg-primary/10"
			: "border-text-muted/60 hover:border-border-bright focus-visible:border-primary",
		disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
	);
}
