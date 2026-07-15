import { CLASSES_BY_ID } from "@app/content";
import { selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { useCurrentUser } from "../features/auth";
import { useCurrentRun } from "../features/runs";
import { Link } from "../components/Link";
import { Layout } from "../components/Layout";

export default function Landing() {
	const { data } = useCurrentUser();
	const currentRun = useCurrentRun({
		enabled: Boolean(data?.user),
	});

	const run = currentRun.data?.run ?? null;
	const isCheckingRun = Boolean(data?.user) && currentRun.isLoading;

	return (
		<Layout>
			<div className="flex flex-1 items-center justify-center bg-bg-base px-4">
				<div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
					<h1 className="grid gap-1" aria-label="Browser Heroes">
						<span className="text-[3rem] leading-none text-primary">BROWSER</span>
						<span className="text-[3rem] leading-none text-primary">HEROES</span>
					</h1>
					<p className="text-secondary">A new road awaits</p>

					{isCheckingRun ? (
						<p className="text-text-muted">Checking journey...</p>
					) : (
						<>
							{run && <CurrentRunSection run={run} />}

							<div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
								{run && (
									<Link variant="primary" to="/game">
										CONTINUE
									</Link>
								)}
								<Link variant={run ? "default" : "primary"} to="/create-character">
									{run ? "NEW HERO" : "PLAY NOW"}
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</Layout>
	);
}

type CurrentRunSectionProps = {
	run: RunView;
};

function CurrentRunSection({ run }: CurrentRunSectionProps) {
	const heroView = selectHeroView(run.state);
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
