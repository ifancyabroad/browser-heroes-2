import clsx from "clsx";

export const commandFrameClassName =
	"inline-flex items-center justify-center border-2 border-border bg-bg-panel px-3 py-1";

export const commandFocusClassName =
	"focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

export type CommandVariant = "default" | "primary" | "info" | "success";

export const commandVariantClassNames: Record<CommandVariant, string> = {
	default: "text-text-bright",
	primary: "text-primary",
	info: "text-info",
	success: "text-success",
};

export function getSelectionClassName({
	selected,
	disabled,
}: {
	selected: boolean;
	disabled: boolean;
}) {
	return clsx(
		selected
			? "border-primary"
			: "border-text-muted/60 hover:border-border-bright focus-visible:border-primary",
		disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
	);
}
