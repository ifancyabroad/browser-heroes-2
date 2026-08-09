import browserHeroesLogo from "../assets/images/logos/browser_heroes.png";
import { Container } from "../components/Container";
import { PageLayout } from "../components/PageLayout";

export function HoldingPage() {
	return (
		<PageLayout>
			<Container className="flex items-center justify-center">
				<div className="flex w-full max-w-sm flex-col items-center gap-5 text-center">
					<h1 className="flex justify-center">
						<img
							src={browserHeroesLogo}
							alt="Browser Heroes"
							className="h-auto w-full max-w-[19rem]"
						/>
					</h1>
					<div className="grid gap-2 border-y-2 border-border-secondary py-5">
						<p className="text-primary">COMING SOON</p>
						<p>A new adventure is being prepared. Check back soon.</p>
					</div>
				</div>
			</Container>
		</PageLayout>
	);
}
