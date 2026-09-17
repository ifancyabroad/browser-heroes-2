import { useRef, useState } from "react";
import { Skull } from "pixelarticons/react/Skull";
import { Check } from "pixelarticons/react/Check";
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
			<div className="flex flex-wrap items-center justify-between gap-3 text-text-muted">
				<p className="tabular-nums">
					{discoveredCount} / {enemies.length} DISCOVERED
				</p>
				<div className="flex items-center gap-4">
					<p className="flex items-center gap-2">
						<Skull className="size-4 text-text-bright" aria-hidden="true" />
						Boss
					</p>
					<p className="flex items-center gap-2">
						<Check className="size-4 text-success" aria-hidden="true" />
						Defeated
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
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

							<ul className="min-w-0">
								{zoneEnemies.map((enemy) => (
									<li key={enemy.id}>
										{records.has(enemy.id) ? (
											<button
												type="button"
												className="flex w-full cursor-pointer items-start justify-between gap-2 py-1 text-left hover:text-text-bright focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
												onClick={(event) => {
													triggerRef.current = event.currentTarget;
													setSelectedEnemy(enemy);
												}}
											>
												<span className="min-w-0 break-words">
													{enemy.name}
												</span>{" "}
												<span className="mt-1 flex shrink-0 items-center gap-2">
													{enemy.rank === "boss" && (
														<Skull
															className="size-4 text-text-bright"
															role="img"
															aria-label="Boss"
														/>
													)}{" "}
													<span className="size-4">
														{(records.get(enemy.id)?.victories ?? 0) >
															0 && (
															<Check
																className="size-4 text-success"
																role="img"
																aria-label="Defeated"
															/>
														)}
													</span>
												</span>
											</button>
										) : (
											<span className="block py-1 text-text-muted">
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
