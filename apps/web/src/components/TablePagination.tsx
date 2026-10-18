import { IconButton } from "./Button";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

type TablePaginationProps = {
	page: number;
	total: number;
	totalPages: number;
	isFetching: boolean;
	onPageChange: (page: number) => void;
};

export function TablePagination({
	page,
	total,
	totalPages,
	isFetching,
	onPageChange,
}: TablePaginationProps) {
	const displayedTotalPages = Math.max(totalPages, 1);

	return (
		<div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-border-secondary bg-bg-panel p-3">
			<p className="text-text-muted">
				{total} {total === 1 ? "ENTRY" : "ENTRIES"}
			</p>
			<div className="flex items-center gap-2">
				<IconButton
					type="button"
					aria-label="Previous page"
					disabled={page <= 1 || isFetching}
					onClick={() => onPageChange(page - 1)}
				>
					<IconArrowLeft aria-hidden="true" className="h-4 w-4" />
				</IconButton>
				<span className="whitespace-nowrap text-text-bright">
					PAGE {page} / {displayedTotalPages}
				</span>
				<IconButton
					type="button"
					aria-label="Next page"
					disabled={page >= totalPages || isFetching}
					onClick={() => onPageChange(page + 1)}
				>
					<IconArrowRight aria-hidden="true" className="h-4 w-4" />
				</IconButton>
			</div>
		</div>
	);
}
