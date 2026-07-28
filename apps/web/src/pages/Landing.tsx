import { CLASSES_BY_ID } from "@app/content";
import { selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { useAuth } from "../features/auth";
import { useCurrentRun } from "../features/runs";
import { Button, ButtonLink } from "../components/Button";
import { Layout } from "../components/Layout";
import { PageLoader } from "../components/PageLoader";
import { Header } from "../components/Header";
import { useState } from "react";
import { Container } from "../components/Container";
import { RegisterModal } from "../features/auth/components/RegisterModal";

export default function Landing() {
	const { user, hasSession, isRegistered } = useAuth();
	const [isRegisterOpen, setIsRegisterOpen] = useState(false);
	const currentRun = useCurrentRun({
		enabled: hasSession,
	});

	const run = currentRun.data?.run ?? null;
	const isCheckingRun = hasSession && currentRun.isLoading;

	if (isCheckingRun) {
		return <PageLoader />;
	}

	return (
		<Layout>
			<Header />
			<Container className="flex items-center justify-center">
				<div className="flex w-full max-w-sm flex-col items-center gap-5 text-center">
					<div className="grid gap-2">
						<h1
							className="flex flex-col gap-1 sm:flex-row sm:gap-3"
							aria-label="Browser Heroes"
						>
							<span className="text-[3rem] leading-none text-primary">BROWSER</span>
							<span className="text-[3rem] leading-none text-primary">HEROES</span>
						</h1>
						<p className="text-secondary">A new road awaits</p>
					</div>
					<div className="grid gap-2">
						{isRegistered && (
							<p className="text-text-bright">Welcome back, {user?.displayName}.</p>
						)}
						<p>
							Create a hero, master their skills, and survive a turn-based journey
							through increasingly deadly encounters.
						</p>
					</div>

					{run && <CurrentRunSection run={run} />}

					<div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
						{run && (
							<ButtonLink variant="primary" to="/game">
								CONTINUE
							</ButtonLink>
						)}
						<ButtonLink variant={run ? "default" : "primary"} to="/create-character">
							{run ? "NEW HERO" : "PLAY NOW"}
						</ButtonLink>
					</div>

					{!isRegistered && (
						<div className="grid w-full justify-items-center gap-3 border-t-2 border-border-secondary pt-4">
							<p>Keep your heroes across browsers and devices.</p>
							<Button type="button" onClick={() => setIsRegisterOpen(true)}>
								CREATE ACCOUNT
							</Button>
						</div>
					)}
				</div>
			</Container>
			<RegisterModal open={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} />
		</Layout>
	);
}

type CurrentRunSectionProps = {
	run: RunView;
};

function CurrentRunSection({ run }: CurrentRunSectionProps) {
	const heroView = selectHeroView(run.state.hero);
	const heroClass = CLASSES_BY_ID[heroView.classId];

	return (
		<div className="flex w-full items-center justify-between gap-3 border-2 border-border bg-bg-panel px-3 py-2 text-left">
			<div className="min-w-0">
				<p className="truncate text-text-bright">{heroView.name}</p>

				<p className="text-text">
					Level {heroView.level} {heroClass.name}
				</p>
			</div>

			<p className="shrink-0 text-info">IN PROGRESS</p>
		</div>
	);
}
