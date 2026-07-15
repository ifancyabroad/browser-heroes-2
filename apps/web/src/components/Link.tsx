import { type AnchorHTMLAttributes } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import clsx from "clsx";
import {
	commandFocusClassName,
	commandFrameClassName,
	type CommandVariant,
	commandVariantClassNames,
} from "./ControlStyles";

type LinkProps = RouterLinkProps &
	AnchorHTMLAttributes<HTMLAnchorElement> & {
		variant?: CommandVariant;
	};

export function Link({ className, variant = "default", ...props }: LinkProps) {
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
