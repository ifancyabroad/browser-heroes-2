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
							"border-b-2 px-1 py-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							active
								? "border-primary text-text-bright"
								: "border-transparent text-text-muted hover:text-text-bright",
						)}
						onClick={() => onChange(item.value)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
}
