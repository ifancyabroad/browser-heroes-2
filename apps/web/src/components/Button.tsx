import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import clsx from "clsx";

const commandFrameClassName =
	"inline-flex min-h-9 items-center justify-center border-2 border-border bg-bg-panel px-3 py-1";

const commandFocusClassName =
	"focus-visible:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type CommandVariant = "default" | "primary" | "info" | "success";

const commandVariantClassNames: Record<CommandVariant, string> = {
	default: "text-text-bright",
	primary: "text-primary",
	info: "text-info",
	success: "text-success",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: CommandVariant;
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
	return (
		<button
			className={clsx(
				commandFrameClassName,
				commandVariantClassNames[variant],
				"enabled:cursor-pointer enabled:hover:border-border-bright enabled:hover:text-text-bright",
				commandFocusClassName,
				"disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60",
				className,
			)}
			{...props}
		/>
	);
}

type ButtonLinkProps = RouterLinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		variant?: CommandVariant;
	};

export function ButtonLink({ className, variant = "default", ...props }: ButtonLinkProps) {
	return (
		<RouterLink
			className={clsx(
				commandFrameClassName,
				"cursor-pointer",
				commandVariantClassNames[variant],
				"hover:border-border-bright hover:text-text-bright",
				commandFocusClassName,
				className,
			)}
			{...props}
		/>
	);
}
