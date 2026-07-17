import { Button } from "../../../components/Button";

type LeaderboardPaginationProps = {
	page: number;
	total: number;
	totalPages: number;
	isFetching: boolean;
	onPageChange: (page: number) => void;
};

export function LeaderboardPagination({
	page,
	total,
	totalPages,
	isFetching,
	onPageChange,
}: LeaderboardPaginationProps) {
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
					← PREVIOUS
				</Button>
				<span className="whitespace-nowrap text-text-bright">
					PAGE {page} / {displayedTotalPages}
				</span>
				<Button
					type="button"
					disabled={page >= totalPages || isFetching}
					onClick={() => onPageChange(page + 1)}
				>
					NEXT →
				</Button>
			</div>
		</div>
	);
}
