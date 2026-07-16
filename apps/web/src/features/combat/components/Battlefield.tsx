import { useEffect, useRef, useState } from "react";
import type { Zone } from "@app/content";
import clsx from "clsx";
import styles from "./Battlefield.module.css";

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

const ENEMY_HIT_FEEDBACK_MS = 180;
const ENEMY_DEATH_FEEDBACK_MS = 280;

type BattlefieldProps = {
	enemyId: string;
	enemyCurrentHp: number;
	enemyPortrait: string | null;
	enemyName: string;
	isEnemySlain: boolean;
	nextZone: Zone;
	zone: Zone;
};

export function Battlefield({
	enemyId,
	enemyCurrentHp,
	enemyPortrait,
	enemyName,
	isEnemySlain,
	nextZone,
	zone,
}: BattlefieldProps) {
	const previousEnemy = useRef({ id: enemyId, hp: enemyCurrentHp });
	const feedbackTimeout = useRef<number | null>(null);
	const [isHit, setIsHit] = useState(false);
	const [isDying, setIsDying] = useState(false);
	const [loadedPortraitEnemyId, setLoadedPortraitEnemyId] = useState<string | null>(null);
	const isPortraitLoaded = loadedPortraitEnemyId === enemyId;

	useEffect(() => {
		return () => {
			if (feedbackTimeout.current !== null) {
				window.clearTimeout(feedbackTimeout.current);
			}
		};
	}, []);

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

	useEffect(() => {
		if (feedbackTimeout.current !== null) {
			window.clearTimeout(feedbackTimeout.current);
			feedbackTimeout.current = null;
		}

		const previous = previousEnemy.current;

		if (previous.id !== enemyId) {
			previousEnemy.current = { id: enemyId, hp: enemyCurrentHp };
			setIsHit(false);
			setIsDying(false);
			return;
		}

		const tookDamage = enemyCurrentHp < previous.hp;
		const wasSlain = tookDamage && enemyCurrentHp <= 0;

		if (wasSlain) {
			setIsHit(false);
			setIsDying(true);
			feedbackTimeout.current = window.setTimeout(() => {
				setIsDying(false);
				feedbackTimeout.current = null;
			}, ENEMY_DEATH_FEEDBACK_MS);
		} else if (tookDamage) {
			setIsHit(true);
			setIsDying(false);
			feedbackTimeout.current = window.setTimeout(() => {
				setIsHit(false);
				feedbackTimeout.current = null;
			}, ENEMY_HIT_FEEDBACK_MS);
		} else {
			setIsHit(false);
			setIsDying(false);
		}

		previousEnemy.current = { id: enemyId, hp: enemyCurrentHp };
	}, [enemyCurrentHp, enemyId]);

	return (
		<section
			className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-cover bg-bottom bg-no-repeat"
			aria-label="Battlefield"
			style={{ backgroundImage: `url(${ZONE_BACKGROUNDS[zone]})` }}
		>
			{enemyPortrait && (
				<img
					key={enemyId}
					src={enemyPortrait}
					alt={enemyName}
					loading="eager"
					fetchPriority="high"
					decoding="async"
					onLoad={() => setLoadedPortraitEnemyId(enemyId)}
					className={clsx(
						"relative h-full w-full object-contain opacity-0 motion-safe:transition-opacity motion-safe:duration-150",
						isPortraitLoaded && "opacity-100",
						isHit && styles.portraitHit,
						isDying && styles.portraitDeath,
						isEnemySlain && !isDying && styles.portraitSlain,
					)}
				/>
			)}
		</section>
	);
}
