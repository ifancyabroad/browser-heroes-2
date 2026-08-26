import { useEffect } from "react";
import type { Zone } from "@app/content";
import type { CombatLogEntry } from "@app/engine";
import { BookOpen } from "pixelarticons/react/BookOpen";
import { Badge } from "../../../components/Badge";
import { IconButton } from "../../../components/Button";
import { CombatOutcomeOverlay } from "./CombatOutcomeOverlay";
import { EnemyPortrait } from "./EnemyPortrait";

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
	enemyId: string;
	enemyCurrentHp: number;
	entries: CombatLogEntry[];
	enemyPortrait: string | null;
	enemyName: string;
	isEnemySlain: boolean;
	battleNumber: number;
	goldMultiplier: number;
	nextZone: Zone;
	zone: Zone;
	onOpenLog: () => void;
};

export function Battlefield({
	enemyId,
	enemyCurrentHp,
	entries,
	enemyPortrait,
	enemyName,
	isEnemySlain,
	battleNumber,
	goldMultiplier,
	nextZone,
	zone,
	onOpenLog,
}: BattlefieldProps) {
	useEffect(() => {
		if (nextZone === zone) {
			return;
		}

		const preloadTimeout = window.setTimeout(() => {
			const image = new Image();
			image.fetchPriority = "low";
			image.src = ZONE_BACKGROUNDS[nextZone];
		}, 1_000);

		return () => {
			window.clearTimeout(preloadTimeout);
		};
	}, [nextZone, zone]);

	return (
		<section
			className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-cover bg-bottom bg-no-repeat"
			aria-label="Battlefield"
			style={{ backgroundImage: `url(${ZONE_BACKGROUNDS[zone]})` }}
		>
			<div
				className="absolute right-2 top-2 z-20 flex gap-1 tabular-nums"
				role="group"
				aria-label={`Battle ${battleNumber}, gold multiplier ${goldMultiplier} times`}
			>
				<Badge
					label={
						<>
							<span className="text-text-label">Battle</span>{" "}
							<span className="text-text-bright">{battleNumber}</span>
						</>
					}
					className="bg-bg-base/90"
				/>
				<Badge
					label={
						<>
							<span className="text-text-label">Gold</span>{" "}
							<span className="text-text-bright">×{goldMultiplier}</span>
						</>
					}
					className="bg-bg-base/90"
				/>
			</div>
			<IconButton
				type="button"
				aria-label="Open combat log"
				title="Combat log"
				className="absolute left-2 top-2 z-20 md:hidden"
				onClick={onOpenLog}
			>
				<BookOpen aria-hidden="true" />
			</IconButton>
			<CombatOutcomeOverlay enemyId={enemyId} entries={entries} />
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
