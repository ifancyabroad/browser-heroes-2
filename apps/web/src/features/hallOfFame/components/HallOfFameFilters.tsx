import type { ClassId } from "@app/content";
import { Button } from "../../../components/Button";
import { ClassSelect } from "../../../components/ClassSelect";
import { SeasonSelect, UnavailableSeasonSelect } from "../../../components/SeasonSelect";

export function HallOfFameFilters(props: {
	classId: ClassId | "all";
	season?: number;
	currentSeason?: number;
	onSeasonChange: (season: number) => void;
	onClassChange: (classId: ClassId | "all") => void;
	showUserOnly: boolean;
	entryType: "heroes" | "ghosts";
	status: "all" | "active";
	onStatusChange: (status: "all" | "active") => void;
	userOnly: boolean;
	onUserOnlyChange: (userOnly: boolean) => void;
}) {
	return (
		<div className="border-b-2 border-border-secondary bg-bg-panel p-3">
			<div className="flex flex-wrap items-end gap-3">
				{props.season && props.currentSeason ? (
					<SeasonSelect
						season={props.season}
						currentSeason={props.currentSeason}
						onChange={props.onSeasonChange}
					/>
				) : (
					<UnavailableSeasonSelect />
				)}
				<ClassSelect value={props.classId} onChange={props.onClassChange} />
				{props.showUserOnly && (
					<div className="grid gap-1">
						<span className="text-text-label">ENTRIES</span>
						<div className="flex gap-2">
							<Button
								type="button"
								variant={props.userOnly ? "default" : "primary"}
								aria-pressed={!props.userOnly}
								onClick={() => props.onUserOnlyChange(false)}
							>
								ALL
							</Button>
							<Button
								type="button"
								variant={props.userOnly ? "primary" : "default"}
								aria-pressed={props.userOnly}
								onClick={() => props.onUserOnlyChange(true)}
							>
								MINE
							</Button>
						</div>
					</div>
				)}
				{props.entryType === "ghosts" && (
					<div className="grid gap-1">
						<span className="text-text-label">STATUS</span>
						<div className="flex gap-2">
							<Button
								type="button"
								variant={props.status === "all" ? "primary" : "default"}
								aria-pressed={props.status === "all"}
								onClick={() => props.onStatusChange("all")}
							>
								ALL
							</Button>
							<Button
								type="button"
								variant={props.status === "active" ? "primary" : "default"}
								aria-pressed={props.status === "active"}
								onClick={() => props.onStatusChange("active")}
							>
								ACTIVE
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
