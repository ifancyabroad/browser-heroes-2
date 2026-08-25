import { achievements } from "@app/content";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageLayout } from "../components/PageLayout";
import { AchievementGrid, useAchievements } from "../features/achievements";
import { useAuth } from "../features/auth";

export default function Progress() {
	const { hasSession } = useAuth();
	const achievementQuery = useAchievements(hasSession);
	const unlocks = achievementQuery.data?.unlocks ?? [];
	const progress = achievementQuery.data?.progress ?? [];

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">PROGRESS</h1>
					<p className="max-w-3xl text-text">
						Complete achievements across your heroes and leave a lasting mark on the
						world.
					</p>
				</header>

				<section aria-label="Achievement progress">
					{hasSession && achievementQuery.isPending ? (
						<p className="py-8 text-center text-text-muted">Loading achievements...</p>
					) : (
						<div className="grid gap-4">
							<p className="text-text-muted tabular-nums">
								{unlocks.length} / {achievements.length} UNLOCKED
							</p>
							<AchievementGrid unlocks={unlocks} progress={progress} />
						</div>
					)}
				</section>
			</Container>
			<Footer />
		</PageLayout>
	);
}
