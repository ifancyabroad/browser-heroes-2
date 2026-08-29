import type { ClassId } from "@app/content";
import type { GetGhostHallOfFameQuery, GetHeroHallOfFameQuery } from "@app/shared";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { TablePagination } from "../components/TablePagination";
import { Tabs } from "../components/Tabs";
import { useAuth } from "../features/auth";
import {
	GhostHallOfFameTable,
	HallOfFameFilters,
	HeroHallOfFameTable,
	useGhostHallOfFame,
	useHeroHallOfFame,
} from "../features/hallOfFame";
import { HeroDossierModal } from "../features/heroDossier";

const PAGE_SIZE = 20;
const tabs = [
	{ label: "HEROES", value: "heroes" },
	{ label: "GHOSTS", value: "ghosts" },
] as const;
type HallOfFameTab = (typeof tabs)[number]["value"];

export default function HallOfFame() {
	const { hasSession } = useAuth();
	const [activeTab, setActiveTab] = useState<HallOfFameTab>("heroes");
	const [classId, setClassId] = useState<ClassId | "all">("all");
	const [userOnly, setUserOnly] = useState(false);
	const [page, setPage] = useState(1);
	const [selectedRunId, setSelectedRunId] = useState<string | null>(null);

	useEffect(() => {
		if (!hasSession && userOnly) {
			setUserOnly(false);
			setPage(1);
		}
	}, [hasSession, userOnly]);

	const sharedQuery = {
		...(classId !== "all" ? { classId } : {}),
		...(userOnly && hasSession ? { userOnly: "true" as const } : {}),
		page,
		limit: PAGE_SIZE,
	};
	const heroQuery: GetHeroHallOfFameQuery = sharedQuery;
	const ghostQuery: GetGhostHallOfFameQuery = sharedQuery;
	const heroes = useHeroHallOfFame(heroQuery, activeTab === "heroes");
	const ghosts = useGhostHallOfFame(ghostQuery, activeTab === "ghosts");

	function changeTab(tab: HallOfFameTab) {
		setActiveTab(tab);
		setPage(1);
	}

	function changeClass(nextClassId: ClassId | "all") {
		setClassId(nextClassId);
		setPage(1);
	}

	function changeUserOnly(nextUserOnly: boolean) {
		setUserOnly(nextUserOnly);
		setPage(1);
	}

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">HALL OF FAME</h1>
					<p className="max-w-3xl text-text">
						Honour the heroes who ventured deepest and the ghosts who still haunt the
						road.
					</p>
				</header>
				<Card className="min-w-0">
					<Tabs
						aria-label="Hall of Fame type"
						items={tabs}
						value={activeTab}
						onChange={changeTab}
						panelClassName="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						renderPanel={(tab) =>
							tab === "heroes" ? (
								<>
									<HallOfFameFilters
										classId={classId}
										onClassChange={changeClass}
										showUserOnly={hasSession}
										entryType="heroes"
										userOnly={userOnly}
										onUserOnlyChange={changeUserOnly}
									/>
									<HallOfFamePanel
										query={heroes}
										emptyMessage="No heroes match these filters."
									>
										{heroes.data && (
											<HeroHallOfFameTable
												entries={heroes.data.entries}
												onSelectRun={setSelectedRunId}
											/>
										)}
									</HallOfFamePanel>
									{heroes.data && !heroes.isError && (
										<TablePagination
											page={page}
											total={heroes.data.total}
											totalPages={heroes.data.totalPages}
											isFetching={heroes.isFetching}
											onPageChange={setPage}
										/>
									)}
									{heroes.isFetching && !heroes.isPending && <UpdatingMessage />}
								</>
							) : (
								<>
									<HallOfFameFilters
										classId={classId}
										onClassChange={changeClass}
										showUserOnly={hasSession}
										entryType="ghosts"
										userOnly={userOnly}
										onUserOnlyChange={changeUserOnly}
									/>
									<HallOfFamePanel
										query={ghosts}
										emptyMessage="No ghosts match these filters."
									>
										{ghosts.data && (
											<GhostHallOfFameTable entries={ghosts.data.entries} />
										)}
									</HallOfFamePanel>
									{ghosts.data && !ghosts.isError && (
										<TablePagination
											page={page}
											total={ghosts.data.total}
											totalPages={ghosts.data.totalPages}
											isFetching={ghosts.isFetching}
											onPageChange={setPage}
										/>
									)}
									{ghosts.isFetching && !ghosts.isPending && <UpdatingMessage />}
								</>
							)
						}
					/>
				</Card>
			</Container>
			<HeroDossierModal runId={selectedRunId} onClose={() => setSelectedRunId(null)} />
			<Footer />
		</PageLayout>
	);
}

function HallOfFamePanel(props: {
	query: { isPending: boolean; isError: boolean; data?: { entries: unknown[] } };
	emptyMessage: string;
	children: ReactNode;
}) {
	if (props.query.isPending) {
		return <p className="px-4 py-12 text-center text-text-muted">Loading rankings...</p>;
	}
	if (props.query.isError) {
		return null;
	}
	if (!props.query.data?.entries.length) {
		return <p className="px-4 py-12 text-center text-text-muted">{props.emptyMessage}</p>;
	}
	return props.children;
}

function UpdatingMessage() {
	return (
		<p className="sr-only" aria-live="polite">
			Updating Hall of Fame...
		</p>
	);
}
