import { type AnchorHTMLAttributes } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import clsx from "clsx";
import {
	terminalCommandFocusClassName,
	terminalCommandFrameClassName,
	type TerminalCommandVariant,
	terminalCommandVariantClassNames,
} from "./TerminalPrimitives";

type LinkProps = RouterLinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		variant?: TerminalCommandVariant;
	};

export function Link({ className, variant = "default", ...props }: LinkProps) {
	return (
		<RouterLink
			className={clsx(
				"inline-flex cursor-pointer items-center justify-center transition-colors",
				terminalCommandVariantClassNames[variant],
				terminalCommandFrameClassName,
				"hover:bg-primary hover:text-primary-contrast hover:before:text-primary-contrast hover:after:text-primary-contrast",
				terminalCommandFocusClassName,
				className,
			)}
			{...props}
		/>
	);
}
