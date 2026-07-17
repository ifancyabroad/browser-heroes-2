import clsx from "clsx";
import type { ReactNode } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

export type TabItem<TValue extends string> = {
	label: string;
	value: TValue;
};

type TabsProps<TValue extends string> = {
	"aria-label": string;
	items: readonly TabItem<TValue>[];
	value: TValue;
	onChange: (value: TValue) => void;
	renderPanel: (value: TValue) => ReactNode;
	className?: string;
	panelClassName?: string;
	keepMounted?: boolean;
};

export function Tabs<TValue extends string>({
	"aria-label": ariaLabel,
	items,
	value,
	onChange,
	renderPanel,
	className,
	panelClassName,
	keepMounted = false,
}: TabsProps<TValue>) {
	return (
		<TabsPrimitive.Root
			value={value}
			onValueChange={(nextValue) => onChange(nextValue as TValue)}
			className="contents"
		>
			<TabsPrimitive.List
				aria-label={ariaLabel}
				className={clsx(
					"grid auto-cols-fr grid-flow-col border-b-2 border-border-secondary",
					className,
				)}
			>
				{items.map((item) => (
					<TabsPrimitive.Trigger
						key={item.value}
						value={item.value}
						type="button"
						className={clsx(
							"mb-[-2px] min-w-0 border-b-2 px-2 py-2 text-center focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							"data-[state=active]:border-primary data-[state=active]:bg-bg-elevated data-[state=active]:text-text-bright",
							"data-[state=inactive]:border-transparent data-[state=inactive]:text-text-muted data-[state=inactive]:hover:text-text-bright",
						)}
					>
						{item.label}
					</TabsPrimitive.Trigger>
				))}
			</TabsPrimitive.List>

			{items.map((item) => (
				<TabsPrimitive.Content
					key={item.value}
					value={item.value}
					forceMount={keepMounted ? true : undefined}
					tabIndex={0}
					className={clsx(panelClassName, keepMounted && "data-[state=inactive]:hidden")}
				>
					{renderPanel(item.value)}
				</TabsPrimitive.Content>
			))}
		</TabsPrimitive.Root>
	);
}
