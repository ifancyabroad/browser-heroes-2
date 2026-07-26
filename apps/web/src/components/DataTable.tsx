import clsx from "clsx";
import type { PropsWithChildren, TdHTMLAttributes, ThHTMLAttributes } from "react";

type DataTableProps = PropsWithChildren<{
	tableClassName?: string;
}>;

export function DataTable({ children, tableClassName }: DataTableProps) {
	return (
		<div className="overflow-x-auto">
			<table
				className={clsx("w-full table-fixed border-collapse sm:table-auto", tableClassName)}
			>
				{children}
			</table>
		</div>
	);
}

export function DataTableHeader({ children }: PropsWithChildren) {
	return (
		<thead>
			<tr className="bg-bg-elevated">{children}</tr>
		</thead>
	);
}

type DataTableHeadingProps = ThHTMLAttributes<HTMLTableCellElement> & {
	numeric?: boolean;
	hideOnMobile?: boolean;
};

export function DataTableHeading({
	children,
	numeric = false,
	hideOnMobile = false,
	className,
	...props
}: DataTableHeadingProps) {
	return (
		<th
			scope="col"
			className={clsx(
				"whitespace-nowrap border-b-2 border-border-secondary px-2 py-2 text-left font-normal text-text-label sm:px-3",
				numeric && "text-right",
				hideOnMobile && "hidden sm:table-cell",
				className,
			)}
			{...props}
		>
			{children}
		</th>
	);
}

type SortableDataTableHeadingProps<TSort extends string> = {
	label: string;
	sortKey: TSort;
	activeSort: TSort;
	direction: "asc" | "desc";
	onSort: (sort: TSort) => void;
	numeric?: boolean;
	hideOnMobile?: boolean;
};

export function SortableDataTableHeading<TSort extends string>({
	label,
	sortKey,
	activeSort,
	direction,
	onSort,
	numeric = false,
	hideOnMobile = false,
}: SortableDataTableHeadingProps<TSort>) {
	const isActive = activeSort === sortKey;

	return (
		<DataTableHeading
			aria-sort={isActive ? (direction === "asc" ? "ascending" : "descending") : "none"}
			numeric={numeric}
			hideOnMobile={hideOnMobile}
		>
			<button
				type="button"
				onClick={() => onSort(sortKey)}
				className={clsx(
					"flex w-full items-center gap-2 text-inherit hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
					numeric ? "justify-end" : "justify-between",
				)}
			>
				<span>{label}</span>
				{isActive && <span aria-hidden="true">{direction === "asc" ? "↑" : "↓"}</span>}
			</button>
		</DataTableHeading>
	);
}

type DataTableCellProps = TdHTMLAttributes<HTMLTableCellElement> & {
	numeric?: boolean;
	hideOnMobile?: boolean;
};

export function DataTableCell({
	children,
	numeric = false,
	hideOnMobile = false,
	className,
	...props
}: DataTableCellProps) {
	return (
		<td
			className={clsx(
				"whitespace-nowrap px-2 py-2 sm:px-3",
				numeric && "text-right text-text-bright",
				hideOnMobile && "hidden sm:table-cell",
				className,
			)}
			{...props}
		>
			{children}
		</td>
	);
}

export function DataTableRow({
	children,
	highlighted = false,
	onSelect,
}: PropsWithChildren<{
	highlighted?: boolean;
	onSelect?: () => void;
}>) {
	return (
		<tr
			onClick={onSelect}
			className={clsx(
				"border-b border-border-secondary last:border-b-0",
				highlighted && "bg-bg-panel text-primary",
				onSelect && "cursor-pointer hover:bg-bg-elevated focus-within:bg-bg-elevated",
			)}
		>
			{children}
		</tr>
	);
}

export function DataTableRowAction({
	children,
	label,
	onSelect,
}: PropsWithChildren<{
	label: string;
	onSelect: () => void;
}>) {
	return (
		<button
			type="button"
			aria-label={label}
			onClick={(event) => {
				event.stopPropagation();
				onSelect();
			}}
			className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
		>
			{children}
		</button>
	);
}
