import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			className={clsx(
				"underline transition-opacity enabled:cursor-pointer enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:text-text-muted disabled:opacity-60",
				className,
			)}
			{...props}
		/>
	);
}
