export type SortDirection = "ascending" | "descending";

export function SortableHeader<Key extends string>(props: {
	label: string;
	value: Key;
	active: Key;
	direction: SortDirection;
	onSort: (value: Key) => void;
}) {
	const isActive = props.active === props.value;
	return (
		<th aria-sort={isActive ? props.direction : "none"}>
			<button
				className={`table-sort ${isActive ? `active ${props.direction}` : ""}`}
				onClick={() => props.onSort(props.value)}
			>
				{props.label}
			</button>
		</th>
	);
}
