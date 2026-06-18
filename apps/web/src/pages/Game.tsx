import { useState } from "react";
import Sidebar from "../components/Sidebar";

const townFacilities = [
	{
		name: "Market",
		description: "Browse weapons, armour, and consumables for the current run.",
	},
	{
		name: "Healer",
		description: "Recover before choosing whether to push into the next encounter.",
	},
	{
		name: "Trainer",
		description: "Review build choices, skills, feats, and class growth.",
	},
	{
		name: "Notice Board",
		description: "Check run history, leaderboards, and world activity.",
	},
] as const;

const runSummary = [
	["Battle", "1"],
	["Zone", "Town"],
	["Gold", "0"],
	["HP", "-"],
] as const;

export default function Game() {
	const [open, setOpen] = useState(false);

	return (
		<div className="min-h-screen bg-bg-base text-text">
			<div className="flex min-h-screen">
				<Sidebar open={open} onClose={() => setOpen(false)} />

				<main className="min-w-0 flex-1">
					<div className="border-b border-border bg-bg-elevated px-4 py-3 md:hidden">
						<button
							type="button"
							onClick={() => setOpen(true)}
							className="text-sm text-primary underline hover:opacity-80"
							aria-label="Open sidebar"
						>
							Menu
						</button>
					</div>

					<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:px-6">
						<header className="border-b border-border pb-4">
							<p className="mb-2 text-sm uppercase text-text-label">Town</p>
							<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
								<div>
									<h1 className="text-3xl text-text-bright">Crossroads</h1>
									<p className="mt-2 max-w-2xl text-text">
										Prepare the run, manage resources, and choose the next
										encounter.
									</p>
								</div>
								<button
									type="button"
									className="w-full border-2 border-primary px-4 py-3 text-primary hover:bg-primary hover:text-primary-contrast lg:w-auto"
								>
									Begin Encounter
								</button>
							</div>
						</header>

						<section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_18rem]">
							<div className="grid gap-3 sm:grid-cols-2">
								{townFacilities.map((facility) => (
									<article
										key={facility.name}
										className="border-2 border-border bg-bg-elevated p-4"
									>
										<h2 className="text-lg text-text-bright">
											{facility.name}
										</h2>
										<p className="mt-2 text-sm text-text">
											{facility.description}
										</p>
									</article>
								))}
							</div>

							<aside className="border-2 border-border bg-bg-elevated p-4">
								<h2 className="text-lg text-text-bright">Run</h2>
								<dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
									{runSummary.map(([label, value]) => (
										<div key={label}>
											<dt className="text-xs uppercase text-text-label">
												{label}
											</dt>
											<dd className="text-xl text-text-bright">{value}</dd>
										</div>
									))}
								</dl>
							</aside>
						</section>
					</div>
				</main>
			</div>
		</div>
	);
}
