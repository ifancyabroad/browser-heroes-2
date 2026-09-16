import { useRef, useState } from "react";
import { enemies, type Enemy } from "@app/content";
import { ZONE_ORDER } from "@app/engine";
import type { BestiaryEntryView } from "@app/shared";
import { formatTitle } from "../../../presentation/effects";
import { EnemyDetailsModal } from "./EnemyDetailsModal";

type BestiaryCatalogueProps = {
	entries: BestiaryEntryView[];
};

const catalogueZones = ZONE_ORDER.map((zone) => ({
	zone,
	enemies: enemies
		.filter((enemy) => enemy.encounter.zone === zone)
		.sort((a, b) => a.name.localeCompare(b.name)),
}));

export function BestiaryCatalogue({ entries }: BestiaryCatalogueProps) {
	const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const records = new Map(entries.map((entry) => [entry.enemyId, entry]));
	const discoveredCount = enemies.filter((enemy) => records.has(enemy.id)).length;
	const selectedRecord = selectedEnemy ? records.get(selectedEnemy.id) : undefined;

	function handleCloseDetails() {
		setSelectedEnemy(null);
		requestAnimationFrame(() => triggerRef.current?.focus());
	}

	return (
		<div className="grid gap-6">
			<p className="text-text-muted tabular-nums">
				{discoveredCount} / {enemies.length} DISCOVERED
			</p>

			{catalogueZones.map(({ zone, enemies: zoneEnemies }) => {
				const zoneDiscoveredCount = zoneEnemies.filter((enemy) =>
					records.has(enemy.id),
				).length;

				return (
					<section key={zone} aria-labelledby={`zone-${zone}`} className="grid gap-3">
						<div className="flex items-baseline justify-between gap-3 border-b-2 border-border-secondary pb-2">
							<h2 id={`zone-${zone}`} className="text-text-bright">
								{formatTitle(zone)}
							</h2>
							<span className="text-text-muted tabular-nums">
								{zoneDiscoveredCount} / {zoneEnemies.length}
							</span>
						</div>

						<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
							{zoneEnemies.map((enemy) => (
								<li key={enemy.id} className="min-w-0">
									{records.has(enemy.id) ? (
										<button
											type="button"
											className="w-full cursor-pointer border border-border bg-bg-panel px-3 py-2 text-left break-words text-text-bright hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
											onClick={(event) => {
												triggerRef.current = event.currentTarget;
												setSelectedEnemy(enemy);
											}}
										>
											{enemy.name}
										</button>
									) : (
										<span className="block border border-border-secondary px-3 py-2 text-text-muted">
											Unknown
										</span>
									)}
								</li>
							))}
						</ul>
					</section>
				);
			})}

			{selectedEnemy && selectedRecord && (
				<EnemyDetailsModal
					enemy={selectedEnemy}
					record={selectedRecord}
					onClose={handleCloseDetails}
				/>
			)}
		</div>
	);
}
