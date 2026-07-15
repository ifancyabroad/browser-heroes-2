type PanelTitleProps = {
	title: string;
};

export function PanelTitle({ title }: PanelTitleProps) {
	return (
		<div className="absolute left-3 top-0 z-10 -translate-y-1/2 border-2 border-border bg-bg-elevated px-2 text-text-bright">
			{title}
		</div>
	);
}
