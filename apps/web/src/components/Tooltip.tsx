import type { PropsWithChildren, ReactNode } from "react";
import { useState } from "react";
import {
	autoUpdate,
	flip,
	FloatingDelayGroup,
	FloatingPortal,
	offset,
	shift,
	useDelayGroup,
	useDismiss,
	useFloating,
	useFocus,
	useHover,
	useInteractions,
	useRole,
	type Placement,
} from "@floating-ui/react";
import clsx from "clsx";

type TooltipProviderProps = PropsWithChildren;

type TooltipProps = PropsWithChildren<{
	content: ReactNode;
	placement?: Placement;
	disabled?: boolean;
	className?: string;
	contentClassName?: string;
}>;

export function TooltipProvider({ children }: TooltipProviderProps) {
	return (
		<FloatingDelayGroup delay={{ open: 350, close: 100 }} timeoutMs={500}>
			{children}
		</FloatingDelayGroup>
	);
}

export function Tooltip({
	content,
	placement = "top",
	disabled = false,
	className,
	contentClassName,
	children,
}: TooltipProps) {
	const [open, setOpen] = useState(false);
	const enabled = !disabled && content !== null && content !== undefined;

	const { refs, floatingStyles, context } = useFloating({
		open: enabled ? open : false,
		onOpenChange: setOpen,
		placement,
		strategy: "fixed",
		middleware: [offset(8), flip(), shift({ padding: 8 })],
		whileElementsMounted: autoUpdate,
	});

	const { delay } = useDelayGroup(context);
	const hover = useHover(context, { delay, enabled, move: false });
	const focus = useFocus(context, { enabled });
	const dismiss = useDismiss(context, { enabled });
	const role = useRole(context, { enabled, role: "tooltip" });
	const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

	return (
		<>
			<span
				ref={refs.setReference}
				className={clsx("inline-block", enabled && "cursor-help", className)}
				{...getReferenceProps({ tabIndex: enabled ? 0 : undefined })}
			>
				{children}
			</span>

			{enabled && open && (
				<FloatingPortal>
					<div
						ref={refs.setFloating}
						style={floatingStyles}
						className={clsx(
							"pointer-events-none z-50 border-2 border-border bg-bg-elevated p-3 text-base text-text shadow-[0_0_0_1px_var(--color-bg-base)]",
							!contentClassName && "max-w-sm",
							contentClassName,
						)}
						{...getFloatingProps()}
					>
						{content}
					</div>
				</FloatingPortal>
			)}
		</>
	);
}
