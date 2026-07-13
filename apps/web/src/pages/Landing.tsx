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

	return (
		<Layout>
			{/* TODO: Add header */}

			<div className="flex flex-1 items-center justify-center bg-bg-base px-4">
				<div className="flex w-full max-w-sm flex-col items-center gap-4 text-center">
					<h1 className="grid gap-1" aria-label="Browser Heroes">
						<span className="text-[3rem] leading-none text-primary">BROWSER</span>
						<span className="text-[3rem] leading-none text-primary">HEROES</span>
					</h1>
					<p className="text-secondary">A new road awaits</p>
					<div className="flex justify-center gap-4">
						<Link className="text-primary" to="/create-character">
							PLAY NOW
						</Link>
					</div>

					{run && <CurrentRunSection run={run} />}
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
		<>
			<p>Journey in progress</p>
			<div className="grid w-full gap-2 border border-border-bright bg-bg-panel p-3 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
				<div className="min-w-0">
					<p className="truncate text-text-bright">{heroView.name}</p>

					<p className="text-text">
						Level {heroView.level} {heroClass.name}
					</p>
				</div>

				<Link className="text-primary" to="/game">
					CONTINUE
				</Link>
			</div>
		</>
	);
}
