import { useEffect, useState, type PropsWithChildren, type ReactNode } from "react";
import { Popover as PopoverPrimitive, Tooltip as TooltipPrimitive } from "radix-ui";
import clsx from "clsx";
import { useOverlayPortalContainer } from "../contexts/OverlayPortalContext";

type TooltipProviderProps = PropsWithChildren;

type TooltipProps = PropsWithChildren<{
	content: ReactNode;
	placement?: "top" | "right" | "bottom" | "left";
	disabled?: boolean;
	className?: string;
	contentClassName?: string;
	referenceTabIndex?: number | null;
	mobileBehavior?: "popover" | "disabled";
}>;

export function TooltipProvider({ children }: TooltipProviderProps) {
	return (
		<TooltipPrimitive.Provider
			delayDuration={350}
			skipDelayDuration={500}
			disableHoverableContent={false}
		>
			{children}
		</TooltipPrimitive.Provider>
	);
}

export function Tooltip({
	content,
	placement = "right",
	disabled = false,
	className,
	contentClassName,
	referenceTabIndex = 0,
	mobileBehavior = "popover",
	children,
}: TooltipProps) {
	const enabled = !disabled && content !== null && content !== undefined;
	const usesTouchInteraction = useCoarsePointer();
	const portalContainer = useOverlayPortalContainer();

	const trigger = (
		<span
			className={clsx("inline-block", enabled && "cursor-help", className)}
			tabIndex={enabled ? (referenceTabIndex ?? undefined) : undefined}
		>
			{children}
		</span>
	);

	if (!enabled || (usesTouchInteraction && mobileBehavior === "disabled")) {
		return trigger;
	}

	if (usesTouchInteraction) {
		const touchPlacement = placement === "left" || placement === "right" ? "bottom" : placement;

		return (
			<PopoverPrimitive.Root>
				<PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
				<PopoverPrimitive.Portal container={portalContainer ?? undefined}>
					<PopoverPrimitive.Content
						side={touchPlacement}
						sideOffset={8}
						collisionPadding={8}
						className={clsx(
							getContentClassName(contentClassName),
							"max-h-[var(--radix-popover-content-available-height)] max-w-[var(--radix-popover-content-available-width)] overflow-y-auto overscroll-contain",
						)}
					>
						{content}
					</PopoverPrimitive.Content>
				</PopoverPrimitive.Portal>
			</PopoverPrimitive.Root>
		);
	}

	return (
		<TooltipPrimitive.Root>
			<TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
			<TooltipPrimitive.Portal container={portalContainer ?? undefined}>
				<TooltipPrimitive.Content
					side={placement}
					sideOffset={8}
					collisionPadding={8}
					className={clsx(
						getContentClassName(contentClassName),
						"max-h-[var(--radix-tooltip-content-available-height)] max-w-[var(--radix-tooltip-content-available-width)] overflow-y-auto overscroll-contain",
					)}
				>
					{content}
				</TooltipPrimitive.Content>
			</TooltipPrimitive.Portal>
		</TooltipPrimitive.Root>
	);
}

function useCoarsePointer() {
	const [matches, setMatches] = useState(
		() => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(pointer: coarse)");
		const handleChange = () => setMatches(mediaQuery.matches);

		handleChange();
		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	return matches;
}

function getContentClassName(contentClassName?: string) {
	return clsx(
		"z-50 border-2 border-border bg-bg-elevated p-3 text-base text-text",
		!contentClassName && "max-w-sm",
		contentClassName,
	);
}
