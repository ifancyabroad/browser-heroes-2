import type { ComponentProps, ReactElement, ReactNode } from "react";
import { DropdownMenu } from "radix-ui";
import clsx from "clsx";

type DropdownProps = {
	trigger: ReactElement;
	children: ReactNode;
} & Pick<ComponentProps<typeof DropdownMenu.Root>, "open" | "onOpenChange">;

export function Dropdown({ trigger, children, open, onOpenChange }: DropdownProps) {
	return (
		<DropdownMenu.Root modal={false} open={open} onOpenChange={onOpenChange}>
			<DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align="start"
					sideOffset={8}
					collisionPadding={12}
					className="z-50 min-w-44 max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto border-2 border-border bg-bg-elevated p-1 text-base text-text shadow-lg outline-none"
				>
					{children}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

export function DropdownItem({ className, ...props }: ComponentProps<typeof DropdownMenu.Item>) {
	return (
		<DropdownMenu.Item
			{...props}
			className={clsx(
				"block cursor-pointer px-3 py-2 outline-none aria-[current=page]:bg-bg-panel aria-[current=page]:text-primary aria-[current=page]:data-[highlighted]:text-primary data-[highlighted]:bg-bg-panel data-[highlighted]:text-text-bright data-[highlighted]:outline-1 data-[highlighted]:-outline-offset-1 data-[highlighted]:outline-border-bright data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
				className,
			)}
		/>
	);
}
