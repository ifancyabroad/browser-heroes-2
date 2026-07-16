import type { PropsWithChildren, ReactNode } from "react";
import { Tooltip as TooltipPrimitive } from "radix-ui";
import clsx from "clsx";

type TooltipProviderProps = PropsWithChildren;

type TooltipProps = PropsWithChildren<{
	content: ReactNode;
	placement?: "top" | "right" | "bottom" | "left";
	disabled?: boolean;
	className?: string;
	contentClassName?: string;
	referenceTabIndex?: number | null;
}>;

export function TooltipProvider({ children }: TooltipProviderProps) {
	return (
		<TooltipPrimitive.Provider
			delayDuration={350}
			skipDelayDuration={500}
			disableHoverableContent
		>
			{children}
		</TooltipPrimitive.Provider>
	);
}

export function Tooltip({
	content,
	placement = "top",
	disabled = false,
	className,
	contentClassName,
	referenceTabIndex = 0,
	children,
}: TooltipProps) {
	const enabled = !disabled && content !== null && content !== undefined;

	const trigger = (
		<span
			className={clsx("inline-block", enabled && "cursor-help", className)}
			tabIndex={enabled ? (referenceTabIndex ?? undefined) : undefined}
		>
			{children}
		</span>
	);

	if (!enabled) {
		return trigger;
	}

	return (
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal>
				<TooltipPrimitive.Content
					side={placement}
					sideOffset={8}
					collisionPadding={8}
					className={clsx(
						"pointer-events-none z-50 border-2 border-border bg-bg-elevated p-3 text-base text-text",
						!contentClassName && "max-w-sm",
						contentClassName,
					)}
				>
					{content}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	);
}
