import type { ClassId } from "@app/content";
import { Button } from "../../../components/Button";
import { ClassSelect } from "../../../components/ClassSelect";
import { InputField } from "../../../components/FormFields";

type HistoryFiltersProps = {
	entryType: "heroes" | "ghosts";
	status: "all" | "active";
	onStatusChange: (status: "all" | "active") => void;
	classId: ClassId | "all";
	searchInput: string;
	onClassChange: (value: ClassId | "all") => void;
	onSearchInputChange: (value: string) => void;
};

export function HistoryFilters({
	entryType,
	status,
	onStatusChange,
	classId,
	searchInput,
	onClassChange,
	onSearchInputChange,
}: HistoryFiltersProps) {
	return (
		<div className="flex flex-wrap items-end gap-3 border-b-2 border-border-secondary bg-bg-panel p-3">
			<InputField
				id="history-search"
				type="search"
				label="SEARCH"
				value={searchInput}
				maxLength={64}
				placeholder={`Search ${entryType}`}
				className="w-full sm:w-80"
				onChange={(event) => onSearchInputChange(event.target.value)}
			/>
			<ClassSelect value={classId} onChange={onClassChange} />
			{entryType === "ghosts" && (
				<div className="grid gap-1">
					<span className="text-text-label">STATUS</span>
					<div className="flex gap-2">
						<Button
							type="button"
							variant={status === "all" ? "primary" : "default"}
							aria-pressed={status === "all"}
							onClick={() => onStatusChange("all")}
						>
							ALL
						</Button>
						<Button
							type="button"
							variant={status === "active" ? "primary" : "default"}
							aria-pressed={status === "active"}
							onClick={() => onStatusChange("active")}
						>
							ACTIVE
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
