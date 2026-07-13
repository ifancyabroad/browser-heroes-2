import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import {
	terminalCommandFocusClassName,
	terminalCommandFrameClassName,
	type TerminalCommandVariant,
	terminalCommandVariantClassNames,
} from "./TerminalPrimitives";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: TerminalCommandVariant;
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
	return (
		<button
			className={clsx(
				"inline-flex items-center justify-center transition-colors",
				terminalCommandVariantClassNames[variant],
				terminalCommandFrameClassName,
				"enabled:cursor-pointer enabled:hover:bg-primary enabled:hover:text-primary-contrast enabled:hover:before:text-primary-contrast enabled:hover:after:text-primary-contrast",
				terminalCommandFocusClassName,
				"disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60",
				className,
			)}
			{...props}
		/>
	);
}
