import type { UserStatsSummaryView } from "@app/shared";
import { useState } from "react";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { PageLayout } from "../components/PageLayout";
import { Tabs } from "../components/Tabs";
import { useAuth } from "../features/auth";
import { GhostStatsPanel, HeroStatsPanel, useStatsSummary } from "../features/stats";

const tabs = [
	{ label: "HEROES", value: "heroes" },
	{ label: "GHOSTS", value: "ghosts" },
] as const;
type StatsTab = (typeof tabs)[number]["value"];

const emptySummary: UserStatsSummaryView = {
	runs: {
		total: 0,
		dead: 0,
		retired: 0,
		wins: 0,
		bestBattleNumber: 0,
		bestZoneNumber: 0,
		bestEndlessCycle: 0,
		bestDay: 0,
		totalKills: 0,
	},
	ghosts: {
		total: 0,
		kills: 0,
		deaths: 0,
		encounters: 0,
		winRate: 0,
	},
};

export default function Stats() {
	const { hasSession } = useAuth();
	const [activeTab, setActiveTab] = useState<StatsTab>("heroes");
	const summary = useStatsSummary(hasSession);
	const panelProps = {
		hasSession,
		summary: summary.data?.summary ?? emptySummary,
		summaryPending: summary.isPending,
		summaryError: summary.isError,
		onSummaryRetry: () => void summary.refetch(),
	};

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">STATS</h1>
					<p className="max-w-3xl text-text">
						Review the journeys of your heroes and the ghosts they left behind.
					</p>
				</header>

				<Card className="min-w-0">
					<Tabs
						aria-label="Stats type"
						items={tabs}
						value={activeTab}
						onChange={setActiveTab}
						keepMounted
						panelClassName="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						renderPanel={(tab) =>
							tab === "heroes" ? (
								<HeroStatsPanel {...panelProps} isActive={activeTab === "heroes"} />
							) : (
								<GhostStatsPanel
									{...panelProps}
									isActive={activeTab === "ghosts"}
								/>
							)
						}
					/>
				</Card>
			</Container>
		</PageLayout>
	);
}
