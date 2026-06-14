type SidebarProps = {
	open: boolean;
	onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
	return (
		<>
			<div
				onClick={onClose}
				className={`fixed inset-0 z-40 bg-black/50 md:hidden ${open ? "block" : "hidden"}`}
			/>

			<aside
				className={[
					"fixed md:static inset-y-0 left-0 z-50 md:z-0",
					"w-80 max-w-full bg-neutral-900 border-r border-neutral-800",
					"overflow-y-auto",
					"transform transition-transform duration-200",
					open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
				].join(" ")}
			>
				{/* Header */}
				<div className="sticky top-0 z-10 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur">
					<div className="flex items-center justify-between px-5 py-4">
						<div>
							<h1 className="text-base font-semibold text-white">
								MERN Phaser Template
							</h1>
							<p className="text-xs text-neutral-500 mt-0.5">
								Full-stack game starter
							</p>
						</div>
						<button
							onClick={onClose}
							className="md:hidden p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition-colors"
							aria-label="Close sidebar"
						>
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</div>
				</div>

				{/* Navigation */}
				<div className="px-5 py-4">
					<h2 className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-3">
						Game
					</h2>

					<p className="text-sm text-neutral-500">Score saving is currently offline.</p>
				</div>
			</aside>
		</>
	);
}
