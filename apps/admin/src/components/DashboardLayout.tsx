import { Activity, LogOut, Shield, Skull, Sparkles, Swords, Users } from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useLogout } from "../features/auth";
import { Filters, useOverview, type MetricsFilters } from "../features/metrics";
import type { DatePreset } from "../lib/dates";

export type DashboardContext = {
	filters: MetricsFilters;
	overview: ReturnType<typeof useOverview>;
};

export function DashboardLayout(props: {
	filters: MetricsFilters;
	preset: DatePreset;
	onFiltersChange: (filters: MetricsFilters, preset: DatePreset) => void;
	overview: DashboardContext["overview"];
}) {
	const logout = useLogout();
	const location = useLocation();
	const page = pageDetails[location.pathname] ?? pageDetails["/"];
	return (
		<div className="shell">
			<aside className="sidebar">
				<div className="logo">
					<span>BH</span>
					<div>
						<strong>Browser Heroes</strong>
						<small>Adventurer's ledger</small>
					</div>
				</div>
				<nav aria-label="Dashboard navigation">
					<p className="nav-label">Health</p>
					<NavLink to="/" end>
						<Activity aria-hidden="true" /> Overview
					</NavLink>
					<NavLink to="/players">
						<Users aria-hidden="true" /> Players
					</NavLink>
					<NavLink to="/runs">
						<Swords aria-hidden="true" /> Runs
					</NavLink>
					<p className="nav-label">Balance</p>
					<NavLink to="/classes">
						<Shield aria-hidden="true" /> Classes
					</NavLink>
					<NavLink to="/enemies">
						<Skull aria-hidden="true" /> Enemies
					</NavLink>
					<NavLink to="/skills">
						<Sparkles aria-hidden="true" /> Skills
					</NavLink>
				</nav>
				<button className="sign-out" onClick={() => logout.mutate()}>
					<LogOut aria-hidden="true" /> Sign out
				</button>
			</aside>
			<div className="workspace">
				<header className="workspace-header">
					<div>
						<p className="eyebrow">Internal analytics / {page.section}</p>
						<h1>{page.title}</h1>
						<p className="header-description">{page.description}</p>
					</div>
				</header>
				<div className="filter-bar">
					<Filters
						filters={props.filters}
						preset={props.preset}
						onChange={props.onFiltersChange}
					/>
				</div>
				<Outlet
					context={
						{
							filters: props.filters,
							overview: props.overview,
						} satisfies DashboardContext
					}
				/>
			</div>
		</div>
	);
}

const pageDetails: Record<string, { title: string; description: string; section: string }> = {
	"/": {
		title: "Game health",
		description: "A clear view of activity, outcomes, and progression.",
		section: "Health",
	},
	"/players": {
		title: "Player engagement",
		description: "Activity, return behaviour, and retention.",
		section: "Health",
	},
	"/runs": {
		title: "Run performance",
		description: "Cohort outcomes, depth, and abandonment.",
		section: "Health",
	},
	"/classes": {
		title: "Class performance",
		description: "Popularity, progression, and outcomes by class.",
		section: "Balance",
	},
	"/enemies": {
		title: "Enemy performance",
		description: "Combat volume, difficulty, and player outcomes.",
		section: "Balance",
	},
	"/skills": {
		title: "Skill performance",
		description: "Usage patterns and combat outcomes by skill.",
		section: "Balance",
	},
};
