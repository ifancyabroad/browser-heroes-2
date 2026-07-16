export const ACTION_PENDING_DETAIL = "Another action is in progress.";

type ActionTooltipContentProps = {
	title: string;
	detail: string;
};

export function ActionTooltipContent({ title, detail }: ActionTooltipContentProps) {
	return (
		<div className="grid gap-1">
			<p className="text-text-bright">{title}</p>
			<p className="text-text-muted">{detail}</p>
		</div>
	);
}
