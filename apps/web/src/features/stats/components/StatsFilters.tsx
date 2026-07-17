import type { ClassId } from "@app/content";
import { ClassSelect } from "../../../components/ClassSelect";
import { SearchField } from "../../../components/FormFields";

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
			<SearchField
				label="SEARCH"
				value={searchInput}
				maxLength={64}
				placeholder={`Search ${entryType}`}
				className="w-full sm:w-80"
				onChange={onSearchInputChange}
			/>
			<ClassSelect value={classId} onChange={onClassChange} />
		</div>
	);
}
