import type { ClassId } from "@app/content";
import { ClassSelect } from "../../../components/ClassSelect";

type StatsFiltersProps = {
	entryType: "heroes" | "ghosts";
	classId: ClassId | "all";
	searchInput: string;
	onClassChange: (value: ClassId | "all") => void;
	onSearchInputChange: (value: string) => void;
};

export function StatsFilters({
	entryType,
	classId,
	searchInput,
	onClassChange,
	onSearchInputChange,
}: StatsFiltersProps) {
	return (
		<div className="flex flex-wrap items-end gap-3 border-b-2 border-border-secondary bg-bg-panel p-3">
			<label className="grid min-w-48 flex-1 gap-1 text-text-label">
				SEARCH
				<input
					type="search"
					value={searchInput}
					maxLength={64}
					placeholder={`Search ${entryType}`}
					onChange={(event) => onSearchInputChange(event.target.value)}
					className="border-2 border-border bg-bg-panel px-3 py-1 text-text-bright placeholder:text-text-muted focus-visible:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				/>
			</label>
			<ClassSelect value={classId} onChange={onClassChange} />
		</div>
	);
}
