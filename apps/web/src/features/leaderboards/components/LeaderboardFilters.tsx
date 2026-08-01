import type { ClassId } from "@app/content";
import type { LeaderboardScope } from "@app/shared";
import { Button } from "../../../components/Button";
import { ClassSelect } from "../../../components/ClassSelect";
import { addUtcDays, formatDailyDate, getTodayUtc } from "../../../utils/date";
import { ArrowLeft } from "pixelarticons/react/ArrowLeft";
import { ArrowRight } from "pixelarticons/react/ArrowRight";

type LeaderboardFiltersProps = {
	classId: ClassId | "all";
	onClassChange: (classId: ClassId | "all") => void;
	showUserOnly: boolean;
	entryType: "heroes" | "ghosts";
	userOnly: boolean;
	onUserOnlyChange: (userOnly: boolean) => void;
	scope?: LeaderboardScope;
	onScopeChange?: (scope: LeaderboardScope) => void;
	dailyDate?: string;
	onDailyDateChange?: (date: string) => void;
};

export function LeaderboardFilters({
	classId,
	onClassChange,
	showUserOnly,
	entryType,
	userOnly,
	onUserOnlyChange,
	scope,
	onScopeChange,
	dailyDate,
	onDailyDateChange,
}: LeaderboardFiltersProps) {
	const isToday = dailyDate === getTodayUtc();

	return (
		<div className="border-b-2 border-border-secondary bg-bg-panel p-3">
			<div className="flex flex-wrap items-end gap-3">
				<ClassSelect value={classId} onChange={onClassChange} />

				{showUserOnly && (
					<div className="grid gap-1">
						<span className="text-text-label">ENTRIES</span>
						<div className="flex gap-2">
							<Button
								type="button"
								variant={!userOnly ? "primary" : "default"}
								aria-pressed={!userOnly}
								onClick={() => onUserOnlyChange(false)}
							>
								ALL {entryType.toUpperCase()}
							</Button>
							<Button
								type="button"
								variant={userOnly ? "primary" : "default"}
								aria-pressed={userOnly}
								onClick={() => onUserOnlyChange(true)}
							>
								MY {entryType.toUpperCase()}
							</Button>
						</div>
					</div>
				)}

				{scope && onScopeChange && (
					<div className="grid gap-1">
						<span className="text-text-label">PERIOD</span>
						<div className="flex gap-2">
							<Button
								type="button"
								variant={scope === "daily" ? "primary" : "default"}
								aria-pressed={scope === "daily"}
								onClick={() => onScopeChange("daily")}
							>
								DAILY
							</Button>
							<Button
								type="button"
								variant={scope === "overall" ? "primary" : "default"}
								aria-pressed={scope === "overall"}
								onClick={() => onScopeChange("overall")}
							>
								OVERALL
							</Button>
						</div>
					</div>
				)}

				{scope === "daily" && dailyDate && onDailyDateChange && (
					<div
						className="flex basis-full items-center gap-2 md:basis-auto"
						aria-label="Daily leaderboard date"
					>
						<div className="flex min-w-0 flex-1 items-center gap-2 md:flex-none">
							<Button
								type="button"
								aria-label="Previous day"
								onClick={() => onDailyDateChange(addUtcDays(dailyDate, -1))}
							>
								<ArrowLeft aria-hidden="true" className="h-4 w-4" />
							</Button>
							<p className="min-w-0 flex-1 whitespace-nowrap text-center text-text-bright md:min-w-52">
								{formatDailyDate(dailyDate)}
							</p>
							<Button
								type="button"
								aria-label="Next day"
								disabled={isToday}
								onClick={() => onDailyDateChange(addUtcDays(dailyDate, 1))}
							>
								<ArrowRight aria-hidden="true" className="h-4 w-4" />
							</Button>
						</div>
						<Button
							type="button"
							variant="primary"
							disabled={isToday}
							onClick={() => onDailyDateChange(getTodayUtc())}
						>
							TODAY
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
