import clsx from "clsx";
import { NavLink } from "react-router-dom";

const navigationItems = [
	{ label: "HOME", to: "/", end: true },
	{ label: "LEADERBOARDS", to: "/leaderboard", end: false },
	{ label: "STATS", to: "/stats", end: false },
	{ label: "ACCOUNT", to: "/account", end: false },
] as const;

export function Header() {
	return (
		<header className="bg-bg-elevated">
			<nav
				aria-label="Main navigation"
				className="mx-auto flex w-full max-w-6xl items-center justify-end gap-4 px-4 py-3"
			>
				{navigationItems.map((item) => (
					<NavLink
						key={item.to}
						to={item.to}
						end={item.end}
						className={({ isActive }) =>
							clsx(
								"border-b-2 py-1 hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
								isActive
									? "border-primary text-text-bright"
									: "border-transparent text-text-muted",
							)
						}
					>
						{item.label}
					</NavLink>
				))}
			</nav>
		</header>
	);
}
