import { useEffect } from "react";
import type { Zone } from "@app/content";
import type { CombatLogEntry, CombatTurnOrderEntry } from "@app/engine";
import { CombatStatsBar } from "./CombatStatsBar";
import { CombatTurnOrder } from "./CombatTurnOrder";
import { CombatOutcomeOverlay } from "./CombatOutcomeOverlay";
import { EnemyPortrait } from "./EnemyPortrait";

import { ZONE_BACKGROUNDS } from "../../../presentation/zones";

type BattlefieldProps = {
	turnOrder: CombatTurnOrderEntry[];
	heroId: string;
	enemyId: string;
	enemyCurrentHp: number;
	entries: CombatLogEntry[];
	enemyPortrait: string | null;
	enemyName: string;
	isEnemySlain: boolean;
	battleNumber: number;
	gold: number;
	goldMultiplier: number;
	nextZoneOptions: readonly Zone[];
	zone: Zone;
};

export function Battlefield({
	turnOrder,
	heroId,
	enemyId,
	enemyCurrentHp,
	entries,
	enemyPortrait,
	enemyName,
	isEnemySlain,
	battleNumber,
	gold,
	goldMultiplier,
	nextZoneOptions,
	zone,
}: BattlefieldProps) {
	useEffect(() => {
		const preloadTimeout = window.setTimeout(() => {
			for (const nextZone of nextZoneOptions) {
				if (nextZone === zone) {
					continue;
				}
				const image = new Image();
				image.fetchPriority = "low";
				image.src = ZONE_BACKGROUNDS[nextZone];
			}
		}, 1_000);

		return () => {
			window.clearTimeout(preloadTimeout);
		};
	}, [nextZoneOptions, zone]);

	return (
		<section
			className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-cover bg-bottom bg-no-repeat"
			aria-label="Battlefield"
			style={{ backgroundImage: `url(${ZONE_BACKGROUNDS[zone]})` }}
		>
			<div className="absolute left-2 right-2 top-2 z-10 flex items-start justify-between gap-2">
				<CombatStatsBar
					zone={zone}
					battleNumber={battleNumber}
					gold={gold}
					goldMultiplier={goldMultiplier}
				/>
				<CombatTurnOrder turnOrder={turnOrder} heroId={heroId} />
			</div>
			<CombatOutcomeOverlay enemyId={enemyId} heroId={heroId} entries={entries} />
			<EnemyPortrait
				enemyId={enemyId}
				currentHp={enemyCurrentHp}
				portrait={enemyPortrait}
				name={enemyName}
				isSlain={isEnemySlain}
			/>
		</section>
	);
}
