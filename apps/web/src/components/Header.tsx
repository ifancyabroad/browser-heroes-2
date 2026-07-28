import clsx from "clsx";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth";
import { LoginModal } from "../features/auth/components/LoginModal";

const navigationItems = [
	{ label: "HOME", to: "/", end: true },
	{ label: "LEADERBOARDS", to: "/leaderboard", end: false },
	{ label: "STATS", to: "/stats", end: false },
] as const;

export function Header() {
	const { isRegistered } = useAuth();
	const [isLoginOpen, setIsLoginOpen] = useState(false);

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
								isActive ? "border-primary text-text-bright" : "border-transparent",
							)
						}
					>
						{item.label}
					</NavLink>
				))}
				{isRegistered ? (
					<NavLink
						to="/account"
						className={({ isActive }) =>
							clsx(
								"border-b-2 py-1 hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
								isActive ? "border-primary text-text-bright" : "border-transparent",
							)
						}
					>
						ACCOUNT
					</NavLink>
				) : (
					<button
						type="button"
						className="cursor-pointer border-b-2 border-transparent py-1 hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						onClick={() => setIsLoginOpen(true)}
					>
						SIGN IN
					</button>
				)}
			</nav>
			<LoginModal
				open={isLoginOpen}
				onClose={() => setIsLoginOpen(false)}
				onSuccess={() => setIsLoginOpen(false)}
			/>
		</header>
	);
}
