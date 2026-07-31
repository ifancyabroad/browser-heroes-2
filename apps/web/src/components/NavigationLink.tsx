import type { NavLinkProps } from "react-router-dom";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

type NavigationLinkProps = Pick<NavLinkProps, "children" | "end" | "onClick" | "to">;

export function NavigationLink({ children, end, onClick, to }: NavigationLinkProps) {
	return (
		<NavLink
			to={to}
			end={end}
			onClick={onClick}
			className={({ isActive }) =>
				clsx(
					"border-b-2 py-1 hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					isActive ? "border-primary text-text-bright" : "border-transparent",
				)
			}
		>
			{children}
		</NavLink>
	);
}
