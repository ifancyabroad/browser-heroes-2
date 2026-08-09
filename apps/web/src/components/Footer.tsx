import buyMeACoffeeLogo from "../assets/images/icons/bmc-logo.svg";

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/durfu";

export function Footer() {
	return (
		<footer>
			<div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-4 px-4 py-4 text-text-muted">
				<p>&copy; {new Date().getFullYear()} Browser Heroes</p>
				<span aria-hidden="true" className="h-5 border-l-2 border-border-secondary" />
				<a
					href={BUY_ME_A_COFFEE_URL}
					target="_blank"
					rel="noreferrer"
					className="flex items-center gap-2 text-text hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				>
					<img src={buyMeACoffeeLogo} alt="" className="h-5 w-auto" />
					<span>Buy me a coffee</span>
				</a>
			</div>
		</footer>
	);
}
