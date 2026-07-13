import clsx from "clsx";
import { terminalCommandFrameClassName } from "./TerminalPrimitives";

export type TabItem<TValue extends string> = {
	label: string;
	value: TValue;
};

type TabsProps<TValue extends string> = {
	"aria-label": string;
	items: readonly TabItem<TValue>[];
	value: TValue;
	onChange: (value: TValue) => void;
	className?: string;
};

export function Tabs<TValue extends string>({
	"aria-label": ariaLabel,
	items,
	value,
	onChange,
	className,
}: TabsProps<TValue>) {
	return (
		<div
			className={clsx("flex flex-wrap items-center gap-x-4 gap-y-1", className)}
			role="tablist"
			aria-label={ariaLabel}
		>
			{items.map((item) => {
				const active = item.value === value;

				return (
					<button
						key={item.value}
						type="button"
						role="tab"
						aria-selected={active}
						className={clsx(
							"transition-colors",
							terminalCommandFrameClassName,
							active
								? "bg-primary text-primary-contrast before:text-primary-contrast after:text-primary-contrast"
								: "text-text-muted hover:bg-bg-elevated hover:text-text-bright",
						)}
						onClick={() => onChange(item.value)}
					>
						<span className="px-1">{item.label}</span>
					</button>
				);
			})}
		</div>
	);
}
