import { type AnchorHTMLAttributes } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router-dom";
import clsx from "clsx";

interface LinkProps extends RouterLinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
	className?: string;
}

export function Link({ className, ...props }: LinkProps) {
	return (
		<RouterLink
			className={clsx(
				"underline hover:opacity-80 transition-opacity cursor-pointer",
				className,
			)}
			{...props}
		/>
	);
}
