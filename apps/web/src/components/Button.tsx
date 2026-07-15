import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import {
	commandFocusClassName,
	commandFrameClassName,
	type CommandVariant,
	commandVariantClassNames,
} from "./ControlStyles";

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
