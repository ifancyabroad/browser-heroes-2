import clsx from "clsx";

type PanelTitleProps = {
	title: string;
	id?: string;
	align?: "left" | "center";
};

export function PanelTitle({ title, id, align = "left" }: PanelTitleProps) {
	return (
		<h2
			id={id}
			className={clsx(
				"absolute top-0 z-10 max-w-[calc(100%-1.5rem)] -translate-y-1/2 whitespace-nowrap border-2 border-border bg-bg-elevated px-2 text-text-bright",
				align === "center" ? "left-1/2 -translate-x-1/2 text-center" : "left-3",
			)}
		>
			{title}
		</h2>
	);
}
