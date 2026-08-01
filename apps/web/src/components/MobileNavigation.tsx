import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { Close } from "pixelarticons/react/Close";
import { Menu } from "pixelarticons/react/Menu";
import { navigationItems } from "../config/navigation";
import { useAuth, useAuthModalStore } from "../features/auth";
import { NavigationLink } from "./NavigationLink";
import styles from "./MobileNavigation.module.css";

export function MobileNavigation() {
	const [open, setOpen] = useState(false);
	const { isRegistered } = useAuth();
	const openLogin = useAuthModalStore((state) => state.openLogin);

	useEffect(() => {
		const desktopMediaQuery = window.matchMedia?.("(min-width: 48rem)");

		if (!desktopMediaQuery) {
			return;
		}

		function closeAtDesktopBreakpoint(event: MediaQueryListEvent) {
			if (event.matches) {
				setOpen(false);
			}
		}

		desktopMediaQuery.addEventListener("change", closeAtDesktopBreakpoint);

		return () => {
			desktopMediaQuery.removeEventListener("change", closeAtDesktopBreakpoint);
		};
	}, []);

	function handleSignIn() {
		setOpen(false);
		openLogin();
	}

	return (
		<div className="md:hidden">
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger asChild>
					<button
						type="button"
						className="inline-flex cursor-pointer items-center border-2 border-border bg-bg-panel px-3 py-1 text-text-bright hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						<Menu aria-hidden="true" className="mr-2 h-4 w-4" />
						MENU
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay
						className={`${styles.overlay} fixed inset-0 z-40 bg-black/70 md:hidden`}
					/>
					<Dialog.Content
						className={`${styles.panel} fixed inset-y-0 left-0 z-50 flex h-dvh w-80 max-w-[calc(100vw-2rem)] flex-col border-r-2 border-border bg-bg-base outline-none md:hidden`}
					>
						<header className="flex items-center justify-between gap-4 border-b-2 border-border bg-bg-elevated px-4 py-3">
							<Dialog.Title className="text-primary">BROWSER HEROES</Dialog.Title>
							<Dialog.Close asChild>
								<button
									type="button"
									className="border-2 border-border bg-bg-panel p-1 text-text-muted hover:border-primary hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
									aria-label="Close menu"
								>
									<Close aria-hidden="true" className="h-4 w-4" />
								</button>
							</Dialog.Close>
						</header>

						<nav
							aria-label="Mobile navigation"
							className="flex flex-col items-start gap-3 overflow-y-auto px-4 py-4"
						>
							{navigationItems.map((item) => (
								<NavigationLink
									key={item.to}
									to={item.to}
									end={item.end}
									onClick={() => setOpen(false)}
								>
									{item.label}
								</NavigationLink>
							))}
							{isRegistered ? (
								<NavigationLink to="/account" onClick={() => setOpen(false)}>
									ACCOUNT
								</NavigationLink>
							) : (
								<button
									type="button"
									className="cursor-pointer border-b-2 border-transparent py-1 text-left hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
									onClick={handleSignIn}
								>
									SIGN IN
								</button>
							)}
						</nav>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
