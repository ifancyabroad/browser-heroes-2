import { Link, Navigate, useParams } from "react-router-dom";
import { selectRunSummaryView } from "@app/engine";
import { PageLoader } from "../components/PageLoader";
import { GameLayout } from "../components/GameLayout";
import { RunSummaryScreen } from "../features/runSummary";
import { useRun } from "../features/runs";

export default function RunSummary() {
	const { runId } = useParams<{ runId: string }>();

	if (!runId) {
		return <SummaryUnavailable />;
	}

	return <RunSummaryContent runId={runId} />;
}

function RunSummaryContent({ runId }: { runId: string }) {
	const { data, isPending, isError } = useRun(runId);

	if (isPending) {
		return <PageLoader />;
	}

	if (isError || !data?.run) {
		return <SummaryUnavailable />;
	}

	const { run } = data;

	if (run.status === "active") {
		return <Navigate to="/game" replace />;
	}

	const summary = selectRunSummaryView(run.state);

	if (!summary) {
		return <SummaryUnavailable />;
	}

	return <RunSummaryScreen summary={summary} />;
}

function SummaryUnavailable() {
	return (
		<GameLayout>
			<div className="flex min-h-0 flex-1 items-center justify-center bg-bg-base px-4 text-base text-text">
				<section className="grid w-full max-w-xl gap-5 border border-border bg-bg-elevated p-6">
					<h1 className="text-base text-text-bright">Run summary unavailable</h1>
					<p className="text-text-muted">This run could not be loaded.</p>
					<Link
						className="text-primary underline hover:opacity-80"
						to="/create-character"
					>
						Create Character
					</Link>
				</section>
			</div>
		</GameLayout>
	);
}
