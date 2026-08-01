import { Button } from "./Button";
import { ArrowLeft } from "pixelarticons/react/ArrowLeft";
import { ArrowRight } from "pixelarticons/react/ArrowRight";

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
				<Button
					type="button"
					disabled={page <= 1 || isFetching}
					onClick={() => onPageChange(page - 1)}
				>
					<ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
					PREVIOUS
				</Button>
				<span className="whitespace-nowrap text-text-bright">
					PAGE {page} / {displayedTotalPages}
				</span>
				<Button
					type="button"
					disabled={page >= totalPages || isFetching}
					onClick={() => onPageChange(page + 1)}
				>
					NEXT
					<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
				</Button>
			</div>
		</div>
	);
}
