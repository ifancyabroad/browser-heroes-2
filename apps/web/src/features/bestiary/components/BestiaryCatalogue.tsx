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

			<div className="grid grid-cols-2 items-start gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
				{catalogueZones.map(({ zone, enemies: zoneEnemies }) => {
					const zoneDiscoveredCount = zoneEnemies.filter((enemy) =>
						records.has(enemy.id),
					).length;

					return (
						<section
							key={zone}
							aria-labelledby={`zone-${zone}`}
							className="grid min-w-0 gap-2"
						>
							<div className="flex items-baseline justify-between gap-3 border-b-2 border-border-secondary pb-2">
								<h2 id={`zone-${zone}`} className="text-text-bright">
									{formatTitle(zone)}
								</h2>
								<span className="shrink-0 text-text-muted tabular-nums">
									{zoneDiscoveredCount} / {zoneEnemies.length}
								</span>
							</div>

							<ul>
								{zoneEnemies.map((enemy) => (
									<li key={enemy.id}>
										{records.has(enemy.id) ? (
											<button
												type="button"
												className="min-h-11 w-full cursor-pointer py-2 text-left break-words hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-0 sm:py-1"
												onClick={(event) => {
													triggerRef.current = event.currentTarget;
													setSelectedEnemy(enemy);
												}}
											>
												{enemy.name}
											</button>
										) : (
											<span className="flex min-h-11 items-center py-2 text-text-muted sm:min-h-0 sm:py-1">
												Unknown
											</span>
										)}
									</li>
								))}
							</ul>
						</section>
					);
				})}
			</div>

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
