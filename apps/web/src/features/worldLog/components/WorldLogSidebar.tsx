import { Sidebar } from "../../../components/Sidebar";
import { useWorldLog } from "../hooks/useWorldLog";
import { WorldLogList } from "./WorldLogList";

type WorldLogSidebarProps = {
	open: boolean;
	onClose: () => void;
};

export function WorldLogSidebar({ open, onClose }: WorldLogSidebarProps) {
	const { entries, pending, error } = useWorldLog();

	return (
		<Sidebar
			className="border-border-secondary"
			side="right"
			open={open}
			onClose={onClose}
			aria-label="World log"
		>
			<div className="flex min-h-0 flex-1 flex-col px-4 pb-3 pt-14 min-[104rem]:pt-3">
				{pending && (
					<p className="mt-auto" role="status">
						Loading activity...
					</p>
				)}
				{error && entries.length === 0 && (
					<p className="mt-auto" role="status">
						World log unavailable.
					</p>
				)}
				{(entries.length > 0 || (!pending && !error)) && <WorldLogList entries={entries} />}
			</div>
		</Sidebar>
	);
}
