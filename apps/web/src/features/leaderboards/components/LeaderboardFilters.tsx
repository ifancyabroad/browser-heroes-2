import type { ClassId } from "@app/content";
import type { LeaderboardScope } from "@app/shared";
import { Button } from "../../../components/Button";
import { ClassSelect } from "../../../components/ClassSelect";
import { addUtcDays, formatDailyDate, getTodayUtc } from "../../../utils/date";

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
		<div className="grid gap-3 border-b-2 border-border-secondary bg-bg-panel p-3">
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
								variant={scope === "overall" ? "primary" : "default"}
								aria-pressed={scope === "overall"}
								onClick={() => onScopeChange("overall")}
							>
								OVERALL
							</Button>
							<Button
								type="button"
								variant={scope === "daily" ? "primary" : "default"}
								aria-pressed={scope === "daily"}
								onClick={() => onScopeChange("daily")}
							>
								DAILY
							</Button>
						</div>
					</div>
				)}
			</div>

			{scope === "daily" && dailyDate && onDailyDateChange && (
				<div className="flex items-center gap-2" aria-label="Daily leaderboard date">
					<div className="flex min-w-0 flex-1 items-center gap-2 sm:flex-none">
						<Button
							type="button"
							aria-label="Previous day"
							onClick={() => onDailyDateChange(addUtcDays(dailyDate, -1))}
						>
							←<span className="ml-1 hidden sm:inline">PREVIOUS</span>
						</Button>
						<p className="min-w-0 flex-1 whitespace-nowrap text-center text-text-bright sm:min-w-52">
							{formatDailyDate(dailyDate)}
						</p>
						<Button
							type="button"
							aria-label="Next day"
							disabled={isToday}
							onClick={() => onDailyDateChange(addUtcDays(dailyDate, 1))}
						>
							<span className="mr-1 hidden sm:inline">NEXT</span>→
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
	);
}
