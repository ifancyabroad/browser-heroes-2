import { matchPath, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChevronDown } from "pixelarticons/react/ChevronDown";
import clsx from "clsx";
import type { NavigationItem } from "../config/navigation";
import { Dropdown, DropdownItem } from "./Dropdown";

type NavigationDropdownProps = {
	label: string;
	items: readonly NavigationItem[];
};

export function NavigationDropdown({ label, items }: NavigationDropdownProps) {
	const [open, setOpen] = useState(false);
	const { pathname } = useLocation();
	const active = items.some((item) => matchPath({ path: item.to, end: item.end }, pathname));

	useEffect(() => {
		const desktop = window.matchMedia("(min-width: 48rem)");
		function closeOnMobile(event: MediaQueryListEvent) {
			if (!event.matches) {
				setOpen(false);
			}
		}
		desktop.addEventListener("change", closeOnMobile);
		return () => desktop.removeEventListener("change", closeOnMobile);
	}, []);

	return (
		<Dropdown
			open={open}
			onOpenChange={setOpen}
			trigger={
				<button
					type="button"
					className={clsx(
						"group inline-flex cursor-pointer items-center gap-1 border-b-2 py-1 hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
						active ? "border-primary text-text-bright" : "border-transparent",
					)}
				>
					{label}
					<ChevronDown
						aria-hidden="true"
						className="h-4 w-4 shrink-0 group-data-[state=open]:rotate-180"
					/>
				</button>
			}
		>
			{items.map((item) => (
				<DropdownItem key={item.to} asChild>
					<NavLink to={item.to} end={item.end}>
						{item.label}
					</NavLink>
				</DropdownItem>
			))}
		</Dropdown>
	);
}
