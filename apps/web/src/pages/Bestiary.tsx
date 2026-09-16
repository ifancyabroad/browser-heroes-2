import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { useAuth } from "../features/auth";
import { BestiaryCatalogue, useBestiary } from "../features/bestiary";

export default function Bestiary() {
	const { hasSession, user } = useAuth();
	const bestiaryQuery = useBestiary(hasSession);
	const entries = hasSession ? (bestiaryQuery.data?.entries ?? []) : [];

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">BESTIARY</h1>
					<p>
						Encounter enemies across your adventures to reveal their traits and
						abilities.
					</p>
				</header>

				{hasSession && bestiaryQuery.isPending ? (
					<p role="status">Loading bestiary...</p>
				) : hasSession && bestiaryQuery.isError ? (
					<div role="alert" className="grid justify-items-start gap-3">
						<p>Unable to load the bestiary.</p>
						<Button type="button" onClick={() => void bestiaryQuery.refetch()}>
							TRY AGAIN
						</Button>
					</div>
				) : (
					<BestiaryCatalogue key={user?.id ?? "anonymous"} entries={entries} />
				)}
			</Container>
			<Footer />
		</PageLayout>
	);
}
