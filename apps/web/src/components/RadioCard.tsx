import type { PropsWithChildren } from "react";
import clsx from "clsx";
import { RadioGroup } from "radix-ui";

type RadioCardProps = PropsWithChildren<{
	value: string;
	selected: boolean;
	selectionLabel: string;
	disabled?: boolean;
	className?: string;
}>;

export function RadioCard({
	value,
	selected,
	selectionLabel,
	disabled,
	className,
	children,
}: RadioCardProps) {
	return (
		<div
			className={clsx(
				"grid grid-cols-[minmax(0,1fr)_2.75rem] border-2 bg-bg-panel",
				selected ? "border-primary" : "border-text-muted/60",
				disabled && "opacity-70",
			)}
		>
			<div className={clsx("grid p-3 text-left text-base", className)}>{children}</div>

			<RadioGroup.Item value={value} disabled={disabled} asChild>
				<button
					type="button"
					aria-label={selectionLabel}
					className="flex cursor-pointer items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-primary disabled:cursor-not-allowed"
				>
					<span
						aria-hidden
						className="flex h-4 w-4 items-center justify-center border-2 border-border bg-transparent"
					>
						<span className={clsx("h-2 w-2", selected && "bg-primary")} />
					</span>
				</button>
			</RadioGroup.Item>
		</div>
	);
}
