import { useState } from "react";
import { Card } from "../components/Card";
import { Container } from "../components/Container";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PageLayout } from "../components/PageLayout";
import { Tabs } from "../components/Tabs";
import { useAuth } from "../features/auth";
import { GhostHistoryPanel, HeroHistoryPanel } from "../features/history";

const tabs = [
	{ label: "HEROES", value: "heroes" },
	{ label: "GHOSTS", value: "ghosts" },
] as const;
type HistoryTab = (typeof tabs)[number]["value"];

export default function History() {
	const { hasSession } = useAuth();
	const [activeTab, setActiveTab] = useState<HistoryTab>("heroes");

	return (
		<PageLayout>
			<Header />
			<Container>
				<header className="mb-5 grid gap-2">
					<h1 className="text-primary">HISTORY</h1>
					<p className="max-w-3xl text-text">
						Review the journeys of your heroes and the ghosts they left behind.
					</p>
				</header>

				<Card className="min-w-0">
					<Tabs
						aria-label="History type"
						items={tabs}
						value={activeTab}
						onChange={setActiveTab}
						keepMounted
						panelClassName="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
						renderPanel={(tab) =>
							tab === "heroes" ? (
								<HeroHistoryPanel
									hasSession={hasSession}
									isActive={activeTab === "heroes"}
								/>
							) : (
								<GhostHistoryPanel
									hasSession={hasSession}
									isActive={activeTab === "ghosts"}
								/>
							)
						}
					/>
				</Card>
			</Container>
			<Footer />
		</PageLayout>
	);
}
