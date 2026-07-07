import { CLASSES_BY_ID } from "@app/content";
import { selectHeroView } from "@app/engine";
import type { RunView } from "@app/shared";
import { Card } from "../components/Card";
import logo from "../assets/images/logos/browser_heroes.png";
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

			<div className="flex-1 flex items-center justify-center">
				<div className="max-w-sm w-full">
					<Card className="text-center flex flex-col items-center gap-4 p-4">
						<img src={logo} alt="Browser Heroes" width="260" />
						<p>Start a new adventure!</p>
						<div className="flex justify-center gap-4">
							<Link className="text-primary" to="/create-character">
								PLAY NOW
							</Link>
						</div>

						{run && <CurrentRunSection run={run} />}
					</Card>
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
			<p>Continue your adventure!</p>
			<div className="flex justify-between gap-4 p-4 border border-info w-full">
				<p className="text-text-bright">{heroView.name}</p>

				<p className="text-text">
					Level {heroView.level} {heroClass.name}
				</p>

				<Link className="text-primary" to="/game">
					CONTINUE
				</Link>
			</div>
		</>
	);
}
