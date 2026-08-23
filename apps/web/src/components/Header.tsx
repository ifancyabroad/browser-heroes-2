import { useAuth, useAuthModalStore } from "../features/auth";
import { navigationItems } from "../config/navigation";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationLink } from "./NavigationLink";

export function Header() {
	const { isRegistered } = useAuth();
	const openLogin = useAuthModalStore((state) => state.openLogin);

	return (
		<header>
			<nav
				aria-label="Main navigation"
				className="mx-auto flex w-full max-w-6xl items-center justify-end px-4 py-3 md:justify-center"
			>
				<div className="hidden items-center gap-4 md:flex">
					{navigationItems.map((item) => (
						<NavigationLink key={item.to} to={item.to} end={item.end}>
							{item.label}
						</NavigationLink>
					))}
					{isRegistered ? (
						<NavigationLink to="/account">ACCOUNT</NavigationLink>
					) : (
						<button
							type="button"
							className="cursor-pointer border-b-2 border-transparent py-1 hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							onClick={openLogin}
						>
							SIGN IN
						</button>
					)}
				</div>

				<MobileNavigation />
			</nav>
		</header>
	);
}
