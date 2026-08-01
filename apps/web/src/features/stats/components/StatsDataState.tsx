type StatsDataStateProps = {
	message: string;
};

export function StatsDataState({ message }: StatsDataStateProps) {
	return (
		<div className="grid justify-items-center gap-3 px-4 py-12 text-center">
			<p className="text-text-muted">{message}</p>
		</div>
	);
}
