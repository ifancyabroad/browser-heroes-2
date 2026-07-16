import clsx from "clsx";
import { useRef, type KeyboardEvent } from "react";

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
	panelId?: string;
};

export function Tabs<TValue extends string>({
	"aria-label": ariaLabel,
	items,
	value,
	onChange,
	className,
	panelId,
}: TabsProps<TValue>) {
	const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
		let nextIndex: number | null = null;

		if (event.key === "ArrowRight") {
			nextIndex = (index + 1) % items.length;
		} else if (event.key === "ArrowLeft") {
			nextIndex = (index - 1 + items.length) % items.length;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = items.length - 1;
		}

		if (nextIndex === null) {
			return;
		}

		event.preventDefault();
		onChange(items[nextIndex].value);
		tabRefs.current[nextIndex]?.focus();
	}

	return (
		<div
			className={clsx(
				"grid auto-cols-fr grid-flow-col border-b-2 border-border-secondary",
				className,
			)}
			role="tablist"
			aria-label={ariaLabel}
		>
			{items.map((item, index) => {
				const active = item.value === value;
				const tabId = panelId ? getTabId(panelId, item.value) : undefined;

				return (
					<button
						key={item.value}
						ref={(element) => {
							tabRefs.current[index] = element;
						}}
						id={tabId}
						type="button"
						role="tab"
						aria-selected={active}
						aria-controls={panelId}
						tabIndex={active ? 0 : -1}
						className={clsx(
							"mb-[-2px] min-w-0 border-b-2 px-2 py-2 text-center focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
							active
								? "border-primary bg-bg-elevated text-text-bright"
								: "border-transparent text-text-muted hover:text-text-bright",
						)}
						onClick={() => onChange(item.value)}
						onKeyDown={(event) => handleKeyDown(event, index)}
					>
						{item.label}
					</button>
				);
			})}
		</div>
	);
}

export function getTabId(panelId: string, value: string) {
	return `${panelId}-tab-${value}`;
}
