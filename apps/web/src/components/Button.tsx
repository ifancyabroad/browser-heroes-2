import { type ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
}

export function Button({ className, ...props }: ButtonProps) {
	return (
		<button
			className={clsx(
				"underline hover:opacity-80 transition-opacity cursor-pointer",
				className,
			)}
			{...props}
		/>
	);
}
