import { type AnchorHTMLAttributes } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import clsx from "clsx";
import { terminalCommandFocusClassName, terminalCommandFrameClassName } from "./TerminalPrimitives";

type LinkProps = RouterLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({ className, ...props }: LinkProps) {
	return (
		<RouterLink
			className={clsx(
				"inline-flex cursor-pointer items-center justify-center text-text-bright transition-colors",
				terminalCommandFrameClassName,
				"hover:bg-primary hover:text-primary-contrast hover:before:text-primary-contrast hover:after:text-primary-contrast",
				terminalCommandFocusClassName,
				className,
			)}
			{...props}
		/>
	);
}
