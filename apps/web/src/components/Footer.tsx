import buyMeACoffeeLogo from "../assets/images/icons/bmc-logo.svg";

const BUY_ME_A_COFFEE_URL = "https://buymeacoffee.com/durfu";

export function Footer() {
	return (
		<footer>
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-2 px-4 py-4 text-center text-text-muted xs:flex-row xs:gap-4">
				<p className="order-3 whitespace-nowrap xs:order-1">
					&copy; {new Date().getFullYear()} Browser Heroes
				</p>
				<span
					aria-hidden="true"
					className="order-2 w-5 border-t-2 border-border-secondary xs:h-5 xs:w-auto xs:border-l-2 xs:border-t-0"
				/>
				<a
					href={BUY_ME_A_COFFEE_URL}
					target="_blank"
					rel="noreferrer"
					className="order-1 flex items-center gap-2 whitespace-nowrap text-text hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary xs:order-3"
				>
					<img src={buyMeACoffeeLogo} alt="" className="h-5 w-auto" />
					<span>Buy me a coffee</span>
				</a>
			</div>
		</footer>
	);
}
