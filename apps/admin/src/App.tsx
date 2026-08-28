import { HTTPError } from "ky";
import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { QueryLoading } from "./components/QueryState";
import { SignIn, Unauthorized, useCurrentUser } from "./features/auth";
import { useOverview, type MetricsFilters } from "./features/metrics";
import { presetRange, type DatePreset } from "./lib/dates";
import { ClassesPage } from "./pages/ClassesPage";
import { EnemiesPage } from "./pages/EnemiesPage";
import { OverviewPage } from "./pages/OverviewPage";
import { SkillsPage } from "./pages/SkillsPage";

export default function App() {
	const auth = useCurrentUser();
	const [preset, setPreset] = useState<DatePreset>(30);
	const [filters, setFilters] = useState<MetricsFilters>({
		...presetRange(30),
		mode: "all",
	});
	const isRegistered = auth.data?.user?.type === "registered";
	const overview = useOverview(filters, isRegistered);

	if (auth.isPending) {
		return <QueryLoading />;
	}
	if (auth.isError || !isRegistered) {
		return <SignIn />;
	}
	if (overview.error instanceof HTTPError && overview.error.response.status === 403) {
		return <Unauthorized />;
	}

	return (
		<Routes>
			<Route
				element={
					<DashboardLayout
						filters={filters}
						preset={preset}
						onFiltersChange={(next, nextPreset) => {
							setFilters(next);
							setPreset(nextPreset);
						}}
						overview={overview}
					/>
				}
			>
				<Route index element={<OverviewPage />} />
				<Route path="classes" element={<ClassesPage />} />
				<Route path="enemies" element={<EnemiesPage />} />
				<Route path="skills" element={<SkillsPage />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
