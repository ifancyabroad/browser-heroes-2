import { Link } from "react-router-dom";
import browserHeroesIcon from "../assets/images/icons/browser_heroes.png";
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
				className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:justify-center"
			>
				<Link
					to="/"
					className="flex items-center gap-2 text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
					aria-label="Browser Heroes home"
				>
					<img
						src={browserHeroesIcon}
						alt=""
						width={32}
						height={32}
						className="h-8 w-8 [image-rendering:pixelated]"
					/>
					<span>
						BROWSER <span className="text-primary">HEROES</span>
					</span>
				</Link>

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
