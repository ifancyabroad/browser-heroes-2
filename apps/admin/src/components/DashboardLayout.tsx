import { NavLink, Outlet } from "react-router-dom";
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
	return (
		<div className="shell">
			<aside>
				<div className="logo">
					<span>BH</span>
					<div>
						<strong>Browser Heroes</strong>
						<small>Metrics console</small>
					</div>
				</div>
				<nav>
					<NavLink to="/" end>
						Overview
					</NavLink>
					<NavLink to="/players">Players</NavLink>
					<NavLink to="/runs">Runs</NavLink>
					<NavLink to="/classes">Classes</NavLink>
					<NavLink to="/enemies">Enemies</NavLink>
					<NavLink to="/skills">Skills</NavLink>
				</nav>
				<button className="sign-out" onClick={() => logout.mutate()}>
					Sign out
				</button>
			</aside>
			<div className="workspace">
				<header>
					<div>
						<p className="eyebrow">Internal analytics</p>
						<h1>Game health</h1>
					</div>
					<Filters
						filters={props.filters}
						preset={props.preset}
						onChange={props.onFiltersChange}
					/>
				</header>
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
