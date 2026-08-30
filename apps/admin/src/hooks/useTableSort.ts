import { useState } from "react";
import type { SortDirection } from "../components/SortableHeader";

export function useTableSort<Row, Key extends keyof Row>(
	rows: readonly Row[],
	initialKey: Key,
	initialDirection: SortDirection = "descending",
) {
	const [key, setKey] = useState<Key>(initialKey);
	const [direction, setDirection] = useState<SortDirection>(initialDirection);

	function onSort(nextKey: Key) {
		if (nextKey === key) {
			setDirection((current) => (current === "descending" ? "ascending" : "descending"));
			return;
		}
		setKey(nextKey);
		setDirection("descending");
	}

	const sortedRows = rows
		.map((row, index) => ({ row, index }))
		.sort((left, right) => {
			const a = left.row[key];
			const b = right.row[key];
			const comparison =
				typeof a === "number" && typeof b === "number"
					? a - b
					: String(a).localeCompare(String(b), "en-GB", { sensitivity: "base" });
			return (
				(direction === "ascending" ? comparison : -comparison) || left.index - right.index
			);
		})
		.map(({ row }) => row);

	return {
		rows: sortedRows,
		headerProps: { active: key, direction, onSort },
	};
}
