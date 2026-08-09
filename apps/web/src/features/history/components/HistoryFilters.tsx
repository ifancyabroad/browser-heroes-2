import type { ClassId } from "@app/content";
import { ClassSelect } from "../../../components/ClassSelect";
import { InputField } from "../../../components/FormFields";

type HistoryFiltersProps = {
	entryType: "heroes" | "ghosts";
	classId: ClassId | "all";
	searchInput: string;
	onClassChange: (value: ClassId | "all") => void;
	onSearchInputChange: (value: string) => void;
};

export function HistoryFilters({
	entryType,
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
		</div>
	);
}
