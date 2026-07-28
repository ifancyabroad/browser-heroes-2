import type { PropsWithChildren } from "react";
import clsx from "clsx";
import { RadioGroup } from "radix-ui";

type RadioCardProps = PropsWithChildren<{
	value: string;
	disabled?: boolean;
	className?: string;
}>;

export function RadioCard({ value, disabled, className, children }: RadioCardProps) {
	return (
		<RadioGroup.Item value={value} disabled={disabled} asChild>
			<button
				type="button"
				className={clsx(
					"grid border-2 border-text-muted/60 bg-bg-panel p-3 text-left text-base",
					"enabled:cursor-pointer enabled:hover:border-border-bright",
					"focus-visible:border-primary",
					"data-[state=checked]:border-primary data-[state=checked]:hover:border-primary",
					"disabled:cursor-not-allowed disabled:opacity-70",
					className,
				)}
			>
				{children}
			</button>
		</RadioGroup.Item>
	);
}
