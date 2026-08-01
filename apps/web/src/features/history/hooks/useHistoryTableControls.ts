import type { ClassId } from "@app/content";
import { useState } from "react";
import { useDebouncedValue } from "../../../hooks/useDebouncedValue";

export function useHistoryTableControls<TSort extends string>({
	defaultSort,
	nameSort,
}: {
	defaultSort: TSort;
	nameSort: TSort;
}) {
	const [classId, setClassId] = useState<ClassId | "all">("all");
	const [searchInput, setSearchInput] = useState("");
	const search = useDebouncedValue(searchInput.trim(), 300);
	const [sort, setSort] = useState<TSort>(defaultSort);
	const [direction, setDirection] = useState<"asc" | "desc">("desc");
	const [page, setPage] = useState(1);

	function handleClassChange(value: ClassId | "all") {
		setClassId(value);
		setPage(1);
	}

	function handleSearchInputChange(value: string) {
		setSearchInput(value);
		setPage(1);
	}

	function handleSort(nextSort: TSort) {
		setPage(1);
		if (nextSort === sort) {
			setDirection((current) => (current === "asc" ? "desc" : "asc"));
			return;
		}
		setSort(nextSort);
		setDirection(nextSort === nameSort ? "asc" : "desc");
	}

	return {
		classId,
		searchInput,
		search,
		sort,
		direction,
		page,
		setPage,
		handleClassChange,
		handleSearchInputChange,
		handleSort,
	};
}
