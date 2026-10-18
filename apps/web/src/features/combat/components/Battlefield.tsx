import { useEffect } from "react";
import type { Zone } from "@app/content";
import type { CombatLogEntry } from "@app/engine";
import { CombatStatsBar } from "./CombatStatsBar";
import { CombatOutcomeOverlay } from "./CombatOutcomeOverlay";
import { EnemyPortrait } from "./EnemyPortrait";
import { GameNavigation } from "../../../components/GameNavigation";
import { useSidebarStore } from "../../../stores/sidebarStore";

import abyssBackground from "../../../assets/images/backgrounds/bg_41.png";
import castleBackground from "../../../assets/images/backgrounds/bg_27.png";
import desertBackground from "../../../assets/images/backgrounds/bg_09.png";
import dungeonBackground from "../../../assets/images/backgrounds/bg_50.png";
import forestBackground from "../../../assets/images/backgrounds/bg_12.png";
import hillsBackground from "../../../assets/images/backgrounds/bg_22.png";
import oceanBackground from "../../../assets/images/backgrounds/bg_25.png";
import plainsBackground from "../../../assets/images/backgrounds/bg_46.png";
import towerBackground from "../../../assets/images/backgrounds/bg_38.png";
import volcanoBackground from "../../../assets/images/backgrounds/bg_16.png";

const ZONE_BACKGROUNDS = {
	abyss: abyssBackground,
	castle: castleBackground,
	desert: desertBackground,
	dungeon: dungeonBackground,
	forest: forestBackground,
	hills: hillsBackground,
	ocean: oceanBackground,
	plains: plainsBackground,
	tower: towerBackground,
	volcano: volcanoBackground,
} satisfies Record<Zone, string>;

type BattlefieldProps = {
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
	const activeSidebar = useSidebarStore((state) => state.activeSidebar);
	const openSidebar = useSidebarStore((state) => state.open);

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
			<div className="absolute inset-x-2 top-2 z-20 flex items-start justify-between gap-2">
				<div className="shrink-0">
					<GameNavigation
						label="Combat navigation"
						activeSidebar={activeSidebar}
						onOpenSidebar={openSidebar}
					/>
				</div>
				<CombatStatsBar
					zone={zone}
					battleNumber={battleNumber}
					gold={gold}
					goldMultiplier={goldMultiplier}
				/>
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
