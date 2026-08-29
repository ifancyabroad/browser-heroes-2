import type { ClassId } from "@app/content";
import { Button } from "../../../components/Button";
import { ClassSelect } from "../../../components/ClassSelect";

export function HallOfFameFilters(props: {
	classId: ClassId | "all";
	onClassChange: (classId: ClassId | "all") => void;
	showUserOnly: boolean;
	entryType: "heroes" | "ghosts";
	userOnly: boolean;
	onUserOnlyChange: (userOnly: boolean) => void;
}) {
	return (
		<div className="border-b-2 border-border-secondary bg-bg-panel p-3">
			<div className="flex flex-wrap items-end gap-3">
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
								ALL {props.entryType.toUpperCase()}
							</Button>
							<Button
								type="button"
								variant={props.userOnly ? "primary" : "default"}
								aria-pressed={props.userOnly}
								onClick={() => props.onUserOnlyChange(true)}
							>
								MY {props.entryType.toUpperCase()}
							</Button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
