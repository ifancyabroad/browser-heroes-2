import clsx from "clsx";

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
							"transition-colors before:text-text-muted before:content-['['] after:text-text-muted after:content-[']']",
							active ? "text-primary" : "text-text-muted hover:text-text-bright",
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
