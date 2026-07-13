import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { terminalCommandFocusClassName, terminalCommandFrameClassName } from "./TerminalPrimitives";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			className={clsx(
				"inline-flex items-center justify-center text-text-bright transition-colors",
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
