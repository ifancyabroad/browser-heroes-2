import { Button } from "../../../components/Button";

type StatsDataStateProps = {
	message: string;
	tone?: "muted" | "error";
	onRetry?: () => void;
	spacing?: "default" | "compact";
};

export function StatsDataState({
	message,
	tone = "muted",
	onRetry,
	spacing = "default",
}: StatsDataStateProps) {
	return (
		<div
			className={`grid justify-items-center gap-3 text-center ${
				spacing === "compact" ? "px-4 py-7" : "px-4 py-12"
			}`}
		>
			<p className={tone === "error" ? "text-error" : "text-text-muted"}>{message}</p>
			{onRetry && (
				<Button type="button" onClick={onRetry}>
					RETRY
				</Button>
			)}
		</div>
	);
}
