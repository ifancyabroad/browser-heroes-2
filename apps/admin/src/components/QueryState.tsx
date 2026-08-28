export function QueryError(props: { onRetry: () => void }) {
	return (
		<div className="state">
			<h2>Metrics unavailable</h2>
			<p>The dashboard could not load this data.</p>
			<button onClick={props.onRetry}>Try again</button>
		</div>
	);
}

export function QueryLoading() {
	return (
		<div className="state loading" aria-label="Loading metrics">
			<span />
			<span />
			<span />
		</div>
	);
}

export function EmptyState() {
	return (
		<div className="state">
			<h2>No activity in this range</h2>
			<p>Choose a wider date range or another run mode.</p>
		</div>
	);
}
